import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Box, Typography, IconButton, Chip, CircularProgress,
  Select, MenuItem, FormControl, InputLabel, Grid, Tooltip,
  Card, Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TodayIcon from "@material-ui/icons/Today";
import AlarmIcon from "@material-ui/icons/Alarm";
import EventIcon from "@material-ui/icons/Event";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import ForumIcon from "@material-ui/icons/Forum";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc",
    flexWrap: "wrap",
    gap: 8,
  },
  monthTitle: {
    fontWeight: 700,
    fontSize: 18,
    color: "#1a202c",
    textTransform: "capitalize",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  calendarGrid: {
    padding: "0 12px 12px",
  },
  weekHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: 4,
    marginTop: 12,
  },
  weekDay: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: 700,
    color: "#718096",
    padding: "4px 0",
    textTransform: "uppercase",
  },
  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 2,
  },
  dayCell: {
    minHeight: 72,
    borderRadius: 8,
    padding: "4px 6px",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "all 0.15s",
    "&:hover": {
      backgroundColor: "#f0f4ff",
      border: "1px solid #c3dafe",
    },
  },
  dayCellSelected: {
    backgroundColor: "#ebf4ff",
    border: "1px solid #4299e1 !important",
  },
  dayCellToday: {
    backgroundColor: "#e6fffa",
    border: "1px solid #38b2ac !important",
  },
  dayCellOtherMonth: {
    opacity: 0.35,
  },
  dayNumber: {
    fontSize: 13,
    fontWeight: 600,
    color: "#2d3748",
    marginBottom: 2,
  },
  dayNumberToday: {
    color: "#38b2ac",
  },
  eventDot: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 5px",
    borderRadius: 4,
    marginBottom: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
  detailPanel: {
    borderTop: "1px solid #e2e8f0",
    padding: "16px 20px",
    minHeight: 100,
    background: "#fafafa",
  },
  detailTitle: {
    fontWeight: 700,
    fontSize: 14,
    color: "#2d3748",
    marginBottom: 12,
    textTransform: "capitalize",
  },
  eventCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 8,
    marginBottom: 8,
    border: "1px solid",
  },
  emptyDay: {
    textAlign: "center",
    color: "#a0aec0",
    fontSize: 13,
    padding: "16px 0",
  },
}));

const FILTER_TYPE_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "appointment", label: "Compromissos" },
  { value: "reminder", label: "Lembretes" },
];

const FILTER_VIEW_OPTIONS = [
  { value: "month", label: "Mês" },
  { value: "week", label: "Semana" },
  { value: "day", label: "Dia" },
];

export default function CalendarioAtendimento({ filterByUser = false }) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const isAdminOrManager = user?.profile === "admin" || user?.userType === "administrador" || user?.userType === "gerente";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [filterType, setFilterType] = useState("all");
  const [filterView, setFilterView] = useState("month");
  const [appointments, setAppointments] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [upcomingReminders, setUpcomingReminders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDateRange = useCallback(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    // Include padding days for the calendar grid
    return {
      startDate: format(startOfWeek(start, { weekStartsOn: 0 }), "yyyy-MM-dd"),
      endDate: format(endOfWeek(end, { weekStartsOn: 0 }), "yyyy-MM-dd'T'23:59:59"),
    };
  }, [currentDate]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { startDate, endDate } = getDateRange();
      const today = format(new Date(), "yyyy-MM-dd");
      const farFuture = format(addDays(new Date(), 365), "yyyy-MM-dd'T'23:59:59");

      const [apptRes, remRes, upcomingRes] = await Promise.all([
        filterType !== "reminder"
          ? api.get("/appointments", { params: { startDate, endDate, pageNumber: 1 } })
          : Promise.resolve({ data: { appointments: [] } }),
        filterType !== "appointment"
          ? api.get("/ticket-notes/reminders", { params: { startDate, endDate } })
          : Promise.resolve({ data: [] }),
        // Próximos lembretes: próximos 365 dias, independente do mês visualizado
        api.get("/ticket-notes/reminders", { params: { startDate: today, endDate: farFuture } }),
      ]);
      setAppointments(apptRes.data?.appointments || apptRes.data || []);
      setReminders(Array.isArray(remRes.data) ? remRes.data : []);
      setUpcomingReminders(Array.isArray(upcomingRes.data) ? upcomingRes.data.slice(0, 10) : []);
    } catch {
      setAppointments([]);
      setReminders([]);
      setUpcomingReminders([]);
    }
    setLoading(false);
  }, [getDateRange, filterType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDoneReminder = async (noteId) => {
    try {
      await api.put(`/ticket-notes/${noteId}/done`);
      toast.success("Lembrete concluído!");
      await loadData();
    } catch {
      toast.error("Erro ao dar baixa no lembrete");
    }
  };

  const getEventsForDay = (day) => {
    const events = [];
    if (filterType !== "reminder") {
      appointments.forEach(a => {
        const d = a.startDatetime ? parseISO(a.startDatetime) : null;
        if (d && isValid(d) && isSameDay(d, day)) {
          const apptStatus = a.status || "scheduled";
          const apptColor = apptStatus === "completed" ? "#38a169"
            : apptStatus === "confirmed" ? "#3182ce"
            : apptStatus === "cancelled" ? "#718096"
            : apptStatus === "no_show" ? "#e53e3e"
            : "#2b6cb0"; // scheduled (azul escuro)
          events.push({ type: "appointment", id: a.id, title: a.title || "Compromisso", time: format(d, "HH:mm"), color: "#fff", bgColor: apptColor, status: apptStatus, data: a });
        }
      });
    }
    if (filterType !== "appointment") {
      reminders.forEach(r => {
        const d = r.reminderAt ? parseISO(r.reminderAt) : null;
        if (d && isValid(d) && isSameDay(d, day)) {
          const isDone = r.reminderDone;
        events.push({ type: "reminder", id: r.id, title: r.note?.slice(0, 40) || "Lembrete", time: format(d, "HH:mm"), color: isDone ? "#a0aec0" : "#6366f1", bgColor: isDone ? "#f7f7f7" : "#f0f0ff", contact: r.contact?.name, user: r.user?.name, data: r });
        }
      });
    }
    return events.sort((a, b) => a.time.localeCompare(b.time));
  };

  const buildCalendarDays = () => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
    const days = [];
    let day = start;
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const selectedDayEvents = getEventsForDay(selectedDay);

  return (
    <Card className={classes.root} elevation={0}>
      {/* Header */}
      <Box className={classes.header}>
        <Box display="flex" alignItems="center" gap={8} style={{ gap: 8 }}>
          <IconButton size="small" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography className={classes.monthTitle}>
            {format(currentDate, "MMMM yyyy", { locale: ptBR })}
          </Typography>
          <IconButton size="small" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRightIcon />
          </IconButton>
          <Tooltip title="Hoje">
            <IconButton size="small" onClick={() => { setCurrentDate(new Date()); setSelectedDay(new Date()); }}>
              <TodayIcon fontSize="small" style={{ color: "#38b2ac" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box className={classes.filters}>
          <FormControl size="small" variant="outlined" style={{ minWidth: 130 }}>
            <InputLabel>Tipo</InputLabel>
            <Select value={filterType} onChange={e => setFilterType(e.target.value)} label="Tipo">
              {FILTER_TYPE_OPTIONS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
          {loading && <CircularProgress size={18} />}
        </Box>
      </Box>

      {/* Calendar Grid */}
      <Box className={classes.calendarGrid}>
        {/* Week days header */}
        <Box className={classes.weekHeader}>
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
            <Typography key={d} className={classes.weekDay}>{d}</Typography>
          ))}
        </Box>

        {/* Days */}
        <Box className={classes.daysGrid}>
          {buildCalendarDays().map((day, idx) => {
            const events = getEventsForDay(day);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, selectedDay);
            const isOtherMonth = !isSameMonth(day, currentDate);
            return (
              <Box
                key={idx}
                className={`${classes.dayCell} ${isSelected ? classes.dayCellSelected : ""} ${isToday && !isSelected ? classes.dayCellToday : ""} ${isOtherMonth ? classes.dayCellOtherMonth : ""}`}
                onClick={() => setSelectedDay(day)}
              >
                <Typography className={`${classes.dayNumber} ${isToday ? classes.dayNumberToday : ""}`}>
                  {format(day, "d")}
                </Typography>
                {events.slice(0, 2).map((ev, i) => (
                  <Box key={i} className={classes.eventDot} style={{ backgroundColor: ev.bgColor, color: ev.color }}>
                    {ev.type === "reminder" ? <AlarmIcon style={{ fontSize: 9 }} /> : <EventIcon style={{ fontSize: 9 }} />}
                    {ev.time} {ev.title}
                  </Box>
                ))}
                {events.length > 2 && (
                  <Typography style={{ fontSize: 9, fontWeight: 700, color: "#4299e1", marginTop: 1 }}>+{events.length - 2} mais</Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Detail Panel */}
      <Box className={classes.detailPanel}>
        <Typography className={classes.detailTitle}>
          {format(selectedDay, "EEEE, dd 'de' MMMM", { locale: ptBR })}
        </Typography>

        {selectedDayEvents.length === 0 ? (
          <Typography className={classes.emptyDay}>Nenhum evento neste dia.</Typography>
        ) : (
          selectedDayEvents.map((ev, i) => (
            <Box
              key={i}
              className={classes.eventCard}
              style={{ backgroundColor: ev.bgColor, borderColor: ev.color + "40" }}
            >
              <Box style={{ marginTop: 2 }}>
                {ev.type === "reminder"
                  ? <AlarmIcon style={{ fontSize: 18, color: "#6366f1" }} />
                  : <EventIcon style={{ fontSize: 18, color: ev.bgColor }} />
                }
              </Box>
              <Box flex={1}>
                <Box display="flex" alignItems="center" style={{ gap: 8, flexWrap: "wrap" }}>
                  <Typography style={{ fontSize: 13, fontWeight: 700, color: "#2d3748" }}>
                    {ev.time} — {ev.type === "reminder" ? "Lembrete" : "Compromisso"}
                  </Typography>
                  {ev.type === "appointment" && ev.status && (() => {
                    const STATUS_LABELS = { scheduled: "Agendado", confirmed: "Confirmado", completed: "Concluído", cancelled: "Cancelado", no_show: "Não compareceu" };
                    return (
                      <span style={{ backgroundColor: ev.bgColor, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>
                        {STATUS_LABELS[ev.status] || ev.status}
                      </span>
                    );
                  })()}
                </Box>
                <Typography style={{ fontSize: 13, color: "#2d3748", marginTop: 2 }}>
                  {ev.title}
                </Typography>
                {ev.contact && (
                  <Typography style={{ fontSize: 11, color: "#718096", marginTop: 1 }}>
                    Contato: {ev.contact}
                  </Typography>
                )}
                {ev.user && (
                  <Typography style={{ fontSize: 11, color: "#718096" }}>
                    Por: {ev.user}
                  </Typography>
                )}
                {ev.type === "appointment" && ev.data?.description && (
                  <Typography style={{ fontSize: 11, color: "#718096", marginTop: 1 }}>
                    {ev.data.description}
                  </Typography>
                )}
                {ev.type === "reminder" && (
                  <Box display="flex" alignItems="center" mt={1} style={{ gap: 6, flexWrap: "wrap" }}>
                    {ev.data?.reminderDone ? (
                      <Box display="flex" alignItems="center" style={{ gap: 4 }}>
                        <CheckCircleIcon style={{ fontSize: 15, color: "#38a169" }} />
                        <Typography style={{ fontSize: 11, color: "#38a169", fontWeight: 600 }}>Concluído</Typography>
                      </Box>
                    ) : (
                      <Tooltip title="Dar baixa no lembrete">
                        <Box
                          display="flex"
                          alignItems="center"
                          onClick={() => handleDoneReminder(ev.id)}
                          style={{ gap: 4, color: "#6366f1", cursor: "pointer", background: "#f0f0ff", borderRadius: 6, padding: "3px 8px", border: "1px solid #c3b5fd" }}
                        >
                          <CheckCircleOutlineIcon style={{ fontSize: 14 }} />
                          <Typography style={{ fontSize: 11, fontWeight: 600, color: "#6366f1" }}>Dar baixa</Typography>
                        </Box>
                      </Tooltip>
                    )}
                    {ev.data?.ticketId && (
                      <Tooltip title="Ir para a conversa">
                        <Box
                          display="flex"
                          alignItems="center"
                          onClick={() => history.push(`/atendimentos/${ev.data.ticketId}`)}
                          style={{ gap: 4, cursor: "pointer", background: "#e6fffa", borderRadius: 6, padding: "3px 8px", border: "1px solid #81e6d9" }}
                        >
                          <ForumIcon style={{ fontSize: 14, color: "#2c7a7b" }} />
                          <Typography style={{ fontSize: 11, fontWeight: 600, color: "#2c7a7b" }}>Ver conversa</Typography>
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Card>
  );
}
