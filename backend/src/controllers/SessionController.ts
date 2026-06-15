import { Request, Response } from "express";
import AppError from "../errors/AppError";
import { getIO } from "../libs/socket";

import AuthUserService from "../services/UserServices/AuthUserService";
import ImpersonateService from "../services/AuthServices/ImpersonateService";
import Verify2FAService from "../services/UserServices/Verify2FAService";
import { SendRefreshToken } from "../helpers/SendRefreshToken";
import { RefreshTokenService } from "../services/AuthServices/RefreshTokenService";
import FindUserFromToken from "../services/AuthServices/FindUserFromToken";
import User from "../models/User";

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const result = await AuthUserService({
    email,
    password
  });

  if (result.requiresTwoFactor) {
    return res.status(200).json({
      requiresTwoFactor: true,
      email: result.email
    });
  }

  const { token, serializedUser, refreshToken } = result;
 
  SendRefreshToken(res, refreshToken);

  const io = getIO();

  io.of(serializedUser.companyId.toString())
  .emit(`company-${serializedUser.companyId}-auth`, {
    action: "update",
    user: {
      id: serializedUser.id,
      email: serializedUser.email,
      companyId: serializedUser.companyId,
      token: serializedUser.token
    }
  });
  

  return res.status(200).json({
    token,
    user: serializedUser
  });
};

export const verify2FA = async (req: Request, res: Response): Promise<Response> => {
  const { email, token: twoFactorToken } = req.body;

  const { token, serializedUser, refreshToken } = await Verify2FAService({
    email,
    token: twoFactorToken
  });

  SendRefreshToken(res, refreshToken);

  const io = getIO();

  io.of(serializedUser.companyId.toString())
  .emit(`company-${serializedUser.companyId}-auth`, {
    action: "update",
    user: {
      id: serializedUser.id,
      email: serializedUser.email,
      companyId: serializedUser.companyId,
      token: serializedUser.token
    }
  });

  return res.status(200).json({
    token,
    user: serializedUser
  });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: string = req.cookies.jrt;

  if (!token) {
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }

  const { user, newToken, refreshToken } = await RefreshTokenService(
    res,
    token
  );

  SendRefreshToken(res, refreshToken);

  return res.json({ token: newToken, user });
};

export const me = async (req: Request, res: Response): Promise<Response> => {
  const token: string = req.cookies.jrt;
  const user = await FindUserFromToken(token);
  const { id, profile, super: superAdmin } = user;

  if (!token) {
    throw new AppError("ERR_SESSION_EXPIRED", 401);
  }

  return res.json({ id, profile, super: superAdmin });
};

export const exitImpersonate = async (req: Request, res: Response): Promise<Response> => {
  const { originalToken } = req.body;
  if (!originalToken) throw new AppError("Token original não informado", 400);

  const { verify } = require("jsonwebtoken");
  const authConfig = require("../config/auth").default;

  let decoded: any;
  try {
    decoded = verify(originalToken, authConfig.secret);
  } catch {
    throw new AppError("Token original inválido ou expirado", 401);
  }

  const user = await User.findByPk(decoded.id, {
    attributes: ["id", "name", "email", "profile", "companyId", "userType", "tokenVersion"]
  });
  if (!user) throw new AppError("Usuário não encontrado", 404);

  const { createAccessToken, createRefreshToken } = require("../helpers/CreateTokens");
  const { SendRefreshToken } = require("../helpers/SendRefreshToken");

  const newToken = createAccessToken(user);
  const newRefreshToken = createRefreshToken(user);

  SendRefreshToken(res, newRefreshToken);
  return res.json({ token: newToken, user: user.toJSON() });
};

export const impersonate = async (req: Request, res: Response): Promise<Response> => {
  const { id: superUserId, companyId: superUserCompanyId } = req.user;
  const { targetCompanyId } = req.body;
  const ipAddress = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket?.remoteAddress;

  const result = await ImpersonateService({
    superUserId: Number(superUserId),
    superUserCompanyId: Number(superUserCompanyId),
    targetCompanyId: Number(targetCompanyId),
    ipAddress
  });

  SendRefreshToken(res, result.refreshToken);
  return res.json({ token: result.token, user: result.user });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.user;
  if (id) {
    const user = await User.findByPk(id);
    await user.update({ online: false });
  }
  res.clearCookie("jrt");

  return res.send();
};
