import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, CircularProgress,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close, Refresh, FileCopy } from "@material-ui/icons";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import { toast } from "react-toastify";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 20px 10px",
    "& h6": { fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }
  },
  content: { padding: "8px 20px 4px" },
  actions: { padding: "8px 20px 14px", gap: 8, display: "flex", justifyContent: "flex-end" },
  resultBox: {
    backgroundColor: "#f8fafc", borderRadius: 8, padding: "12px 14px",
    border: "1px solid #e2e8f0", fontSize: 14, lineHeight: 1.6,
    color: "#1a1a2e", whiteSpace: "pre-wrap", minHeight: 80,
    maxHeight: 360, overflowY: "auto"
  },
  tag: {
    display: "inline-block", fontSize: 10, fontWeight: 700,
    borderRadius: 4, padding: "1px 6px", marginLeft: 6,
    backgroundColor: "#ede9fe", color: "#7c3aed"
  }
}));

// ─────────── Sugerir Resposta ───────────
export const AiSuggestModal = ({ open, onClose, ticketId, onUse }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [provider, setProvider] = useState("");

  const generate = async (text = "") => {
    setLoading(true);
    setResult("");
    try {
      const { data } = await api.post(`/tickets/${ticketId}/ai-suggestion`, {
        currentText: text || undefined
      });
      setResult(data.result || "");
      setProvider(data.provider || "");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Erro ao gerar sugestão.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => { setResult(""); generate(); };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      TransitionProps={{ onEnter: handleOpen }}>
      <DialogTitle disableTypography className={classes.title}>
        <Typography variant="h6">
          <AutoAwesome style={{ color: "#7c3aed", fontSize: 20 }} />
          Sugerir Resposta
          {provider && <span className={classes.tag}>{provider}</span>}
        </Typography>
        <IconButton size="small" onClick={onClose}><Close fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {loading ? (
          <Box display="flex" alignItems="center" gap={2} py={3} justifyContent="center">
            <CircularProgress size={22} style={{ color: "#7c3aed" }} />
            <Typography style={{ color: "#6b7280", fontSize: 13 }}>Gerando resposta...</Typography>
          </Box>
        ) : result ? (
          <Box className={classes.resultBox}>{result}</Box>
        ) : null}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button size="small" startIcon={<Refresh />} onClick={() => generate()}
          disabled={loading} style={{ textTransform: "none", color: "#7c3aed" }}>
          Gerar novamente
        </Button>
        <Button size="small" startIcon={<FileCopy />} onClick={() => { navigator.clipboard.writeText(result); toast.success("Copiado!"); }}
          disabled={!result || loading} variant="outlined" style={{ textTransform: "none" }}>
          Copiar
        </Button>
        <Button size="small" variant="contained" onClick={() => { onUse(result); onClose(); }}
          disabled={!result || loading}
          style={{ backgroundColor: "#7c3aed", color: "#fff", textTransform: "none" }}>
          Usar no chat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─────────── Resumir Conversa ───────────
export const AiSummaryModal = ({ open, onClose, ticketId }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [provider, setProvider] = useState("");

  const generate = async () => {
    setLoading(true);
    setResult("");
    try {
      const { data } = await api.post(`/tickets/${ticketId}/ai-summarize`);
      setResult(data.result || "");
      setProvider(data.provider || "");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Erro ao resumir conversa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      TransitionProps={{ onEnter: generate }}>
      <DialogTitle disableTypography className={classes.title}>
        <Typography variant="h6">
          <span style={{ fontSize: 18 }}>📋</span>
          Resumir Conversa
          {provider && <span className={classes.tag}>{provider}</span>}
        </Typography>
        <IconButton size="small" onClick={onClose}><Close fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {loading ? (
          <Box display="flex" alignItems="center" gap={2} py={3} justifyContent="center">
            <CircularProgress size={22} style={{ color: "#7c3aed" }} />
            <Typography style={{ color: "#6b7280", fontSize: 13 }}>Resumindo conversa...</Typography>
          </Box>
        ) : result ? (
          <Box className={classes.resultBox}>{result}</Box>
        ) : null}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button size="small" startIcon={<Refresh />} onClick={generate}
          disabled={loading} style={{ textTransform: "none", color: "#7c3aed" }}>
          Gerar novamente
        </Button>
        <Button size="small" startIcon={<FileCopy />} onClick={() => { navigator.clipboard.writeText(result); toast.success("Copiado!"); }}
          disabled={!result || loading} variant="outlined" style={{ textTransform: "none" }}>
          Copiar
        </Button>
        <Button size="small" onClick={onClose} style={{ textTransform: "none" }}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

// ─────────── Perguntar à IA (estilo chat) ───────────
export const AiAskModal = ({ open, onClose, ticketId }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [provider, setProvider] = useState("");
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleAsk = async () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);
    try {
      const { data } = await api.post(`/tickets/${ticketId}/ai-ask`, { question: q });
      setProvider(data.provider || "");
      setMessages(prev => [...prev, { role: "ai", text: data.result || "" }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "error", text: err?.response?.data?.error || "Erro ao processar." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => { setInput(""); setMessages([]); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth
      PaperProps={{ style: { borderRadius: 14, maxHeight: "85vh", display: "flex", flexDirection: "column" } }}>

      {/* Header */}
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 18px", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
        <Typography style={{ fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>💬</span>
          Perguntar à IA
          {provider && (
            <span style={{ fontSize: 10, fontWeight: 700, borderRadius: 4, padding: "1px 6px",
              backgroundColor: "#ede9fe", color: "#7c3aed" }}>{provider}</span>
          )}
        </Typography>
        <IconButton size="small" onClick={handleClose}><Close fontSize="small" /></IconButton>
      </Box>

      {/* Mensagens */}
      <Box style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex",
        flexDirection: "column", gap: 10, backgroundColor: "#f8fafc", minHeight: 240 }}>
        {messages.length === 0 && (
          <Box style={{ textAlign: "center", color: "#9ca3af", marginTop: 40 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
            <Typography style={{ fontSize: 13 }}>
              Faça perguntas sobre esta conversa.<br/>A IA tem acesso às últimas 100 mensagens.
            </Typography>
            <Typography style={{ fontSize: 11, marginTop: 8, color: "#c4b5fd" }}>
              Ex: "Que dia o cliente pediu o orçamento?"<br/>"Qual foi o problema relatado?"
            </Typography>
          </Box>
        )}
        {messages.map((msg, i) => (
          <Box key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <Box style={{
              maxWidth: "82%",
              padding: "9px 13px",
              borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              backgroundColor: msg.role === "user" ? "#7c3aed" : msg.role === "error" ? "#fee2e2" : "#fff",
              color: msg.role === "user" ? "#fff" : msg.role === "error" ? "#b91c1c" : "#1a1a2e",
              fontSize: 13, lineHeight: 1.55,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              whiteSpace: "pre-wrap", wordBreak: "break-word"
            }}>
              {msg.text}
            </Box>
          </Box>
        ))}
        {loading && (
          <Box style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 2px" }}>
            <CircularProgress size={16} style={{ color: "#7c3aed" }} />
            <Typography style={{ fontSize: 12, color: "#7c3aed" }}>Consultando IA...</Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box style={{ padding: "10px 14px", borderTop: "1px solid #f0f0f0", backgroundColor: "#fff",
        display: "flex", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
        <TextField
          fullWidth variant="outlined" size="small" multiline maxRows={3}
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAsk(); } }}
          disabled={loading}
          InputProps={{ style: { borderRadius: 10, fontSize: 13 } }}
        />
        <IconButton
          onClick={handleAsk}
          disabled={loading || !input.trim()}
          style={{ backgroundColor: "#7c3aed", color: "#fff", width: 38, height: 38,
            opacity: loading || !input.trim() ? 0.5 : 1 }}
        >
          <span style={{ fontSize: 16 }}>↑</span>
        </IconButton>
      </Box>
    </Dialog>
  );
};
