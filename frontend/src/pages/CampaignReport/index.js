import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box, Button, Chip, CircularProgress, Grid, IconButton, InputAdornment,
  LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow,
  TextField, Tooltip, Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import GroupIcon from "@material-ui/icons/Group";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";
import usePlans from "../../hooks/usePlans";

const useStyles = makeStyles(() => ({
  root: { padding: 24, backgroundColor: "#f8fafc", minHeight: "100vh" },
  card: { borderRadius: 12, border: "1px solid #e2e8f0", padding: "18px 22px", backgroundColor: "#fff" },
  tableHead: { backgroundColor: "#f8fafc" },
}));

const STATUS_CONFIG = {
  INATIVA:      { label: "Inativa",      color: "#718096", bg: "#f7fafc" },
  PROGRAMADA:   { label: "Programada",   color: "#1976d2", bg: "#e3f2fd" },
  EM_ANDAMENTO: { label: "Em Andamento", color: "#d97706", bg: "#fffbeb" },
  CANCELADA:    { label: "Cancelada",    color: "#e53e3e", bg: "#fff5f5" },
  FINALIZADA:   { label: "Finalizada",   color: "#38a169", bg: "#f0fff4" },
};

const fmtDate = (d) => {
  if (!d) return "—";
  try { return format(typeof d === "string" ? parseISO(d) : new Date(d), "dd/MM/yy HH:mm", { locale: ptBR }); }
  catch { return String(d); }
};

export default function CampaignReport() {
  const classes = useStyles();
  const history = useHistory();
  const { campaignId } = useParams();
  const { user, socket } = useContext(AuthContext);
  const { getPlanCompany } = usePlans();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const mounted = useRef(true);

  useEffect(() => {
    getPlanCompany(undefined, user.companyId).then(p => {
      if (!p.plan.useCampaigns) { toast.error("Sem permissão."); history.push("/"); }
    });
    loadCampaign();
    return () => { mounted.current = false; };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handler = (data) => {
      if (data.record?.id === +campaignId) {
        setCampaign(data.record);
        if (data.record.status === "FINALIZADA") setTimeout(loadCampaign, 3000);
      }
    };
    socket.on(`company-${user.companyId}-campaign`, handler);
    return () => socket.off(`company-${user.companyId}-campaign`, handler);
    // eslint-disable-next-line
  }, [campaignId]);

  const loadCampaign = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/campaigns/${campaignId}`);
      if (mounted.current) setCampaign(data);
    } catch { toast.error("Erro ao carregar relatório"); }
    if (mounted.current) setLoading(false);
  };

  if (loading && !campaign) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress />
    </Box>
  );
  if (!campaign) return null;

  const shipping = campaign.shipping || [];
  const delivered = shipping.filter(s => s.deliveredAt);
  const pending = shipping.filter(s => !s.deliveredAt);
  const total = shipping.length;
  const pct = total > 0 ? Math.round((delivered.length / total) * 100) : 0;
  const statusCfg = STATUS_CONFIG[campaign.status] || STATUS_CONFIG.INATIVA;

  const filteredShipping = shipping.filter(s => {
    const num = (s.number || "").toLowerCase();
    const matchSearch = !search || num.includes(search.toLowerCase());
    if (filter === "delivered") return matchSearch && s.deliveredAt;
    if (filter === "pending") return matchSearch && !s.deliveredAt;
    return matchSearch;
  });

  return (
    <Box className={classes.root}>
      {/* Header */}
      <Box display="flex" alignItems="center" style={{ gap: 12, marginBottom: 24 }}>
        <Tooltip title="Voltar para Campanhas">
          <IconButton onClick={() => history.push("/campanhas")}
            style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Box flex={1}>
          <Typography style={{ fontSize: 22, fontWeight: 800, color: "#1a202c" }}>
            {campaign.name}
          </Typography>
          <Box display="flex" alignItems="center" style={{ gap: 8, marginTop: 4 }}>
            <Chip label={statusCfg.label} size="small"
              style={{ backgroundColor: statusCfg.bg, color: statusCfg.color, fontWeight: 700 }} />
            {campaign.whatsapp && (
              <Chip icon={<WhatsAppIcon style={{ fontSize: 13 }} />}
                label={campaign.whatsapp.name} size="small"
                style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", fontWeight: 600, fontSize: 11 }} />
            )}
          </Box>
        </Box>
        <Button variant="outlined" size="small" startIcon={loading ? <CircularProgress size={14} /> : <RefreshIcon />}
          onClick={loadCampaign} disabled={loading}>
          Atualizar
        </Button>
      </Box>

      {/* Barra de progresso */}
      <Paper className={classes.card} style={{ marginBottom: 16 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography style={{ fontWeight: 700, fontSize: 15, color: "#2d3748" }}>
            Progresso do Disparo
          </Typography>
          <Typography style={{ fontWeight: 800, fontSize: 24, color: pct === 100 ? "#38a169" : "#4299e1" }}>
            {pct}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={pct}
          style={{ height: 10, borderRadius: 5, backgroundColor: "#e2e8f0" }} />
        <Typography style={{ fontSize: 12, color: "#718096", marginTop: 6 }}>
          {delivered.length} enviados de {total} contatos no total
        </Typography>
      </Paper>

      {/* Cards de resumo */}
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        {[
          { label: "Total Contatos", value: total, icon: <GroupIcon />, color: "#4299e1", bg: "#ebf8ff" },
          { label: "Enviados",       value: delivered.length, icon: <CheckCircleIcon />, color: "#38a169", bg: "#f0fff4" },
          { label: "Pendentes",      value: pending.length, icon: <HourglassEmptyIcon />, color: "#d97706", bg: "#fffbeb" },
          { label: "Agendamento",    value: fmtDate(campaign.scheduledAt), icon: <ScheduleIcon />, color: "#718096", bg: "#f7fafc", isText: true },
          { label: "Conclusão",      value: fmtDate(campaign.completedAt), icon: <EventAvailableIcon />, color: "#38a169", bg: "#f0fff4", isText: true },
          { label: "Conexão",        value: campaign.whatsapp?.name || "—", icon: <WhatsAppIcon />, color: "#128c7e", bg: "#e8f5e9", isText: true },
        ].map((m, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper className={classes.card} elevation={0}>
              <Box display="flex" alignItems="center" style={{ gap: 6, marginBottom: 6 }}>
                {m.icon && React.cloneElement(m.icon, { style: { fontSize: 16, color: m.color } })}
                <Typography style={{ fontSize: 12, color: "#718096", fontWeight: 600 }}>{m.label}</Typography>
              </Box>
              <Typography style={{ fontSize: m.isText ? 15 : 30, fontWeight: 700, color: m.color }}>
                {m.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabela detalhada */}
      <Paper elevation={0} style={{ borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <Box style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff" }}>
          <Typography style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
            Detalhamento por Contato
          </Typography>
          <Box display="flex" style={{ gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <TextField size="small" variant="outlined" placeholder="Buscar número..."
              value={search} onChange={e => setSearch(e.target.value)} style={{ minWidth: 200 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon style={{ fontSize: 16 }} /></InputAdornment> }}
            />
            {[
              { key: "all",       label: `Todos (${total})`,              color: "#4299e1" },
              { key: "delivered", label: `Enviados (${delivered.length})`, color: "#38a169" },
              { key: "pending",   label: `Pendentes (${pending.length})`,  color: "#d97706" },
            ].map(f => (
              <Chip key={f.key} label={f.label} clickable size="small" onClick={() => setFilter(f.key)}
                style={{
                  fontWeight: filter === f.key ? 700 : 400,
                  backgroundColor: filter === f.key ? f.color : "#f7fafc",
                  color: filter === f.key ? "#fff" : "#718096",
                  border: `1px solid ${filter === f.key ? f.color : "#e2e8f0"}`
                }} />
            ))}
          </Box>
        </Box>

        <Table size="small">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell><b>#</b></TableCell>
              <TableCell><b>Número</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Enviado em</b></TableCell>
              <TableCell><b>Confirmação</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredShipping.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" style={{ color: "#a0aec0", padding: 32 }}>
                  Nenhum contato encontrado
                </TableCell>
              </TableRow>
            ) : filteredShipping.map((s, i) => (
              <TableRow key={i} hover>
                <TableCell style={{ color: "#a0aec0", fontSize: 12 }}>{i + 1}</TableCell>
                <TableCell style={{ fontFamily: "monospace", fontSize: 13, color: "#2d3748" }}>
                  {s.number || "—"}
                </TableCell>
                <TableCell>
                  {s.deliveredAt ? (
                    <Chip icon={<CheckCircleIcon style={{ fontSize: 13 }} />}
                      label="Enviado" size="small"
                      style={{ backgroundColor: "#f0fff4", color: "#38a169", fontWeight: 600, fontSize: 11 }} />
                  ) : (
                    <Chip icon={<HourglassEmptyIcon style={{ fontSize: 13 }} />}
                      label="Pendente" size="small"
                      style={{ backgroundColor: "#fffbeb", color: "#d97706", fontWeight: 600, fontSize: 11 }} />
                  )}
                </TableCell>
                <TableCell style={{ fontSize: 12, color: "#718096" }}>
                  {fmtDate(s.deliveredAt)}
                </TableCell>
                <TableCell>
                  {s.confirmationRequestedAt
                    ? <Chip label="Confirmado" size="small"
                        style={{ backgroundColor: "#ebf8ff", color: "#3182ce", fontSize: 10 }} />
                    : <span style={{ color: "#a0aec0", fontSize: 12 }}>—</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
