import React, { useState, useEffect, useRef } from "react";
import {
  Box, Typography, Card, CardContent, Grid, Button, TextField,
  CircularProgress, LinearProgress, Chip, Divider, IconButton,
  InputAdornment, Tooltip, Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  CloudUpload, Delete, Visibility, VisibilityOff, CheckCircle,
  Warning, Info, LockOutlined, Receipt, TrendingUp, MonetizationOn
} from "@material-ui/icons";
import { toast } from "react-toastify";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: { padding: 24, backgroundColor: "#f8fafc", minHeight: "100vh" },
  title: { fontSize: 26, fontWeight: 700, color: "#1a202c" },
  subtitle: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  card: { borderRadius: 12, border: "1px solid #e2e8f0", backgroundColor: "#fff" },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#2d3748", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 },
  metricCard: { borderRadius: 12, border: "1px solid #e2e8f0", backgroundColor: "#fff", padding: "20px 24px" },
  metricValue: { fontSize: 36, fontWeight: 800, color: "#1a202c", lineHeight: 1 },
  metricLabel: { fontSize: 13, color: "#718096", fontWeight: 500, marginBottom: 6 },
  metricSub: { fontSize: 12, color: "#a0aec0", marginTop: 6 },
  uploadBox: {
    border: "2px dashed #cbd5e0", borderRadius: 12, padding: "32px 24px", textAlign: "center",
    cursor: "pointer", transition: "all .2s", backgroundColor: "#f7fafc",
    "&:hover": { borderColor: "#6366f1", backgroundColor: "#f5f3ff" }
  },
  uploadBoxActive: { borderColor: "#6366f1", backgroundColor: "#f5f3ff" },
  certCard: { borderRadius: 12, border: "1px solid #c3dafe", backgroundColor: "#ebf4ff", padding: "16px 20px" },
  warnCard: { borderRadius: 12, border: "1px solid #fed7aa", backgroundColor: "#fffbeb", padding: "16px 20px" },
  dangerCard: { borderRadius: 12, border: "1px solid #feb2b2", backgroundColor: "#fff5f5", padding: "16px 20px" },
}));

export default function Fiscal() {
  const classes = useStyles();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [config, setConfig] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { loadConfig(); }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/fiscal/config");
      setConfig(data);
    } catch { toast.error("Erro ao carregar configuração fiscal"); }
    finally { setLoading(false); }
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.name.endsWith(".pfx") && !file.name.endsWith(".p12")) {
      toast.error("Apenas arquivos .pfx ou .p12 são aceitos");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Selecione um arquivo .pfx");
    if (!password) return toast.error("Informe a senha do certificado");
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("certificate", selectedFile);
      formData.append("password", password);
      await api.post("/fiscal/certificate", formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Certificado enviado com sucesso!");
      setSelectedFile(null);
      setPassword("");
      await loadConfig();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Erro ao enviar certificado");
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Remover o certificado digital?")) return;
    try {
      await api.delete("/fiscal/certificate");
      toast.success("Certificado removido");
      await loadConfig();
    } catch { toast.error("Erro ao remover certificado"); }
  };

  const handleUpdatePassword = async () => {
    if (!password) return toast.error("Informe a nova senha");
    setSaving(true);
    try {
      await api.put("/fiscal/password", { password });
      toast.success("Senha atualizada!");
      setPassword("");
    } catch { toast.error("Erro ao atualizar senha"); }
    finally { setSaving(false); }
  };

  if (loading) return <Box display="flex" justifyContent="center" pt={8}><CircularProgress /></Box>;

  const pct = config?.nfLimit > 0 ? Math.min(100, Math.round((config.nfCurrentCount / config.nfLimit) * 100)) : 0;
  const isOverLimit = config?.nfCurrentCount > config?.nfLimit;
  const isNearLimit = !isOverLimit && pct >= 80;

  return (
    <Box className={classes.root}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
        <Box>
          <Typography className={classes.title}>Fiscal</Typography>
          <Typography className={classes.subtitle}>Certificado digital A1 e controle de emissões de notas fiscais</Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* ── Métricas de Emissão ── */}
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}><Receipt style={{ color: "#6366f1" }} />Controle de Emissões</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className={classes.metricCard}>
            <Typography className={classes.metricLabel}>Limite do Plano</Typography>
            <Typography className={classes.metricValue}>{config?.nfLimit ?? 0}</Typography>
            <Typography className={classes.metricSub}>emissões/mês</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className={classes.metricCard}>
            <Typography className={classes.metricLabel}>Emissões Utilizadas</Typography>
            <Typography className={classes.metricValue} style={{ color: isOverLimit ? "#e53e3e" : isNearLimit ? "#dd6b20" : "#38a169" }}>
              {config?.nfCurrentCount ?? 0}
            </Typography>
            <Typography className={classes.metricSub}>
              {config?.nfLastResetDate ? `Desde ${new Date(config.nfLastResetDate).toLocaleDateString("pt-BR")}` : "neste período"}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className={classes.metricCard}>
            <Typography className={classes.metricLabel}>Disponível</Typography>
            <Typography className={classes.metricValue} style={{ color: "#6366f1" }}>
              {config?.nfAvailable ?? 0}
            </Typography>
            <Typography className={classes.metricSub}>emissões restantes</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className={classes.metricCard}>
            <Typography className={classes.metricLabel}>Valor por Extra</Typography>
            <Typography className={classes.metricValue} style={{ color: "#f59e0b" }}>
              {config?.nfBillingEnabled
                ? `R$${Number(config?.nfPricePerExtra ?? 0).toFixed(2)}`
                : "—"}
            </Typography>
            <Typography className={classes.metricSub}>
              {config?.nfBillingEnabled ? "por emissão acima do limite" : "cobrança não habilitada"}
            </Typography>
          </Box>
        </Grid>

        {/* Barra de progresso */}
        <Grid item xs={12}>
          <Card className={classes.card} elevation={0}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography style={{ fontSize: 14, fontWeight: 600, color: "#2d3748" }}>Utilização do limite mensal</Typography>
                <Chip
                  label={`${pct}%`}
                  size="small"
                  style={{
                    backgroundColor: isOverLimit ? "#fff5f5" : isNearLimit ? "#fffbeb" : "#f0fff4",
                    color: isOverLimit ? "#e53e3e" : isNearLimit ? "#dd6b20" : "#38a169",
                    fontWeight: 700
                  }}
                />
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(pct, 100)}
                style={{ height: 10, borderRadius: 5, backgroundColor: "#e2e8f0" }}
              />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography style={{ fontSize: 12, color: "#718096" }}>{config?.nfCurrentCount ?? 0} utilizadas</Typography>
                <Typography style={{ fontSize: 12, color: "#718096" }}>{config?.nfLimit ?? 0} limite</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Alerta de excesso */}
        {config?.nfBillingEnabled && config?.nfExtraCount > 0 && (
          <Grid item xs={12}>
            <Box className={classes.dangerCard} display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={10}>
                <Warning style={{ color: "#e53e3e", marginRight: 8 }} />
                <Box>
                  <Typography style={{ fontWeight: 700, color: "#c53030" }}>Emissões extras acumuladas</Typography>
                  <Typography style={{ fontSize: 13, color: "#742a2a" }}>
                    Você tem <strong>{config.nfExtraCount}</strong> emissões além do limite — total a pagar:{" "}
                    <strong>R${Number(config.nfExtraTotal).toFixed(2)}</strong>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        )}

        {isNearLimit && !isOverLimit && (
          <Grid item xs={12}>
            <Box className={classes.warnCard} display="flex" alignItems="center" gap={10}>
              <Info style={{ color: "#dd6b20", marginRight: 8 }} />
              <Typography style={{ fontSize: 13, color: "#7b341e" }}>
                Você utilizou <strong>{pct}%</strong> do seu limite mensal. Restam apenas <strong>{config?.nfAvailable}</strong> emissões.
              </Typography>
            </Box>
          </Grid>
        )}

        {/* ── Certificado Digital A1 ── */}
        <Grid item xs={12} style={{ marginTop: 8 }}>
          <Typography className={classes.sectionTitle}><LockOutlined style={{ color: "#6366f1" }} />Certificado Digital A1</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.card} elevation={0}>
            <CardContent>
              {config?.hasCertificate ? (
                /* Certificado já carregado */
                <Box>
                  <Box className={classes.certCard} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center" gap={8}>
                      <CheckCircle style={{ color: "#3182ce", marginRight: 8 }} />
                      <Box>
                        <Typography style={{ fontWeight: 700, color: "#2c5282" }}>Certificado A1 instalado</Typography>
                        {config?.certificateExpiry && (
                          <Typography style={{ fontSize: 12, color: "#4a5568" }}>
                            Válido até: {new Date(config.certificateExpiry).toLocaleDateString("pt-BR")}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Tooltip title="Remover certificado">
                      <IconButton size="small" onClick={handleDelete} style={{ color: "#e53e3e" }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography style={{ fontSize: 14, fontWeight: 600, color: "#2d3748", marginBottom: 8 }}>
                    Atualizar senha do certificado
                  </Typography>
                  <TextField
                    fullWidth variant="outlined" size="small" label="Nova senha"
                    type={showPassword ? "text" : "password"}
                    value={password} onChange={e => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    fullWidth variant="contained" onClick={handleUpdatePassword}
                    disabled={saving || !password}
                    style={{ marginTop: 12, backgroundColor: "#6366f1", color: "#fff", textTransform: "none" }}>
                    {saving ? <CircularProgress size={18} style={{ color: "#fff" }} /> : "Atualizar Senha"}
                  </Button>
                </Box>
              ) : (
                /* Upload de novo certificado */
                <Box>
                  <Box
                    className={`${classes.uploadBox} ${dragging ? classes.uploadBoxActive : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    mb={2}
                  >
                    <CloudUpload style={{ fontSize: 40, color: "#6366f1", marginBottom: 8 }} />
                    <Typography style={{ fontWeight: 600, color: "#2d3748" }}>
                      {selectedFile ? selectedFile.name : "Clique ou arraste o arquivo .pfx"}
                    </Typography>
                    <Typography style={{ fontSize: 12, color: "#718096", marginTop: 4 }}>
                      Certificado digital A1 — formato .pfx ou .p12
                    </Typography>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pfx,.p12"
                      style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files[0])}
                    />
                  </Box>

                  {selectedFile && (
                    <Chip
                      label={selectedFile.name}
                      onDelete={() => setSelectedFile(null)}
                      style={{ marginBottom: 16, backgroundColor: "#ebf4ff", color: "#3182ce" }}
                    />
                  )}

                  <TextField
                    fullWidth variant="outlined" size="small" label="Senha do certificado"
                    type={showPassword ? "text" : "password"}
                    value={password} onChange={e => setPassword(e.target.value)}
                    style={{ marginBottom: 12 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  <Button
                    fullWidth variant="contained" onClick={handleUpload}
                    disabled={saving || !selectedFile || !password}
                    style={{ backgroundColor: "#6366f1", color: "#fff", textTransform: "none" }}>
                    {saving ? <CircularProgress size={18} style={{ color: "#fff" }} /> : "Enviar Certificado"}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Info lateral */}
        <Grid item xs={12} md={6}>
          <Card className={classes.card} elevation={0} style={{ height: "100%" }}>
            <CardContent>
              <Typography className={classes.sectionTitle}><Info style={{ color: "#6366f1" }} />Informações do Plano Fiscal</Typography>
              <Box display="flex" flexDirection="column" gap={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <Typography style={{ fontSize: 13, color: "#4a5568" }}>Emissões incluídas</Typography>
                  <Typography style={{ fontWeight: 700 }}>{config?.nfLimit ?? 0}/mês</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <Typography style={{ fontSize: 13, color: "#4a5568" }}>Cobrança por extra</Typography>
                  <Chip
                    label={config?.nfBillingEnabled ? "Ativada" : "Desativada"}
                    size="small"
                    style={{
                      backgroundColor: config?.nfBillingEnabled ? "#f0fff4" : "#fff5f5",
                      color: config?.nfBillingEnabled ? "#38a169" : "#e53e3e",
                      fontWeight: 600
                    }}
                  />
                </Box>
                {config?.nfBillingEnabled && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" py={1} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <Typography style={{ fontSize: 13, color: "#4a5568" }}>Valor por emissão extra</Typography>
                    <Typography style={{ fontWeight: 700, color: "#f59e0b" }}>
                      R${Number(config?.nfPricePerExtra ?? 0).toFixed(2)}
                    </Typography>
                  </Box>
                )}
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <Typography style={{ fontSize: 13, color: "#4a5568" }}>Extras acumulados</Typography>
                  <Typography style={{ fontWeight: 700, color: config?.nfExtraCount > 0 ? "#e53e3e" : "#38a169" }}>
                    {config?.nfExtraCount ?? 0} emissões
                  </Typography>
                </Box>
                {config?.nfBillingEnabled && config?.nfExtraCount > 0 && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                    <Typography style={{ fontSize: 13, color: "#4a5568", fontWeight: 600 }}>Total a pagar (extras)</Typography>
                    <Typography style={{ fontWeight: 800, color: "#e53e3e", fontSize: 16 }}>
                      R${Number(config?.nfExtraTotal ?? 0).toFixed(2)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
