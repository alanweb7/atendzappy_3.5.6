import React, { useState, useEffect, useContext } from "react";
import { Box, Card, CardContent, Grid, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, Chip, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles(() => ({
  root: { padding: "24px", backgroundColor: "#f8fafc", minHeight: "100vh" },
  title: { fontSize: 24, fontWeight: 700, color: "#1a202c" },
  subtitle: { fontSize: 14, color: "#718096", marginTop: 4 },
  filterBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap", backgroundColor: "#fff", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0" },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#2d3748", margin: "24px 0 12px", borderLeft: "4px solid #38a169", paddingLeft: 12 },
  metricCard: { borderRadius: 12, border: "1px solid #e2e8f0" },
  metricValue: { fontSize: 32, fontWeight: 700, color: "#1a202c", lineHeight: 1 },
  metricLabel: { fontSize: 13, color: "#718096", fontWeight: 500, marginBottom: 4 },
  metricSub: { fontSize: 12, color: "#a0aec0", marginTop: 6 },
  tableHead: { backgroundColor: "#f0fff4" },
}));

const PERIODS = [
  { label: "Hoje", value: 0 },
  { label: "Últimos 7 dias", value: 7 },
  { label: "Últimos 30 dias", value: 30 },
  { label: "Últimos 60 dias", value: 60 },
  { label: "Personalizado", value: "custom" },
];

const fmt = (d) => format(new Date(d), "yyyy-MM-dd");
const fmtBRL = (v) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const STATUS_COLORS = { paid: "#38a169", pending: "#d69e2e", overdue: "#e53e3e", cancelled: "#718096" };
const STATUS_LABELS = { paid: "Pago", pending: "Pendente", overdue: "Vencido", cancelled: "Cancelado" };

export default function RelatorioFaturas() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [period, setPeriod] = useState(30);
  const [customStart, setCustomStart] = useState(fmt(subDays(new Date(), 30)));
  const [customEnd, setCustomEnd] = useState(fmt(new Date()));
  const [loading, setLoading] = useState(false);
  const [faturas, setFaturas] = useState([]);
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
      const { data } = await api.get("/faturas", { params: { dateStart: start, dateEnd: end, pageNumber: 1 } });
      setFaturas(data?.faturas || data?.records || data || []);
    } catch { setFaturas([]); }
    setLoading(false);
  };

  useEffect(() => { if (period !== "custom") loadData(); }, [period]);

  const total = faturas.reduce((s, f) => s + Number(f.value || f.total || 0), 0);
  const totalPaid = faturas.filter(f => f.status === "paid" || f.status === "pago").reduce((s, f) => s + Number(f.value || f.total || 0), 0);
  const totalPending = faturas.filter(f => f.status === "pending" || f.status === "pendente").reduce((s, f) => s + Number(f.value || f.total || 0), 0);
  const getPeriodLabel = () => { const o = PERIODS.find(p => p.value === period); return o?.value === "custom" ? `${customStart} a ${customEnd}` : o?.label || ""; };

  const handleExport = () => {
    const now = format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR });
    const rows = faturas.map(f => {
      const status = f.status || "pending";
      return `<tr><td>${f.detail || f.description || f.id || "—"}</td><td style="text-align:right">${fmtBRL(f.value || f.total)}</td><td style="text-align:center"><span style="background:${STATUS_COLORS[status] || '#718096'};color:#fff;padding:2px 10px;border-radius:12px;font-size:12px">${STATUS_LABELS[status] || status}</span></td><td style="text-align:center">${f.dueDate ? format(new Date(f.dueDate), "dd/MM/yyyy") : "—"}</td></tr>`;
    }).join("");
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Relatório de Faturas</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#f8fafc;padding:40px;color:#1a202c}.header{margin-bottom:32px;border-bottom:3px solid #38a169;padding-bottom:16px}.header h1{font-size:28px;font-weight:800}.badge{display:inline-block;background:#38a169;color:#fff;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;margin-top:8px}.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:24px 0}.card{background:#f0fff4;border-radius:12px;padding:20px;border:1px solid #9ae6b4}.card-val{font-size:28px;font-weight:800}.card-lbl{font-size:13px;color:#718096;margin-bottom:8px}table{width:100%;border-collapse:collapse;margin-top:16px;background:#fff;border-radius:12px;overflow:hidden}th{background:#f0fff4;padding:12px 16px;text-align:left;font-size:13px;color:#38a169;font-weight:700}td{padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px}.footer{margin-top:40px;border-top:1px solid #e2e8f0;padding-top:16px;font-size:12px;color:#a0aec0}@media(max-width:600px){.summary{grid-template-columns:1fr}}</style></head><body>
<div class="header"><h1>💰 Relatório de Faturas</h1><p>Resumo financeiro por período</p><span class="badge">📅 ${getPeriodLabel()}</span></div>
<div class="summary"><div class="card"><div class="card-lbl">Total Geral</div><div class="card-val">${fmtBRL(total)}</div></div><div class="card" style="background:#f0fff4"><div class="card-lbl">Recebido</div><div class="card-val" style="color:#38a169">${fmtBRL(totalPaid)}</div></div><div class="card" style="background:#fffff0"><div class="card-lbl">Pendente</div><div class="card-val" style="color:#d69e2e">${fmtBRL(totalPending)}</div></div></div>
<table><thead><tr><th>Descrição</th><th style="text-align:right">Valor</th><th style="text-align:center">Status</th><th style="text-align:center">Vencimento</th></tr></thead><tbody>${rows || '<tr><td colspan="4" style="text-align:center;color:#a0aec0;padding:24px">Nenhuma fatura no período</td></tr>'}</tbody></table>
<div class="footer">Gerado em ${now} · ${user?.name || ""} · ${companyName}</div></body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `relatorio-faturas-${fmt(new Date())}.html`; a.click();
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography className={classes.title}>Relatório de Faturas</Typography>
          <Typography className={classes.subtitle}>Resumo financeiro por período</Typography>
        </Box>
        <Button variant="contained" startIcon={<GetAppIcon />} onClick={handleExport} disabled={loading} style={{ backgroundColor: "#38a169", color: "#fff", borderRadius: 8 }}>Exportar HTML</Button>
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
        {[{ label: "Total de Faturas", value: faturas.length, color: "#f0fff4", sub: "No período" }, { label: "Total Geral", value: fmtBRL(total), color: "#f0fff4", sub: "Soma de todas" }, { label: "Recebido", value: fmtBRL(totalPaid), color: "#f0fff4", sub: "Faturas pagas" }, { label: "Pendente", value: fmtBRL(totalPending), color: "#fffff0", sub: "Aguardando pagamento" }].map((m, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card className={classes.metricCard} elevation={0}><CardContent style={{ backgroundColor: m.color, borderRadius: 12 }}>
              <Typography className={classes.metricLabel}>{m.label}</Typography>
              <Typography className={classes.metricValue} style={{ fontSize: 22 }}>{loading ? "—" : m.value}</Typography>
              <Typography className={classes.metricSub}>{m.sub}</Typography>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Typography className={classes.sectionTitle}>Lista de Faturas</Typography>
      <Card elevation={0} style={{ borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell><b>Descrição</b></TableCell>
              <TableCell align="right"><b>Valor</b></TableCell>
              <TableCell align="center"><b>Status</b></TableCell>
              <TableCell align="center"><b>Vencimento</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={4} align="center"><CircularProgress size={24} /></TableCell></TableRow>
              : faturas.length === 0 ? <TableRow><TableCell colSpan={4} align="center" style={{ color: "#a0aec0", padding: 24 }}>Nenhuma fatura no período</TableCell></TableRow>
              : faturas.slice(0, 50).map((f, i) => {
                const status = f.status || "pending";
                return (
                  <TableRow key={i} hover>
                    <TableCell>{f.detail || f.description || f.id || "—"}</TableCell>
                    <TableCell align="right">{fmtBRL(f.value || f.total)}</TableCell>
                    <TableCell align="center"><Chip label={STATUS_LABELS[status] || status} size="small" style={{ backgroundColor: STATUS_COLORS[status] || "#718096", color: "#fff", fontWeight: 600 }} /></TableCell>
                    <TableCell align="center">{f.dueDate ? format(new Date(f.dueDate), "dd/MM/yyyy") : "—"}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
