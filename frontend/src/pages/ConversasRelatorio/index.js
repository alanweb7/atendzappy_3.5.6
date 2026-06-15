import React, { useState, useEffect, useContext } from "react";
import {
  Box, Card, CardContent, Grid, Typography, Select, MenuItem,
  FormControl, InputLabel, CircularProgress, Chip,
  TextField, Button, Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TimerIcon from "@material-ui/icons/Timer";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import GetAppIcon from "@material-ui/icons/GetApp";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles(() => ({
  root: { padding: "24px", backgroundColor: "#f8fafc", minHeight: "100vh" },
  title: { fontSize: 24, fontWeight: 700, color: "#1a202c" },
  subtitle: { fontSize: 14, color: "#718096", marginTop: 4 },
  filterBar: {
    display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap",
    backgroundColor: "#fff", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0"
  },
  metricCard: {
    borderRadius: 12, border: "1px solid #e2e8f0", height: "100%",
    "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }
  },
  metricLabel: { fontSize: 13, color: "#718096", fontWeight: 500, marginBottom: 4 },
  metricValue: { fontSize: 32, fontWeight: 700, color: "#1a202c", lineHeight: 1 },
  metricSub: { fontSize: 12, color: "#a0aec0", marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#2d3748", margin: "24px 0 12px" },
  efficiencyBar: {
    height: 10, borderRadius: 5, backgroundColor: "#e2e8f0", overflow: "hidden", marginTop: 8
  },
  efficiencyFill: { height: "100%", borderRadius: 5, transition: "width 0.6s ease" },
}));

const PERIOD_OPTIONS = [
  { label: "Hoje", value: 0 },
  { label: "Últimos 7 dias", value: 7 },
  { label: "Últimos 15 dias", value: 15 },
  { label: "Últimos 30 dias", value: 30 },
  { label: "Últimos 60 dias", value: 60 },
  { label: "Personalizado", value: "custom" },
];

const fmt = (d) => format(new Date(d), "yyyy-MM-dd");
const fmtDisplay = (d) => format(new Date(d + "T00:00:00"), "dd/MM/yyyy", { locale: ptBR });

export default function ConversasRelatorio() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [period, setPeriod] = useState(0);
  const [customStart, setCustomStart] = useState(fmt(subDays(new Date(), 7)));
  const [customEnd, setCustomEnd] = useState(fmt(new Date()));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    api.get(`/companies/${user?.companyId}`)
      .then(({ data }) => setCompanyName(data?.name || ""))
      .catch(() => setCompanyName(""));
  }, [user?.companyId]);

  const isAdmin = user?.profile === "admin" || user?.userType === "administrador" || user?.userType === "gerente";

  const getDateRange = () => {
    if (period === "custom") return { start: customStart, end: customEnd };
    const end = fmt(new Date());
    const start = fmt(subDays(new Date(), period));
    return { start, end };
  };

  const getPeriodLabel = () => {
    const opt = PERIOD_OPTIONS.find(o => o.value === period);
    if (opt && opt.value !== "custom") return opt.label;
    if (period === "custom") return `${fmtDisplay(customStart)} a ${fmtDisplay(customEnd)}`;
    return "Hoje";
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const { start, end } = getDateRange();
      const dateParams = period !== 0 ? { dateStart: start, dateEnd: end } : {};
      const p = { pageSize: 1, showAll: isAdmin ? "true" : "false", ...dateParams };

      const [automacaoRes, aguardandoRes, atendendoRes, finalizadosRes, dashRes] = await Promise.all([
        api.get("/tickets", { params: { ...p, status: "pending", pendingType: "automation" } }),
        api.get("/tickets", { params: { ...p, status: "pending", pendingType: "assigned" } }),
        api.get("/tickets", { params: { ...p, status: "open" } }),
        api.get("/tickets", { params: { ...p, status: "closed" } }),
        api.get("/dashboard", { params: { dateStart: start, dateEnd: end } }),
      ]);

      setData({
        automacao: automacaoRes.data?.count || 0,
        aguardando: aguardandoRes.data?.count || 0,
        atendendo: atendendoRes.data?.count || 0,
        finalizados: finalizadosRes.data?.count || 0,
        avgWaitTime: dashRes.data?.counters?.avgWaitTime || 0,
      });
    } catch {
      setData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (period !== "custom") loadData();
    // eslint-disable-next-line
  }, [period]);

  const automacao = data?.automacao || 0;
  const aguardando = data?.aguardando || 0;
  const atendendo = data?.atendendo || 0;
  const finalizados = data?.finalizados || 0;
  const total = automacao + aguardando + atendendo + finalizados;
  const resolutionRate = total > 0 ? Math.round((finalizados / total) * 100) : 0;
  const occupationRate = total > 0 ? Math.round((atendendo / total) * 100) : 0;
  const queueRate = total > 0 ? Math.round((aguardando / total) * 100) : 0;
  const avgWaitRaw = Math.round(data?.avgWaitTime || 0);
  const avgWaitFormatted = avgWaitRaw >= 60
    ? `${Math.floor(avgWaitRaw / 60)}h ${avgWaitRaw % 60}m`
    : `${avgWaitRaw}m`;

  const metrics = [
    { label: "Total de Conversas", value: total, icon: <ChatIcon style={{ color: "#4299e1" }} />, color: "#ebf8ff", sub: "Automação + Aguardando + Atendendo + Finalizadas" },
    { label: "Finalizadas", value: finalizados, icon: <CheckCircleIcon style={{ color: "#38a169" }} />, color: "#f0fff4", sub: `${resolutionRate}% do total` },
    { label: "Em Atendimento", value: atendendo, icon: <AssignmentTurnedInIcon style={{ color: "#ed8936" }} />, color: "#fffaf0", sub: "Com atendente atribuído" },
    { label: "Aguardando", value: aguardando, icon: <HourglassEmptyIcon style={{ color: "#9f7aea" }} />, color: "#faf5ff", sub: "Com fila ou usuário, sem início" },
    { label: "Tempo Médio Espera", value: avgWaitFormatted, icon: <TimerIcon style={{ color: "#e53e3e" }} />, color: "#fff5f5", sub: "Desde abertura até 1º atendimento" },
    { label: "Automação", value: automacao, icon: <PeopleIcon style={{ color: "#3182ce" }} />, color: "#ebf8ff", sub: "Sem fila e sem usuário" },
  ];

  const efficiency = [
    { label: "Taxa de Resolução", value: resolutionRate, color: "#38a169", desc: `${finalizados} de ${total} conversas finalizadas` },
    { label: "Taxa de Ocupação", value: occupationRate, color: "#ed8936", desc: `${atendendo} conversas em atendimento` },
    { label: "Taxa de Fila", value: queueRate, color: "#9f7aea", desc: `${aguardando} conversas aguardando atendente` },
  ];

  const handleExportHTML = () => {
    const periodLabel = getPeriodLabel();
    const now = format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR });

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Relatório de Conversas — ${periodLabel}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #1a202c; padding: 40px; }
  .header { margin-bottom: 32px; border-bottom: 3px solid #4299e1; padding-bottom: 16px; }
  .header h1 { font-size: 28px; font-weight: 800; color: #1a202c; }
  .header p { color: #718096; font-size: 14px; margin-top: 6px; }
  .badge { display: inline-block; background: #4299e1; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-top: 8px; }
  .section-title { font-size: 18px; font-weight: 700; color: #2d3748; margin: 32px 0 16px; border-left: 4px solid #4299e1; padding-left: 12px; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 8px; }
  .card { border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; }
  .card-label { font-size: 13px; color: #718096; font-weight: 600; margin-bottom: 8px; }
  .card-value { font-size: 36px; font-weight: 800; color: #1a202c; line-height: 1; }
  .card-sub { font-size: 12px; color: #a0aec0; margin-top: 8px; }
  .eff-item { margin-bottom: 20px; }
  .eff-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .eff-label { font-size: 15px; font-weight: 700; color: #2d3748; }
  .eff-chip { padding: 4px 12px; border-radius: 20px; color: #fff; font-size: 13px; font-weight: 700; }
  .eff-bar-bg { height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; }
  .eff-bar-fill { height: 100%; border-radius: 5px; }
  .eff-desc { font-size: 12px; color: #a0aec0; margin-top: 6px; }
  .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #a0aec0; }
  @media (max-width: 768px) {
    body { padding: 16px; }
    .header h1 { font-size: 22px; }
    .grid { grid-template-columns: 1fr; gap: 12px; }
    .card-value { font-size: 28px; }
    .section-title { font-size: 16px; }
  }
  @media (max-width: 480px) {
    .grid { grid-template-columns: 1fr; }
    .card { padding: 16px; }
    .card-value { font-size: 24px; }
  }
  @media print { body { background: #fff; padding: 20px; } }
</style>
</head>
<body>
<div class="header">
  <h1>📊 Relatório de Conversas</h1>
  <p>Análise de atendimentos e eficiência por período</p>
  <span class="badge">📅 ${periodLabel}</span>
</div>

<div class="section-title">Visão Geral</div>
<div class="grid">
  ${metrics.map(m => `
  <div class="card" style="background:${m.color}">
    <div class="card-label">${m.label}</div>
    <div class="card-value">${m.value}</div>
    <div class="card-sub">${m.sub}</div>
  </div>`).join("")}
</div>

<div class="section-title">Eficiência do Atendimento</div>
<div class="card" style="background:#fff; padding:24px;">
  ${efficiency.map(e => `
  <div class="eff-item">
    <div class="eff-header">
      <span class="eff-label">${e.label}</span>
      <span class="eff-chip" style="background:${e.color}">${e.value}%</span>
    </div>
    <div class="eff-bar-bg">
      <div class="eff-bar-fill" style="width:${e.value}%;background:${e.color}"></div>
    </div>
    <div class="eff-desc">${e.desc}</div>
  </div>`).join("")}
</div>

<div class="footer">
  Gerado em ${now} · ${user?.name || "Usuário"} · ${companyName || "Sistema"}
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-conversas-${fmt(new Date())}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography className={classes.title}>Relatório de Conversas</Typography>
          <Typography className={classes.subtitle}>Análise de atendimentos e eficiência por período</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<GetAppIcon />}
          onClick={handleExportHTML}
          disabled={loading || !data}
          style={{ backgroundColor: "#4299e1", color: "#fff", borderRadius: 8 }}
        >
          Exportar HTML
        </Button>
      </Box>

      {/* Filtros */}
      <Box className={classes.filterBar}>
        <FormControl size="small" variant="outlined" style={{ minWidth: 180 }}>
          <InputLabel>Período</InputLabel>
          <Select value={period} onChange={e => setPeriod(e.target.value)} label="Período">
            {PERIOD_OPTIONS.map(o => (
              <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {period === "custom" && (
          <>
            <TextField
              label="De" type="date" size="small" variant="outlined"
              value={customStart} onChange={e => setCustomStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Até" type="date" size="small" variant="outlined"
              value={customEnd} onChange={e => setCustomEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" color="primary" size="small" onClick={loadData}>
              Aplicar
            </Button>
          </>
        )}

        {loading && <CircularProgress size={20} />}
      </Box>

      {/* Cards */}
      <Typography className={classes.sectionTitle}>Visão Geral</Typography>
      <Grid container spacing={2}>
        {metrics.map((m, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card className={classes.metricCard} elevation={0}>
              <CardContent style={{ backgroundColor: m.color, borderRadius: 12 }}>
                <Box display="flex" alignItems="center" style={{ gap: 8, marginBottom: 8 }}>
                  {m.icon}
                  <Typography className={classes.metricLabel}>{m.label}</Typography>
                </Box>
                <Typography className={classes.metricValue}>{loading ? "—" : m.value}</Typography>
                <Typography className={classes.metricSub}>{m.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Eficiência */}
      <Typography className={classes.sectionTitle}>Eficiência do Atendimento</Typography>
      <Card elevation={0} style={{ borderRadius: 12, border: "1px solid #e2e8f0" }}>
        <CardContent style={{ padding: 24 }}>
          {efficiency.map((item, i) => (
            <Box key={i} mb={i < 2 ? 3 : 0}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography style={{ fontSize: 15, fontWeight: 700, color: "#2d3748" }}>
                  {item.label}
                </Typography>
                <Chip
                  label={loading ? "—" : `${item.value}%`}
                  size="small"
                  style={{ backgroundColor: item.color, color: "#fff", fontWeight: 700, fontSize: 13 }}
                />
              </Box>
              <Box className={classes.efficiencyBar}>
                <Box
                  className={classes.efficiencyFill}
                  style={{ width: loading ? "0%" : `${item.value}%`, backgroundColor: item.color }}
                />
              </Box>
              <Typography style={{ fontSize: 12, color: "#a0aec0", marginTop: 4 }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
