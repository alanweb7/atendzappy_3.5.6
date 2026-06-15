import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SecurityIcon from "@material-ui/icons/Security";

export default function ImpersonationBanner({ companyName, onExit }) {
  return (
    <Box style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
      backgroundColor: "#c53030", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "6px 16px", gap: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
    }}>
      <SecurityIcon style={{ fontSize: 16 }} />
      <Typography style={{ fontSize: 13, fontWeight: 700 }}>
        🔒 Modo Suporte Ativo — Acessando: <strong>{companyName}</strong>
      </Typography>
      <Button
        size="small"
        variant="outlined"
        startIcon={<ExitToAppIcon />}
        onClick={onExit}
        style={{ color: "#fff", borderColor: "rgba(255,255,255,0.6)", fontSize: 11, padding: "2px 10px" }}
      >
        Sair do Modo Suporte
      </Button>
    </Box>
  );
}
