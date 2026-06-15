import React, { useState, useEffect, useContext } from "react";
import {
  Box, Typography, IconButton, Avatar, Chip, LinearProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, Select, MenuItem, FormControl, InputLabel, Tooltip,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FlagIcon from "@material-ui/icons/Flag";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PersonIcon from "@material-ui/icons/Person";
import { format, isPast, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";

const COLUMNS = [
  { id: "todo",        label: "A Fazer",       color: "#718096", bg: "#f7fafc" },
  { id: "in_progress", label: "Em Andamento",  color: "#3182ce", bg: "#ebf8ff" },
  { id: "review",      label: "Em Revisão",    color: "#d69e2e", bg: "#fffff0" },
  { id: "done",        label: "Concluído",     color: "#38a169", bg: "#f0fff4" },
];

const PRIORITY = {
  low:    { label: "Baixa",   color: "#a0aec0" },
  medium: { label: "Média",   color: "#3182ce" },
  high:   { label: "Alta",    color: "#ed8936" },
  urgent: { label: "Urgente", color: "#e53e3e" },
};

const useStyles = makeStyles(() => ({
  root: { padding: "24px", backgroundColor: "#f0f2f5", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 800, color: "#1a202c" },
  board: { display: "flex", gap: 16, overflowX: "auto", paddingBottom: 16 },
  column: { minWidth: 300, width: 300, flexShrink: 0, borderRadius: 12, padding: "12px 12px 16px", display: "flex", flexDirection: "column" },
  colHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  colTitle: { fontWeight: 700, fontSize: 14 },
  colCount: { fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 12, color: "#fff" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: "14px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", cursor: "pointer", "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }, transition: "all 0.2s" },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#1a202c", marginBottom: 6, lineHeight: 1.4 },
  cardDesc: { fontSize: 12, color: "#718096", marginBottom: 10, lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", "-webkit-line-clamp": 2, "-webkit-box-orient": "vertical" },
  addBtn: { width: "100%", justifyContent: "flex-start", color: "#718096", padding: "8px 4px", borderRadius: 8, "&:hover": { backgroundColor: "rgba(0,0,0,0.04)", color: "#2d3748" } },
  moveBtn: { minWidth: 0, padding: "2px 6px", fontSize: 11 },
}));

const EMPTY_TASK = { title: "", description: "", status: "todo", priority: "medium", dueDate: "", progress: 0, assignedTo: [], contactId: "" };

export default function Tarefas() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const userTypeLower = (user?.userType || "").toLowerCase();
  const isAdminOrManager = ["administrador", "gerente"].includes(userTypeLower);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState(EMPTY_TASK);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadAll();
    api.get("/users").then(({ data }) => setUsers(data.users || data || [])).catch(() => {});
    api.get("/contacts", { params: { pageNumber: 1 } }).then(({ data }) => setContacts(data.contacts || [])).catch(() => {});
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch { toast.error("Erro ao carregar tarefas"); }
    setLoading(false);
  };

  const openCreate = (status = "todo") => {
    setEditTask(null);
    setForm({ ...EMPTY_TASK, status });
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditTask(task);
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      priority: task.priority || "medium",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      progress: task.progress || 0,
      assignedTo: Array.isArray(task.assignedTo) ? task.assignedTo : [],
      contactId: task.contactId || "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Título é obrigatório"); return; }
    setSaving(true);
    try {
      const payload = { ...form, dueDate: form.dueDate || null, assignedTo: form.assignedTo || [], contactId: form.contactId || null };
      if (editTask) {
        const { data } = await api.put(`/tasks/${editTask.id}`, payload);
        setTasks(prev => prev.map(t => t.id === editTask.id ? data : t));
        toast.success("Tarefa atualizada!");
      } else {
        const { data } = await api.post("/tasks", payload);
        setTasks(prev => [data, ...prev]);
        toast.success("Tarefa criada!");
      }
      setModalOpen(false);
    } catch { toast.error("Erro ao salvar tarefa"); }
    setSaving(false);
  };

  const moveTask = async (task, newStatus) => {
    try {
      const { data } = await api.put(`/tasks/${task.id}`, { status: newStatus });
      setTasks(prev => prev.map(t => t.id === task.id ? data : t));
    } catch { toast.error("Erro ao mover tarefa"); }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${deleteTarget.id}`);
      setTasks(prev => prev.filter(t => t.id !== deleteTarget.id));
      toast.success("Tarefa removida!");
    } catch { toast.error("Erro ao remover tarefa"); }
    setDeleteTarget(null);
  };

  const getDueStyle = (dueDate) => {
    if (!dueDate) return {};
    const d = new Date(dueDate);
    if (isPast(d) && !isToday(d)) return { color: "#e53e3e", fontWeight: 700 };
    if (isToday(d)) return { color: "#d69e2e", fontWeight: 700 };
    return { color: "#718096" };
  };

  const colTasks = (colId) => tasks.filter(t => t.status === colId);
  const colIndex = (colId) => COLUMNS.findIndex(c => c.id === colId);

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Box>
          <Typography className={classes.title}>Tarefas</Typography>
          <Typography style={{ fontSize: 13, color: "#718096", marginTop: 2 }}>
            {tasks.length} tarefa{tasks.length !== 1 ? "s" : ""} no total
          </Typography>
        </Box>
        {isAdminOrManager && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => openCreate()} style={{ backgroundColor: "#4299e1", color: "#fff", borderRadius: 8, fontWeight: 700 }}>
            Nova Tarefa
          </Button>
        )}
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" pt={6}><CircularProgress /></Box>
      ) : (
        <Box className={classes.board}>
          {COLUMNS.map((col) => {
            const colTasksList = colTasks(col.id);
            return (
              <Box key={col.id} className={classes.column} style={{ backgroundColor: col.bg, border: `1px solid ${col.color}20` }}>
                <Box className={classes.colHeader}>
                  <Typography className={classes.colTitle} style={{ color: col.color }}>{col.label}</Typography>
                  <Box display="flex" alignItems="center" style={{ gap: 6 }}>
                    <span className={classes.colCount} style={{ backgroundColor: col.color }}>{colTasksList.length}</span>
                  </Box>
                </Box>

                {/* Cards */}
                {colTasksList.map((task) => {
                  const prio = PRIORITY[task.priority] || PRIORITY.medium;
                  const idx = colIndex(col.id);
                  return (
                    <Box key={task.id} className={classes.card} onClick={() => openEdit(task)}>
                      {/* Prioridade + ações */}
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                        <Chip label={prio.label} size="small" style={{ backgroundColor: prio.color + "20", color: prio.color, fontWeight: 700, fontSize: 10, height: 18 }} />
                        <Box display="flex" style={{ gap: 2 }} onClick={e => e.stopPropagation()}>
                          {isAdminOrManager && (
                            <Tooltip title="Excluir">
                              <IconButton size="small" onClick={(e) => { e.stopPropagation(); setDeleteTarget(task); }}>
                                <DeleteIcon style={{ fontSize: 14, color: "#e53e3e" }} />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </Box>

                      <Typography className={classes.cardTitle}>{task.title}</Typography>
                      {task.description && <Typography className={classes.cardDesc}>{task.description}</Typography>}

                      {/* Progresso */}
                      {task.progress > 0 && (
                        <Box mb={1}>
                          <Box display="flex" justifyContent="space-between">
                            <Typography style={{ fontSize: 10, color: "#718096" }}>Progresso</Typography>
                            <Typography style={{ fontSize: 10, color: col.color, fontWeight: 700 }}>{task.progress}%</Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={task.progress} style={{ height: 4, borderRadius: 2, backgroundColor: "#e2e8f0" }} />
                        </Box>
                      )}

                      <Box display="flex" flexWrap="wrap" style={{ gap: 6, marginTop: 6 }}>
                        {task.dueDate && (
                          <Box display="flex" alignItems="center" style={{ gap: 3 }}>
                            <AccessTimeIcon style={{ fontSize: 11, ...getDueStyle(task.dueDate) }} />
                            <Typography style={{ fontSize: 10, ...getDueStyle(task.dueDate) }}>
                              {format(new Date(task.dueDate), "dd/MM/yy", { locale: ptBR })}
                            </Typography>
                          </Box>
                        )}
                        {task.assignedUsers?.length > 0 && (
                          <Box display="flex" alignItems="center" style={{ gap: 2 }}>
                            {task.assignedUsers.slice(0, 3).map((u, i) => (
                              <Tooltip key={i} title={u.name}>
                                <Avatar style={{ width: 18, height: 18, fontSize: 9, backgroundColor: "#4299e1", border: "1.5px solid #fff" }}>
                                  {u.name?.[0]}
                                </Avatar>
                              </Tooltip>
                            ))}
                            {task.assignedUsers.length > 3 && (
                              <Typography style={{ fontSize: 9, color: "#718096" }}>+{task.assignedUsers.length - 3}</Typography>
                            )}
                          </Box>
                        )}
                        {task.contact && (
                          <Box display="flex" alignItems="center" style={{ gap: 3 }}>
                            <PersonIcon style={{ fontSize: 11, color: "#9f7aea" }} />
                            <Typography style={{ fontSize: 10, color: "#9f7aea" }}>{task.contact.name}</Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Mover entre colunas */}
                      <Box display="flex" style={{ gap: 4, marginTop: 8 }} onClick={e => e.stopPropagation()}>
                        {idx > 0 && (
                          <Button size="small" className={classes.moveBtn} variant="outlined" style={{ borderColor: COLUMNS[idx - 1].color, color: COLUMNS[idx - 1].color, fontSize: 10 }}
                            onClick={() => moveTask(task, COLUMNS[idx - 1].id)}>
                            ← {COLUMNS[idx - 1].label}
                          </Button>
                        )}
                        {idx < COLUMNS.length - 1 && (
                          <Button size="small" className={classes.moveBtn} variant="contained" style={{ backgroundColor: COLUMNS[idx + 1].color, color: "#fff", fontSize: 10 }}
                            onClick={() => moveTask(task, COLUMNS[idx + 1].id)}>
                            {COLUMNS[idx + 1].label} →
                          </Button>
                        )}
                      </Box>
                    </Box>
                  );
                })}

                {isAdminOrManager && (
                  <Button className={classes.addBtn} startIcon={<AddIcon style={{ fontSize: 14 }} />} onClick={() => openCreate(col.id)}>
                    Adicionar tarefa
                  </Button>
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {/* Modal criar/editar */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle style={{ background: "#4299e1", color: "#fff", fontWeight: 700 }}>
          {editTask ? "Editar Tarefa" : "Nova Tarefa"}
        </DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField label="Título *" fullWidth variant="outlined" size="small" value={form.title} onChange={e => { const v = e.target.value; setForm(f => ({ ...f, title: v })); }} style={{ marginBottom: 14 }} autoFocus />
          <TextField label="Descrição" fullWidth variant="outlined" size="small" multiline minRows={3} value={form.description} onChange={e => { const v = e.target.value; setForm(f => ({ ...f, description: v })); }} style={{ marginBottom: 14 }} />

          <Box display="flex" style={{ gap: 12, marginBottom: 14 }}>
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <InputLabel>Status</InputLabel>
              <Select value={form.status} onChange={e => { const v = e.target.value; setForm(f => ({ ...f, status: v })); }} label="Status">
                {COLUMNS.map(c => <MenuItem key={c.id} value={c.id}>{c.label}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <InputLabel>Prioridade</InputLabel>
              <Select value={form.priority} onChange={e => { const v = e.target.value; setForm(f => ({ ...f, priority: v })); }} label="Prioridade">
                {Object.entries(PRIORITY).map(([k, v]) => <MenuItem key={k} value={k}>{v.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" style={{ gap: 12, marginBottom: 14 }}>
            <TextField label="Prazo" type="date" variant="outlined" size="small" style={{ flex: 1 }} value={form.dueDate} onChange={e => { const v = e.target.value; setForm(f => ({ ...f, dueDate: v })); }} InputLabelProps={{ shrink: true }} />
            <TextField label="Progresso %" type="number" variant="outlined" size="small" style={{ flex: 1 }} value={form.progress} onChange={e => { const v = e.target.value; setForm(f => ({ ...f, progress: Math.min(100, Math.max(0, Number(v))) })); }} inputProps={{ min: 0, max: 100 }} />
          </Box>

          <FormControl variant="outlined" size="small" fullWidth style={{ marginBottom: 14 }}>
            <InputLabel>Responsáveis</InputLabel>
            <Select
              multiple
              value={form.assignedTo}
              onChange={e => { const v = e.target.value; setForm(f => ({ ...f, assignedTo: v })); }}
              label="Responsáveis"
              renderValue={(selected) =>
                selected.map(id => users.find(u => u.id === id)?.name || id).join(", ")
              }
            >
              {users.map(u => (
                <MenuItem key={u.id} value={u.id}>
                  <Box display="flex" alignItems="center" style={{ gap: 8 }}>
                    <Avatar style={{ width: 22, height: 22, fontSize: 10, backgroundColor: "#4299e1" }}>{u.name?.[0]}</Avatar>
                    {u.name}
                    {form.assignedTo.includes(u.id) && <span style={{ marginLeft: "auto", color: "#4299e1", fontWeight: 700 }}>✓</span>}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Contato</InputLabel>
            <Select value={form.contactId} onChange={e => { const v = e.target.value; setForm(f => ({ ...f, contactId: v })); }} label="Contato">
              <MenuItem value="">Nenhum</MenuItem>
              {contacts.slice(0, 50).map(c => <MenuItem key={c.id} value={c.id}>{c.name} — {c.number}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving || !form.title.trim()} style={{ backgroundColor: "#4299e1", color: "#fff" }}>
            {saving ? <CircularProgress size={18} color="inherit" /> : (editTask ? "Salvar" : "Criar")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmar exclusão */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs">
        <DialogTitle>Excluir Tarefa</DialogTitle>
        <DialogContent><Typography>Deseja excluir "{deleteTarget?.title}"?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancelar</Button>
          <Button onClick={handleDelete} variant="contained" style={{ backgroundColor: "#e53e3e", color: "#fff" }}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
