import React, { useEffect, useState, useContext } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, IconButton, Tooltip, CircularProgress,
} from "@material-ui/core";
import { FileCopy, Refresh, CheckCircle, OpenInNew, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  dialogPaper: { borderRadius: 16, maxWidth: 560, width: "100%" },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 22px 12px",
    borderBottom: "1px solid #f0f0f0",
  },
  titleText: { fontWeight: 700, fontSize: 18 },
  subtitle: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  content: { padding: "18px 22px 8px", backgroundColor: "#fafafa" },
  section: {
    backgroundColor: "#fff", borderRadius: 10, padding: theme.spacing(2),
    marginBottom: theme.spacing(2), border: "1px solid #e5e7eb",
  },
  sectionTitle: {
    fontWeight: 600, fontSize: 13, color: "#111827",
    display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
  },
  badge: {
    width: 20, height: 20, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0,
  },
  copyRow: {
    display: "flex", alignItems: "center", gap: 6,
    backgroundColor: "#f5f5f5", borderRadius: 6, padding: "6px 10px",
    border: "1px solid #ddd",
  },
  copyText: { flex: 1, fontFamily: "monospace", fontSize: 11, color: "#444", wordBreak: "break-all" },
  caption: { fontSize: 11, color: "#6b7280", marginBottom: 4, marginTop: 8 },
  actions: { padding: "12px 22px", backgroundColor: "#fafafa", borderTop: "1px solid #f0f0f0" },
  connectBtn: { fontWeight: 600, textTransform: "none", borderRadius: 8 },
}));

const generateToken = () =>
  `${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

/**
 * type = "facebook" | "instagram"
 */
const FacebookInstagramModal = ({ open, onClose, type = "facebook" }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const companyId = user?.companyId;

  const isFB = type === "facebook";
  const color = isFB ? "#1877f2" : "#e1306c";
  const label = isFB ? "Facebook" : "Instagram";

  // Keys de settings separadas por canal
  const KEY_APP_ID     = isFB ? "facebookAppId"      : "instagramAppId";
  const KEY_APP_SECRET = isFB ? "facebookAppSecret"  : "instagramAppSecret";
  const KEY_TOKEN      = isFB ? "facebookVerifyToken": "instagramVerifyToken";

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [appId, setAppId] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [verifyToken, setVerifyToken] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
  const webhookUrl = `${backendUrl}/webhook/facebook/${companyId}`;
  const callbackUrl = isFB
    ? `${backendUrl}/facebook-callback`
    : `${backendUrl}/instagram-callback`;

  useEffect(() => {
    if (!open || !companyId) return;
    setLoading(true);
    Promise.all([
      api.get(`/setting/${KEY_APP_ID}`).catch(() => ({ data: null })),
      api.get(`/setting/${KEY_APP_SECRET}`).catch(() => ({ data: null })),
      api.get(`/setting/${KEY_TOKEN}`).catch(() => ({ data: null })),
    ]).then(([idRes, secretRes, tokenRes]) => {
      setAppId(idRes.data?.value || "");
      setAppSecret(secretRes.data?.value || "");
      setVerifyToken(tokenRes.data?.value || generateToken());
    }).finally(() => setLoading(false));
  }, [open, companyId, type]);

  const handleSave = async () => {
    if (!appId.trim() || !appSecret.trim()) {
      toast.error("App ID e App Secret são obrigatórios");
      return false;
    }
    setSaving(true);
    try {
      await Promise.all([
        api.put(`/setting/${KEY_APP_ID}`, { value: appId.trim() }),
        api.put(`/setting/${KEY_APP_SECRET}`, { value: appSecret.trim() }),
        api.put(`/setting/${KEY_TOKEN}`, { value: verifyToken }),
      ]);
      toast.success("Configurações salvas!");
      return true;
    } catch (err) {
      toastError(err);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleConnect = async () => {
    const ok = await handleSave();
    if (!ok) return;
    const scope = isFB
      ? "public_profile,pages_messaging,pages_show_list,pages_manage_metadata,pages_read_engagement,pages_manage_engagement,business_management,instagram_basic,instagram_manage_messages"
      : "instagram_basic,instagram_manage_messages,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement,pages_manage_metadata,business_management";
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=${scope}&response_type=code&state=${companyId}&display=page`;
    window.open(url, "_blank", "width=650,height=750");
  };

  const copy = (text) => { navigator.clipboard.writeText(text); toast.success("Copiado!"); };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: classes.dialogPaper }}>
      <Box className={classes.header}>
        <Box>
          <Typography className={classes.titleText} style={{ color }}>
            {isFB ? "🔵" : "🟣"} Configurar {label}
          </Typography>
          <Typography className={classes.subtitle}>
            Cada empresa usa seu próprio App da Meta
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><Close /></IconButton>
      </Box>

      <DialogContent className={classes.content}>
        {loading ? (
          <Box display="flex" justifyContent="center" py={3}><CircularProgress /></Box>
        ) : (
          <>
            {/* Passo 1 */}
            <Box className={classes.section}>
              <Typography className={classes.sectionTitle}>
                <span className={classes.badge} style={{ backgroundColor: color }}>1</span>
                Criar App no Meta Developers
              </Typography>
              <Typography style={{ fontSize: 12, color: "#555" }}>
                Crie um App do tipo "Empresa" e adicione os produtos: <strong>Facebook Login for Business</strong> e <strong>Webhooks</strong>.
              </Typography>
              <Button size="small" variant="outlined" startIcon={<OpenInNew />}
                href="https://developers.facebook.com/apps/" target="_blank"
                style={{ marginTop: 8, textTransform: "none", fontSize: 12 }}>
                Abrir Meta Developers
              </Button>
            </Box>

            {/* Passo 2 */}
            <Box className={classes.section}>
              <Typography className={classes.sectionTitle}>
                <span className={classes.badge} style={{ backgroundColor: color }}>2</span>
                Configurar Webhook no App
              </Typography>
              <Typography className={classes.caption}>URL de Callback (adicionar no App):</Typography>
              <Box className={classes.copyRow}>
                <Typography className={classes.copyText}>{callbackUrl}</Typography>
                <Tooltip title="Copiar"><IconButton size="small" onClick={() => copy(callbackUrl)}><FileCopy fontSize="small" /></IconButton></Tooltip>
              </Box>
              <Typography className={classes.caption}>URL do Webhook:</Typography>
              <Box className={classes.copyRow}>
                <Typography className={classes.copyText}>{webhookUrl}</Typography>
                <Tooltip title="Copiar"><IconButton size="small" onClick={() => copy(webhookUrl)}><FileCopy fontSize="small" /></IconButton></Tooltip>
              </Box>
              <Typography className={classes.caption}>Token de Verificação:</Typography>
              <Box className={classes.copyRow}>
                <Typography className={classes.copyText}>{verifyToken}</Typography>
                <Tooltip title="Gerar novo"><IconButton size="small" onClick={() => setVerifyToken(generateToken())}><Refresh fontSize="small" /></IconButton></Tooltip>
                <Tooltip title="Copiar"><IconButton size="small" onClick={() => copy(verifyToken)}><FileCopy fontSize="small" /></IconButton></Tooltip>
              </Box>
            </Box>

            {/* Passo 3 */}
            <Box className={classes.section}>
              <Typography className={classes.sectionTitle}>
                <span className={classes.badge} style={{ backgroundColor: color }}>3</span>
                Inserir credenciais (Configurações → Básico)
              </Typography>
              <TextField label="App ID" fullWidth variant="outlined" size="small"
                value={appId} onChange={(e) => setAppId(e.target.value)}
                style={{ marginBottom: 10 }} placeholder="Ex: 776874187723945" />
              <TextField label="App Secret" fullWidth variant="outlined" size="small"
                type="password" value={appSecret} onChange={(e) => setAppSecret(e.target.value)}
                placeholder="Cole o App Secret aqui" />
            </Box>

            {/* Passo 4 */}
            <Box className={classes.section}>
              <Typography className={classes.sectionTitle}>
                <span className={classes.badge} style={{ backgroundColor: color }}>4</span>
                Conectar ao {label}
              </Typography>
              <Button variant="contained" fullWidth className={classes.connectBtn}
                onClick={handleConnect} disabled={saving}
                style={{ backgroundColor: color, color: "#fff" }}>
                {saving ? <CircularProgress size={18} style={{ color: "#fff" }} /> : `Salvar e Conectar ${label}`}
              </Button>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button onClick={onClose} variant="outlined" style={{ textTransform: "none" }}>Fechar</Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={saving || loading}
          startIcon={<CheckCircle />} style={{ textTransform: "none" }}>
          Salvar Configurações
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FacebookInstagramModal;
