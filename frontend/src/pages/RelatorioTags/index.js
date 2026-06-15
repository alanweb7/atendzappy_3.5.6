import React, { useState, useEffect, useContext } from "react";
import { Box, Card, CardContent, Grid, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, Chip, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import LabelIcon from "@material-ui/icons/Label";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles(() => ({
  root: { padding: "24px", backgroundColor: "#f8fafc", minHeight: "100vh" },
  title: { fontSize: 24, fontWeight: 700, color: "#1a202c" },
  subtitle: { fontSize: 14, color: "#718096", marginTop: 4 },
  filterBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap", backgroundColor: "#fff", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0" },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#2d3748", margin: "24px 0 12px", borderLeft: "4px solid #ed8936", paddingLeft: 12 },
  metricCard: { borderRadius: 12, border: "1px solid #e2e8f0" },
  metricValue: { fontSize: 32, fontWeight: 700, color: "#1a202c", lineHeight: 1 },
  metricLabel: { fontSize: 13, color: "#718096", fontWeight: 500, marginBottom: 4 },
  metricSub: { fontSize: 12, color: "#a0aec0", marginTop: 6 },
  tableHead: { backgroundColor: "#fff8f0" },
}));

const PERIODS = [
  { label: "Todas", value: -1 },
  { label: "Últimos 7 dias", value: 7 },
  { label: "Últimos 30 dias", value: 30 },
  { label: "Últimos 60 dias", value: 60 },
];

const fmt = (d) => format(new Date(d), "yyyy-MM-dd");

export default function RelatorioTags() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [period, setPeriod] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    api.get(`/companies/${user?.companyId}`).then(({ data }) => setCompanyName(data?.name || "")).catch(() => {});
  }, [user?.companyId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tags", { params: { kanban: 0, pageNumber: 1 } });
      setTags(data?.tags || data || []);
    } catch { setTags([]); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [period]);

  const totalContacts = tags.reduce((s, t) => s + (t.contacts?.length || 0), 0);
  const getPeriodLabel = () => PERIODS.find(p => p.value === period)?.label || "Todas";

  const handleExport = () => {
    const now = format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR });
    const rows = tags.map(t => `<tr><td><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${t.color || '#718096'};margin-right:8px"></span>${t.name}</td><td style="text-align:center">${t.contacts?.length || 0}</td></tr>`).join("");
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Relatório de Tags</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#f8fafc;padding:40px;color:#1a202c}.header{margin-bottom:32px;border-bottom:3px solid #ed8936;padding-bottom:16px}.header h1{font-size:28px;font-weight:800}.badge{display:inline-block;background:#ed8936;color:#fff;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;margin-top:8px}.summary{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:24px 0}.card{background:#fff8f0;border-radius:12px;padding:20px;border:1px solid #fbd38d}.card-val{font-size:36px;font-weight:800}.card-lbl{font-size:13px;color:#718096;margin-bottom:8px}table{width:100%;border-collapse:collapse;margin-top:16px;background:#fff;border-radius:12px;overflow:hidden}th{background:#fff8f0;padding:12px 16px;text-align:left;font-size:13px;color:#ed8936;font-weight:700}td{padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px}.footer{margin-top:40px;border-top:1px solid #e2e8f0;padding-top:16px;font-size:12px;color:#a0aec0}@media(max-width:600px){.summary{grid-template-columns:1fr}}</style></head><body>
<div class="header"><h1>🏷️ Relatório de Tags</h1><p>Distribuição de contatos por etiqueta</p><span class="badge">📅 ${getPeriodLabel()}</span></div>
<div class="summary"><div class="card"><div class="card-lbl">Total de Tags</div><div class="card-val">${tags.length}</div></div><div class="card"><div class="card-lbl">Total de Contatos Tagados</div><div class="card-val">${totalContacts}</div></div></div>
<table><thead><tr><th>Tag</th><th style="text-align:center">Contatos</th></tr></thead><tbody>${rows}</tbody></table>
<div class="footer">Gerado em ${now} · ${user?.name || ""} · ${companyName}</div></body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `relatorio-tags-${fmt(new Date())}.html`; a.click();
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography className={classes.title}>Relatório de Tags</Typography>
          <Typography className={classes.subtitle}>Distribuição de contatos por etiqueta</Typography>
        </Box>
        <Button variant="contained" startIcon={<GetAppIcon />} onClick={handleExport} disabled={loading || !tags.length} style={{ backgroundColor: "#ed8936", color: "#fff", borderRadius: 8 }}>Exportar HTML</Button>
      </Box>

      <Box className={classes.filterBar}>
        <FormControl size="small" variant="outlined" style={{ minWidth: 180 }}>
          <InputLabel>Período</InputLabel>
          <Select value={period} onChange={e => setPeriod(e.target.value)} label="Período">
            {PERIODS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
          </Select>
        </FormControl>
        {loading && <CircularProgress size={20} />}
      </Box>

      <Grid container spacing={2} style={{ marginBottom: 24 }}>
        {[{ label: "Total de Tags", value: tags.length, color: "#fff8f0", sub: "Etiquetas cadastradas" }, { label: "Contatos Tagados", value: totalContacts, color: "#fffaf0", sub: "Contatos com ao menos 1 tag" }].map((m, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card className={classes.metricCard} elevation={0}><CardContent style={{ backgroundColor: m.color, borderRadius: 12 }}>
              <Typography className={classes.metricLabel}>{m.label}</Typography>
              <Typography className={classes.metricValue}>{loading ? "—" : m.value}</Typography>
              <Typography className={classes.metricSub}>{m.sub}</Typography>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Typography className={classes.sectionTitle}>Tags e Contatos</Typography>
      <Card elevation={0} style={{ borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell><b>Tag</b></TableCell>
              <TableCell align="center"><b>Contatos</b></TableCell>
              <TableCell align="center"><b>Participação</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={3} align="center"><CircularProgress size={24} /></TableCell></TableRow>
              : tags.length === 0 ? <TableRow><TableCell colSpan={3} align="center" style={{ color: "#a0aec0", padding: 24 }}>Nenhuma tag encontrada</TableCell></TableRow>
              : tags.map((t, i) => (
                <TableRow key={i} hover>
                  <TableCell><Box display="flex" alignItems="center" style={{ gap: 8 }}><Box style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: t.color || "#718096", flexShrink: 0 }} />{t.name}</Box></TableCell>
                  <TableCell align="center"><Chip label={t.contacts?.length || 0} size="small" style={{ backgroundColor: t.color || "#718096", color: "#fff", fontWeight: 700 }} /></TableCell>
                  <TableCell align="center">{totalContacts > 0 ? Math.round(((t.contacts?.length || 0) / totalContacts) * 100) : 0}%</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
