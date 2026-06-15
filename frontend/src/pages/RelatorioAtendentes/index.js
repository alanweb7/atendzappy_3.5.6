import React, { useState, useEffect, useContext } from "react";
import { Box, Card, CardContent, Grid, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, Chip, TextField, Button, Avatar, Table, TableHead, TableRow, TableCell, TableBody, Tooltip } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import PeopleIcon from "@material-ui/icons/People";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles(() => ({
  root: { padding: "24px", backgroundColor: "#f8fafc", minHeight: "100vh" },
  title: { fontSize: 24, fontWeight: 700, color: "#1a202c" },
  subtitle: { fontSize: 14, color: "#718096", marginTop: 4 },
  filterBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap", backgroundColor: "#fff", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0" },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#2d3748", margin: "24px 0 12px", borderLeft: "4px solid #6366f1", paddingLeft: 12 },
  metricCard: { borderRadius: 12, border: "1px solid #e2e8f0" },
  metricValue: { fontSize: 32, fontWeight: 700, color: "#1a202c", lineHeight: 1 },
  metricLabel: { fontSize: 13, color: "#718096", fontWeight: 500, marginBottom: 4 },
  metricSub: { fontSize: 12, color: "#a0aec0", marginTop: 6 },
  tableHead: { backgroundColor: "#f0f4ff" },
}));

const PERIODS = [
  { label: "Hoje", value: 0 },
  { label: "Últimos 7 dias", value: 7 },
  { label: "Últimos 15 dias", value: 15 },
  { label: "Últimos 30 dias", value: 30 },
  { label: "Últimos 60 dias", value: 60 },
  { label: "Personalizado", value: "custom" },
];

const fmt = (d) => format(new Date(d), "yyyy-MM-dd");

export default function RelatorioAtendentes() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [period, setPeriod] = useState(0);
  const [customStart, setCustomStart] = useState(fmt(subDays(new Date(), 7)));
  const [customEnd, setCustomEnd] = useState(fmt(new Date()));
  const [loading, setLoading] = useState(false);
  const [atendentes, setAtendentes] = useState([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    api.get(`/companies/${user?.companyId}`).then(({ data }) => setCompanyName(data?.name || "")).catch(() => {});
  }, [user?.companyId]);

  const getRange = () => {
    if (period === "custom") return { start: customStart, end: customEnd };
    const end = fmt(new Date());
    const start = period === 0 ? end : fmt(subDays(new Date(), period));
    return { start, end };
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const { start, end } = getRange();
      const { data } = await api.get("/dashboard/ticketsUsers", {
        params: { initialDate: start, finalDate: end, companyId: user?.companyId }
      });
      // Resposta: { data: [ { nome, quantidade }, ... ] }
      const list = data?.data || data || [];
      setAtendentes(Array.isArray(list) ? list : []);
    } catch { setAtendentes([]); }
    setLoading(false);
  };

  useEffect(() => { if (period !== "custom") loadData(); }, [period]);

  const totalTickets = atendentes.reduce((s, a) => s + Number(a.quantidade || 0), 0);

  const renderStars = (media) => {
    const val = Math.round(Number(media || 0));
    return [1,2,3,4,5].map(i => i <= val
      ? <StarIcon key={i} style={{ fontSize: 16, color: "#f59e0b" }} />
      : <StarBorderIcon key={i} style={{ fontSize: 16, color: "#d1d5db" }} />
    );
  };
  const getPeriodLabel = () => { const o = PERIODS.find(p => p.value === period); return o?.value === "custom" ? `${customStart} a ${customEnd}` : o?.label || "Hoje"; };

  const handleExport = () => {
    const now = format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR });
    const rows = atendentes.map(a => {
      const media = Number(a.mediaAvaliacao || 0).toFixed(1);
      const stars = "★".repeat(Math.round(Number(media))) + "☆".repeat(5 - Math.round(Number(media)));
      return `<tr><td>${a.nome || "—"}</td><td style="text-align:center">${a.quantidade || 0}</td><td style="text-align:center">${totalTickets > 0 ? Math.round((Number(a.quantidade || 0) / totalTickets) * 100) : 0}%</td><td style="text-align:center;color:#f59e0b">${stars}</td><td style="text-align:center">${media}</td><td style="text-align:center">${a.totalAvaliacoes || 0}</td></tr>`;
    }).join("");
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Relatório de Atendentes</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#f8fafc;padding:40px;color:#1a202c}.header{margin-bottom:32px;border-bottom:3px solid #6366f1;padding-bottom:16px}.header h1{font-size:28px;font-weight:800}.badge{display:inline-block;background:#6366f1;color:#fff;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;margin-top:8px}.summary{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:24px 0}.card{background:#f0f0ff;border-radius:12px;padding:20px;border:1px solid #c3b5fd}.card-val{font-size:36px;font-weight:800}.card-lbl{font-size:13px;color:#718096;margin-bottom:8px}table{width:100%;border-collapse:collapse;margin-top:16px;background:#fff;border-radius:12px;overflow:hidden}th{background:#f0f4ff;padding:12px 16px;text-align:left;font-size:13px;color:#6366f1;font-weight:700}td{padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px}.footer{margin-top:40px;border-top:1px solid #e2e8f0;padding-top:16px;font-size:12px;color:#a0aec0}@media(max-width:600px){.summary{grid-template-columns:1fr}}</style></head><body>
<div class="header"><h1>👤 Relatório de Atendentes</h1><p>Desempenho por atendente no período</p><span class="badge">📅 ${getPeriodLabel()}</span></div>
<div class="summary"><div class="card"><div class="card-lbl">Total de Atendentes</div><div class="card-val">${atendentes.length}</div></div><div class="card"><div class="card-lbl">Total de Tickets</div><div class="card-val">${totalTickets}</div></div></div>
<table><thead><tr><th>Atendente</th><th style="text-align:center">Tickets</th><th style="text-align:center">Participação</th><th style="text-align:center">Avaliação</th><th style="text-align:center">Média</th><th style="text-align:center">Qtd. Avaliações</th></tr></thead><tbody>${rows}</tbody></table>
<div class="footer">Gerado em ${now} · ${user?.name || ""} · ${companyName}</div></body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `relatorio-atendentes-${fmt(new Date())}.html`; a.click();
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography className={classes.title}>Relatório de Atendentes</Typography>
          <Typography className={classes.subtitle}>Desempenho por atendente no período</Typography>
        </Box>
        <Button variant="contained" startIcon={<GetAppIcon />} onClick={handleExport} disabled={loading || !atendentes.length} style={{ backgroundColor: "#6366f1", color: "#fff", borderRadius: 8 }}>Exportar HTML</Button>
      </Box>

      <Box className={classes.filterBar}>
        <FormControl size="small" variant="outlined" style={{ minWidth: 180 }}>
          <InputLabel>Período</InputLabel>
          <Select value={period} onChange={e => setPeriod(e.target.value)} label="Período">
            {PERIODS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
          </Select>
        </FormControl>
        {period === "custom" && (<><TextField label="De" type="date" size="small" variant="outlined" value={customStart} onChange={e => setCustomStart(e.target.value)} InputLabelProps={{ shrink: true }} /><TextField label="Até" type="date" size="small" variant="outlined" value={customEnd} onChange={e => setCustomEnd(e.target.value)} InputLabelProps={{ shrink: true }} /><Button variant="contained" color="primary" size="small" onClick={loadData}>Aplicar</Button></>)}
        {loading && <CircularProgress size={20} />}
      </Box>

      <Grid container spacing={2} style={{ marginBottom: 24 }}>
        {[{ label: "Atendentes", value: atendentes.length, color: "#f0f0ff", sub: "Com tickets no período" }, { label: "Total de Tickets", value: totalTickets, color: "#ebf8ff", sub: "Atendidos no período" }].map((m, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card className={classes.metricCard} elevation={0}><CardContent style={{ backgroundColor: m.color, borderRadius: 12 }}>
              <Typography className={classes.metricLabel}>{m.label}</Typography>
              <Typography className={classes.metricValue}>{loading ? "—" : m.value}</Typography>
              <Typography className={classes.metricSub}>{m.sub}</Typography>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Typography className={classes.sectionTitle}>Desempenho por Atendente</Typography>
      <Card elevation={0} style={{ borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell><b>Atendente</b></TableCell>
              <TableCell align="center"><b>Tickets</b></TableCell>
              <TableCell align="center"><b>Participação</b></TableCell>
              <TableCell align="center"><b>Avaliação</b></TableCell>
              <TableCell align="center"><b>Média</b></TableCell>
              <TableCell align="center"><b>Avaliações</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={6} align="center"><CircularProgress size={24} /></TableCell></TableRow>
              : atendentes.length === 0 ? <TableRow><TableCell colSpan={6} align="center" style={{ color: "#a0aec0", padding: 24 }}>Nenhum dado no período</TableCell></TableRow>
              : atendentes.map((a, i) => (
                <TableRow key={i} hover>
                  <TableCell><Box display="flex" alignItems="center" style={{ gap: 10 }}><Avatar style={{ width: 32, height: 32, fontSize: 13, backgroundColor: "#6366f1" }}>{(a.nome || "?")[0]?.toUpperCase()}</Avatar>{a.nome || "—"}</Box></TableCell>
                  <TableCell align="center"><Chip label={a.quantidade || 0} size="small" style={{ backgroundColor: "#6366f1", color: "#fff", fontWeight: 700 }} /></TableCell>
                  <TableCell align="center">{totalTickets > 0 ? Math.round((Number(a.quantidade || 0) / totalTickets) * 100) : 0}%</TableCell>
                  <TableCell align="center">
                    <Tooltip title={`${Number(a.mediaAvaliacao || 0).toFixed(1)} / 5`}>
                      <Box display="flex" justifyContent="center">{renderStars(a.mediaAvaliacao)}</Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={Number(a.mediaAvaliacao || 0).toFixed(1)} size="small"
                      style={{ backgroundColor: Number(a.mediaAvaliacao) >= 4 ? "#d1fae5" : Number(a.mediaAvaliacao) >= 2 ? "#fef9c3" : Number(a.totalAvaliacoes) === 0 ? "#f3f4f6" : "#fee2e2", color: "#1a202c", fontWeight: 700 }} />
                  </TableCell>
                  <TableCell align="center" style={{ color: "#718096" }}>{a.totalAvaliacoes || 0}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
