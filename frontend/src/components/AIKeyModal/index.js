import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, Box, IconButton,
  InputAdornment, FormControlLabel, Switch, CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import api from "../../services/api";
import toastError from "../../errors/toastError";

const PROVIDERS = {
  openai: {
    title: "OpenAI",
    color: "#10a37f",
    description: "Configure sua chave de API da OpenAI para habilitar funcionalidades de IA como GPT-4, geração de texto e análise de conteúdo.",
    label: "API Key da OpenAI",
    placeholder: "sk-...",
    docsUrl: "https://platform.openai.com/api-keys",
  },
  gemini: {
    title: "Google Gemini",
    color: "#4285f4",
    description: "Configure sua chave de API do Google Gemini para usar os modelos de IA generativa do Google.",
    label: "API Key do Gemini",
    placeholder: "AIza...",
    docsUrl: "https://aistudio.google.com/app/apikey",
  },
  grok: {
    title: "Grok (xAI)",
    color: "#1d9bf0",
    description: "Configure sua chave de API do Grok da xAI para usar o modelo de linguagem da empresa de Elon Musk.",
    label: "API Key do Grok",
    placeholder: "xai-...",
    docsUrl: "https://console.x.ai",
  },
};

const useStyles = makeStyles((theme) => ({
  btnWrapper: { position: "relative" },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  infoBox: {
    borderRadius: 8,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: "1px solid",
  },
}));

const AIKeyModal = ({ open, onClose, onSave, provider }) => {
  const classes = useStyles();
  const info = PROVIDERS[provider] || PROVIDERS.openai;

  const [apiKey, setApiKey] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fetch = async () => {
      try {
        const { data } = await api.get("/ai-settings");
        const existing = (Array.isArray(data) ? data : []).find(item => item.provider === provider);
        if (existing) {
          setApiKey(existing.apiKey || "");
          setActive(existing.active !== false);
        } else {
          setApiKey("");
          setActive(true);
        }
      } catch { }
    };
    fetch();
  }, [open, provider]);

  const handleClose = () => {
    setApiKey("");
    setActive(true);
    setShowKey(false);
    onClose();
  };

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast.error(`Informe a API Key do ${info.title}`);
      return;
    }
    try {
      setLoading(true);
      await api.post("/ai-settings", { provider, apiKey: apiKey.trim(), active });
      toast.success(`Integração ${info.title} salva com sucesso!`);
      if (onSave) onSave();
      handleClose();
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" scroll="paper">
      <DialogTitle style={{ background: info.color, color: "#fff", padding: "16px 24px" }}>
        Configurar {info.title}
      </DialogTitle>
      <DialogContent style={{ paddingTop: 20 }}>
        <Box
          className={classes.infoBox}
          style={{ backgroundColor: info.color + "10", borderColor: info.color + "40" }}
        >
          <Typography style={{ fontSize: 13, color: "#444" }}>
            {info.description}
          </Typography>
          <Typography style={{ fontSize: 12, color: info.color, marginTop: 6 }}>
            Obtenha sua chave em:{" "}
            <a href={info.docsUrl} target="_blank" rel="noopener noreferrer" style={{ color: info.color }}>
              {info.docsUrl}
            </a>
          </Typography>
        </Box>

        <TextField
          label={info.label}
          type={showKey ? "text" : "password"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          fullWidth
          margin="dense"
          variant="outlined"
          placeholder={info.placeholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowKey(!showKey)} edge="end">
                  {showKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box style={{ marginTop: 16 }}>
          <FormControlLabel
            control={
              <Switch
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                color="primary"
              />
            }
            label="Ativar integração"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={loading}>
          Cancelar
        </Button>
        <div className={classes.btnWrapper}>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={loading}
            style={{ backgroundColor: info.color, color: "#fff" }}
          >
            Salvar
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AIKeyModal;
