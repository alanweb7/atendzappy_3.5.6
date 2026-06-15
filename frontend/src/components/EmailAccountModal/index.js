import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, Switch, FormControlLabel, Grid, CircularProgress, Chip } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { toast } from "react-toastify";
import api from "../../services/api";

const PRESETS = {
  gmail: { imapHost: "imap.gmail.com", imapPort: 993, imapSecure: true, smtpHost: "smtp.gmail.com", smtpPort: 465, smtpSecure: true },
  outlook: { imapHost: "outlook.office365.com", imapPort: 993, imapSecure: true, smtpHost: "smtp.office365.com", smtpPort: 587, smtpSecure: false },
  yahoo: { imapHost: "imap.mail.yahoo.com", imapPort: 993, imapSecure: true, smtpHost: "smtp.mail.yahoo.com", smtpPort: 465, smtpSecure: true },
  zoho: { imapHost: "imap.zoho.com", imapPort: 993, imapSecure: true, smtpHost: "smtp.zoho.com", smtpPort: 465, smtpSecure: true },
};

const EMPTY = { name: "", email: "", password: "", imapHost: "", imapPort: 993, imapSecure: true, smtpHost: "", smtpPort: 465, smtpSecure: true, isDefault: false };

export default function EmailAccountModal({ open, onClose, account, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(account ? { ...account } : EMPTY);
      setTestResult(null);
    }
  }, [open, account]);

  const applyPreset = (key) => {
    setForm(f => ({ ...f, ...PRESETS[key] }));
    setTestResult(null);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      await api.post("/email-accounts/test", form);
      setTestResult({ ok: true });
      toast.success("Conexão bem-sucedida!");
    } catch (e) {
      const errors = e?.response?.data?.errors || [e?.response?.data?.error || "Erro desconhecido"];
      setTestResult({ ok: false, errors });
    }
    setTesting(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.password || !form.imapHost || !form.smtpHost) {
      toast.error("Preencha todos os campos obrigatórios"); return;
    }
    setSaving(true);
    try {
      if (account?.id) {
        await api.put(`/email-accounts/${account.id}`, form);
      } else {
        await api.post("/email-accounts", form);
      }
      toast.success(account ? "Conta atualizada!" : "Conta adicionada!");
      if (onSave) onSave();
      onClose();
    } catch (e) {
      toast.error(e?.response?.data?.error || "Erro ao salvar");
    }
    setSaving(false);
  };

  const set = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
    setTestResult(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle style={{ background: "#4299e1", color: "#fff", fontWeight: 700 }}>
        {account ? "Editar Conta de Email" : "Nova Conta de Email"}
      </DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        {/* Presets */}
        <Typography style={{ fontSize: 12, color: "#718096", marginBottom: 8 }}>Configuração rápida:</Typography>
        <Box display="flex" style={{ gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {Object.keys(PRESETS).map(k => (
            <Chip key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} size="small" onClick={() => applyPreset(k)} clickable style={{ backgroundColor: "#ebf8ff", color: "#4299e1", fontWeight: 600 }} />
          ))}
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nome da conta *" fullWidth size="small" variant="outlined" value={form.name} onChange={set("name")} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email *" fullWidth size="small" variant="outlined" value={form.email} onChange={set("email")} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Senha / App Password *" type="password" fullWidth size="small" variant="outlined" value={form.password} onChange={set("password")} helperText="Para Gmail use App Password (não a senha normal)" />
          </Grid>

          {/* IMAP */}
          <Grid item xs={12}><Typography style={{ fontSize: 13, fontWeight: 700, color: "#2d3748", marginTop: 4 }}>IMAP (Recebimento)</Typography></Grid>
          <Grid item xs={8}><TextField label="Servidor IMAP *" fullWidth size="small" variant="outlined" value={form.imapHost} onChange={set("imapHost")} /></Grid>
          <Grid item xs={4}><TextField label="Porta" type="number" fullWidth size="small" variant="outlined" value={form.imapPort} onChange={set("imapPort")} /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Switch checked={form.imapSecure} onChange={set("imapSecure")} color="primary" size="small" />} label="SSL/TLS" /></Grid>

          {/* SMTP */}
          <Grid item xs={12}><Typography style={{ fontSize: 13, fontWeight: 700, color: "#2d3748" }}>SMTP (Envio)</Typography></Grid>
          <Grid item xs={8}><TextField label="Servidor SMTP *" fullWidth size="small" variant="outlined" value={form.smtpHost} onChange={set("smtpHost")} /></Grid>
          <Grid item xs={4}><TextField label="Porta" type="number" fullWidth size="small" variant="outlined" value={form.smtpPort} onChange={set("smtpPort")} /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Switch checked={form.smtpSecure} onChange={set("smtpSecure")} color="primary" size="small" />} label="SSL/TLS" /></Grid>

          <Grid item xs={12}><FormControlLabel control={<Switch checked={form.isDefault} onChange={set("isDefault")} color="primary" size="small" />} label="Conta padrão" /></Grid>
        </Grid>

        {testResult && (
          <Box mt={2} p={2} style={{ borderRadius: 8, backgroundColor: testResult.ok ? "#f0fff4" : "#fff5f5", border: `1px solid ${testResult.ok ? "#9ae6b4" : "#feb2b2"}` }}>
            <Box display="flex" alignItems="center" style={{ gap: 6 }}>
              {testResult.ok ? <CheckCircleIcon style={{ color: "#38a169" }} /> : <ErrorIcon style={{ color: "#e53e3e" }} />}
              <Typography style={{ fontSize: 13, fontWeight: 700, color: testResult.ok ? "#38a169" : "#e53e3e" }}>
                {testResult.ok ? "Conexão bem-sucedida!" : "Erro na conexão"}
              </Typography>
            </Box>
            {testResult.errors?.map((e, i) => <Typography key={i} style={{ fontSize: 12, color: "#718096", marginTop: 4 }}>{e}</Typography>)}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancelar</Button>
        <Button onClick={handleTest} disabled={testing || saving} variant="outlined" color="primary">
          {testing ? <CircularProgress size={16} /> : "Testar Conexão"}
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving} style={{ backgroundColor: "#4299e1", color: "#fff" }}>
          {saving ? <CircularProgress size={16} color="inherit" /> : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
