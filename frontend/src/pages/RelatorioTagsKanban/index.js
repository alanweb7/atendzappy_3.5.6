import React, { useState, useEffect, useContext } from "react";
import {
  Box, Card, CardContent, Grid, Typography, CircularProgress, Chip,
  Button, Table, TableHead, TableRow, TableCell, TableBody,
  Dialog, DialogTitle, DialogContent, IconButton, Avatar, Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloseIcon from "@material-ui/icons/Close";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import PersonIcon from "@material-ui/icons/Person";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles(() => ({
  root: { padding: "24px", backgroundColor: "#f8fafc", minHeight: "100vh" },
  title: { fontSize: 24, fontWeight: 700, color: "#1a202c" },
  subtitle: { fontSize: 14, color: "#718096", marginTop: 4 },
  filterBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap", backgroundColor: "#fff", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0" },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#2d3748", margin: "24px 0 12px", borderLeft: "4px solid #9f7aea", paddingLeft: 12 },
  metricCard: { borderRadius: 12, border: "1px solid #e2e8f0" },
  metricValue: { fontSize: 32, fontWeight: 700, color: "#1a202c", lineHeight: 1 },
  metricLabel: { fontSize: 13, color: "#718096", fontWeight: 500, marginBottom: 4 },
  metricSub: { fontSize: 12, color: "#a0aec0", marginTop: 6 },
  tableHead: { backgroundColor: "var(--sidebar-color, #1e293b)", "& th": { color: "#cbd5e1", fontWeight: 600, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "none", padding: "14px 16px" } },
  tableBody: { "& td": { padding: "12px 16px", fontSize: "0.875rem", color: "#334155", borderBottom: "1px solid #f1f5f9" }, "& tr:hover": { backgroundColor: "#f8fafc" } },
  clickableRow: { cursor: "pointer", "&:hover": { backgroundColor: "#faf5ff !important" } },
  ticketRow: { cursor: "pointer", "&:hover td": { backgroundColor: "#f5f3ff" } },
}));

const fmt = (d) => format(new Date(d), "yyyy-MM-dd");
const fmtDate = (d) => { try { return format(new Date(d), "dd/MM/yy HH:mm", { locale: ptBR }); } catch { return "—"; } };

const STATUS_LABELS = { open: "Aberto", pending: "Pendente", closed: "Fechado", group: "Grupo" };
const STATUS_COLORS = { open: "#48bb78", pending: "#ed8936", closed: "#718096", group: "#667eea" };

export default function RelatorioTagsKanban() {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [stages, setStages] = useState([]);
  const [companyName, setCompanyName] = useState("");

  // Modal de tickets da etapa
  const [selectedStage, setSelectedStage] = useState(null);
  const [stageTickets, setStageTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  useEffect(() => {
    api.get(`/companies/${user?.companyId}`).then(({ data }) => setCompanyName(data?.name || "")).catch(() => {});
    loadData();
  }, [user?.companyId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tags", { params: { kanban: 1, pageNumber: 1 } });
      const tagList = data?.tags || data || [];
      setStages(tagList.map(tag => ({ ...tag, ticketsCount: tag.ticketTags?.length || 0 })));
    } catch { setStages([]); }
    setLoading(false);
  };

  const handleStageClick = async (stage) => {
    setSelectedStage(stage);
    setStageTickets([]);
    setLoadingTickets(true);
    try {
      // Os ticketTags já vêm no objeto da etapa — usa os IDs direto
      const ids = (stage.ticketTags || [])
        .map(tt => tt.ticketId)
        .filter(Boolean);

      if (ids.length === 0) {
        setStageTickets([]);
        setLoadingTickets(false);
        return;
      }

      // Busca cada ticket individualmente com dados completos
      const results = await Promise.all(
        ids.slice(0, 100).map(id =>
          api.get(`/tickets/${id}`).then(r => r.data).catch(() => null)
        )
      );
      setStageTickets(results.filter(Boolean));
    } catch {
      setStageTickets([]);
    }
    setLoadingTickets(false);
  };

  const handleOpenTicket = (ticket) => {
    setSelectedStage(null);
    history.push(`/atendimentos/${ticket.id}`);
  };

  const totalTickets = stages.reduce((s, t) => s + (t.ticketsCount || 0), 0);

  const handleExport = () => {
    const now = format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR });
    const rows = stages.map(s => `<tr><td><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${s.color || '#9f7aea'};margin-right:8px"></span>${s.name}</td><td style="text-align:center">${s.ticketsCount || 0}</td><td style="text-align:center">${totalTickets > 0 ? Math.round(((s.ticketsCount || 0) / totalTickets) * 100) : 0}%</td></tr>`).join("");
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>Relatório Kanban</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#f8fafc;padding:40px;color:#1a202c}table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden}th{background:#f5f3ff;padding:12px 16px;text-align:left;font-size:13px;color:#9f7aea;font-weight:700}td{padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px}.footer{margin-top:32px;font-size:12px;color:#a0aec0}</style></head><body>
<h1 style="margin-bottom:24px">📋 Relatório Kanban</h1>
<table><thead><tr><th>Etapa</th><th>Tickets</th><th>Participação</th></tr></thead><tbody>${rows}</tbody></table>
<div class="footer">Gerado em ${now} · ${companyName}</div></body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `relatorio-kanban-${fmt(new Date())}.html`; a.click();
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography className={classes.title}>Relatório Kanban</Typography>
          <Typography className={classes.subtitle}>Clique em uma etapa para ver os tickets vinculados</Typography>
        </Box>
        <Button variant="contained" startIcon={<GetAppIcon />} onClick={handleExport}
          disabled={loading || !stages.length}
          style={{ backgroundColor: "#9f7aea", color: "#fff", borderRadius: 8, textTransform: "none" }}>
          Exportar HTML
        </Button>
      </Box>

      <Box className={classes.filterBar}>
        <Typography style={{ fontSize: 13, color: "#718096" }}>Estado atual de todas as etapas Kanban · clique para ver detalhes</Typography>
        {loading && <CircularProgress size={20} />}
      </Box>

      <Grid container spacing={2} style={{ marginBottom: 24 }}>
        {[
          { label: "Etapas Kanban", value: stages.length, color: "#f5f3ff", sub: "Estágios do funil" },
          { label: "Total de Tickets", value: totalTickets, color: "#faf5ff", sub: "Distribuídos nas etapas" }
        ].map((m, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card className={classes.metricCard} elevation={0}>
              <CardContent style={{ backgroundColor: m.color, borderRadius: 12 }}>
                <Typography className={classes.metricLabel}>{m.label}</Typography>
                <Typography className={classes.metricValue}>{loading ? "—" : m.value}</Typography>
                <Typography className={classes.metricSub}>{m.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography className={classes.sectionTitle}>Funil Kanban</Typography>
      <Card elevation={0} style={{ borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Etapa</TableCell>
              <TableCell align="center">Tickets</TableCell>
              <TableCell>Distribuição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {loading
              ? <TableRow><TableCell colSpan={3} align="center"><CircularProgress size={24} /></TableCell></TableRow>
              : stages.length === 0
              ? <TableRow><TableCell colSpan={3} align="center" style={{ color: "#a0aec0", padding: 24 }}>Nenhuma etapa Kanban encontrada</TableCell></TableRow>
              : stages.map((s, i) => {
                const pct = totalTickets > 0 ? Math.round(((s.ticketsCount || 0) / totalTickets) * 100) : 0;
                return (
                  <TableRow key={i} hover className={classes.clickableRow} onClick={() => handleStageClick(s)}>
                    <TableCell>
                      <Box display="flex" alignItems="center" style={{ gap: 8 }}>
                        <Box style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: s.color || "#9f7aea", flexShrink: 0 }} />
                        <Typography style={{ fontWeight: 600 }}>{s.name}</Typography>
                        <OpenInNewIcon style={{ fontSize: 14, color: "#9f7aea", opacity: 0.6 }} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={s.ticketsCount || 0} size="small"
                        style={{ backgroundColor: s.color || "#9f7aea", color: "#fff", fontWeight: 700, cursor: "pointer" }} />
                    </TableCell>
                    <TableCell style={{ minWidth: 160 }}>
                      <Box display="flex" alignItems="center" style={{ gap: 8 }}>
                        <Box style={{ flex: 1, height: 8, backgroundColor: "#e9d8fd", borderRadius: 4, overflow: "hidden" }}>
                          <Box style={{ width: `${pct}%`, height: "100%", backgroundColor: s.color || "#9f7aea", borderRadius: 4 }} />
                        </Box>
                        <Typography style={{ fontSize: 12, color: "#718096", minWidth: 30 }}>{pct}%</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>

      {/* Modal: Tickets da etapa */}
      <Dialog open={Boolean(selectedStage)} onClose={() => setSelectedStage(null)} maxWidth="md" fullWidth
        PaperProps={{ style: { borderRadius: 14 } }}>
        <DialogTitle disableTypography style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <Box display="flex" alignItems="center" style={{ gap: 10 }}>
            <Box style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: selectedStage?.color || "#9f7aea" }} />
            <Typography style={{ fontWeight: 700, fontSize: 17 }}>{selectedStage?.name}</Typography>
            <Chip label={`${stageTickets.length} ticket(s)`} size="small"
              style={{ backgroundColor: "#ede9fe", color: "#7c3aed", fontWeight: 600 }} />
          </Box>
          <IconButton size="small" onClick={() => setSelectedStage(null)}><CloseIcon fontSize="small" /></IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: 0 }}>
          {loadingTickets ? (
            <Box display="flex" justifyContent="center" py={5}><CircularProgress /></Box>
          ) : stageTickets.length === 0 ? (
            <Box textAlign="center" py={5} color="#9ca3af">
              <PersonIcon style={{ fontSize: 48, opacity: 0.3 }} />
              <Typography style={{ marginTop: 8 }}>Nenhum ticket encontrado nesta etapa</Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "var(--sidebar-color, #1e293b)" }}>
                  {["Contato", "Última mensagem", "Status", "Atendente", "Ação"].map(h => (
                    <TableCell key={h} style={{ color: "#cbd5e1", fontWeight: 600, fontSize: "0.78rem", textTransform: "uppercase", padding: "12px 16px" }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stageTickets.map((ticket) => (
                  <TableRow key={ticket.id} hover className={classes.ticketRow}
                    onClick={() => handleOpenTicket(ticket)}
                    style={{ cursor: "pointer" }}>
                    <TableCell style={{ padding: "10px 16px" }}>
                      <Box display="flex" alignItems="center" style={{ gap: 10 }}>
                        <Avatar style={{ width: 34, height: 34, fontSize: 14, backgroundColor: selectedStage?.color || "#9f7aea" }}>
                          {(ticket.contact?.name || ticket.contact?.number || "?")[0].toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography style={{ fontWeight: 600, fontSize: 13 }}>{ticket.contact?.name || "Sem nome"}</Typography>
                          <Typography style={{ fontSize: 11, color: "#9ca3af" }}>{ticket.contact?.number || ""}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell style={{ padding: "10px 16px", maxWidth: 200 }}>
                      <Typography style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 180 }}>
                        {ticket.lastMessage || "—"}
                      </Typography>
                      <Typography style={{ fontSize: 10, color: "#9ca3af" }}>{ticket.updatedAt ? fmtDate(ticket.updatedAt) : "—"}</Typography>
                    </TableCell>
                    <TableCell style={{ padding: "10px 16px" }}>
                      <Chip label={STATUS_LABELS[ticket.status] || ticket.status} size="small"
                        style={{ backgroundColor: STATUS_COLORS[ticket.status] || "#718096", color: "#fff", fontSize: 11, fontWeight: 600 }} />
                    </TableCell>
                    <TableCell style={{ padding: "10px 16px" }}>
                      <Typography style={{ fontSize: 12, color: "#64748b" }}>{ticket.user?.name || "—"}</Typography>
                    </TableCell>
                    <TableCell style={{ padding: "10px 16px" }}>
                      <Tooltip title="Abrir conversa">
                        <Button size="small" variant="outlined"
                          style={{ textTransform: "none", fontSize: 11, color: "#7c3aed", borderColor: "#7c3aed", padding: "2px 10px" }}
                          onClick={e => { e.stopPropagation(); handleOpenTicket(ticket); }}>
                          Abrir
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
