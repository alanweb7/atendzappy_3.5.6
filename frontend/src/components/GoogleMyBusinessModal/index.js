import React, { useContext } from "react";
import {
  Dialog, DialogContent, DialogActions, Box, Typography,
  Button, IconButton, Tooltip,
} from "@material-ui/core";
import { FileCopy, OpenInNew, Close, CheckCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  dialogPaper: { borderRadius: 16, maxWidth: 520, width: "100%" },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 22px 12px", borderBottom: "1px solid #f0f0f0",
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
    width: 20, height: 20, borderRadius: "50%", backgroundColor: "#4285f4",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0,
  },
  copyRow: {
    display: "flex", alignItems: "center", gap: 6,
    backgroundColor: "#f5f5f5", borderRadius: 6, padding: "6px 10px",
    border: "1px solid #ddd",
  },
  copyText: { flex: 1, fontFamily: "monospace", fontSize: 11, color: "#444", wordBreak: "break-all" },
  actions: { padding: "12px 22px", backgroundColor: "#fafafa", borderTop: "1px solid #f0f0f0" },
}));

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" width="22" height="22" style={{ verticalAlign: "middle", marginRight: 8 }}>
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.9 33.3 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.4-7.9 19.8-18.7.1-.4.2-.9.2-1.3 0-1.3-.1-2.7-.4-4z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.4 0-13.8 4-17.7 10.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.4 26.8 36 24 36c-5.4 0-9.9-3-11.3-7.1l-6.6 5.1C9.8 40.5 16.4 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.6-2.7 4.8-5 6.3l6.2 5.2C40 36.1 44 30.4 44 24c0-1.3-.1-2.7-.4-4z"/>
  </svg>
);

const GoogleMyBusinessModal = ({ open, onClose }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
  const callbackUrl = `${backendUrl}/google-business-callback`;

  const copy = (text) => { navigator.clipboard.writeText(text); toast.success("Copiado!"); };

  const handleConnect = async () => {
    try {
      const { data } = await api.get("/google-business/oauth-url");
      window.open(data.url, "_blank", "width=650,height=750");
      onClose();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: classes.dialogPaper }}>
      <Box className={classes.header}>
        <Box>
          <Typography className={classes.titleText}>
            <GoogleLogo />Conectar Google Meu Negócio
          </Typography>
          <Typography className={classes.subtitle}>
            Usa as mesmas credenciais do Google já configuradas em Whitelabel
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><Close /></IconButton>
      </Box>

      <DialogContent className={classes.content}>
        {/* Passo 1 */}
        <Box className={classes.section}>
          <Typography className={classes.sectionTitle}>
            <span className={classes.badge}>1</span>
            Ativar APIs no Google Cloud Console
          </Typography>
          <Typography style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>
            No mesmo projeto usado para o Google Agenda, ative as APIs abaixo:
          </Typography>
          {["My Business Account Management API", "My Business Information API", "My Business Reviews API"].map(api => (
            <Box key={api} style={{ fontSize: 12, color: "#374151", padding: "3px 0" }}>• {api}</Box>
          ))}
          <Button size="small" variant="outlined" startIcon={<OpenInNew />}
            href="https://console.cloud.google.com/apis/library" target="_blank"
            style={{ marginTop: 10, textTransform: "none", fontSize: 12 }}>
            Abrir Biblioteca de APIs
          </Button>
        </Box>

        {/* Passo 2 */}
        <Box className={classes.section}>
          <Typography className={classes.sectionTitle}>
            <span className={classes.badge}>2</span>
            Adicionar URL de redirecionamento
          </Typography>
          <Typography style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>
            Em Credenciais → seu OAuth 2.0 → URIs de redirecionamento autorizados, adicione:
          </Typography>
          <Box className={classes.copyRow}>
            <Typography className={classes.copyText}>{callbackUrl}</Typography>
            <Tooltip title="Copiar"><IconButton size="small" onClick={() => copy(callbackUrl)}><FileCopy fontSize="small" /></IconButton></Tooltip>
          </Box>
        </Box>

        {/* Passo 3 */}
        <Box className={classes.section}>
          <Typography className={classes.sectionTitle}>
            <span className={classes.badge}>3</span>
            Conectar sua conta
          </Typography>
          <Typography style={{ fontSize: 12, color: "#555", marginBottom: 10 }}>
            Clique abaixo para autorizar o acesso ao Google Business Profile da sua empresa.
          </Typography>
          <Button variant="contained" fullWidth onClick={handleConnect}
            style={{ backgroundColor: "#4285f4", color: "#fff", textTransform: "none", fontWeight: 600, borderRadius: 8 }}>
            Conectar com Google
          </Button>
        </Box>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button onClick={onClose} variant="outlined" style={{ textTransform: "none" }}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GoogleMyBusinessModal;
