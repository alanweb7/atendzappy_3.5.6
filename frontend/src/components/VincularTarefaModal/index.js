import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, CircularProgress,
  List, ListItem, ListItemText, Checkbox, Chip, InputAdornment
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LinkIcon from "@material-ui/icons/Link";
import { toast } from "react-toastify";
import api from "../../services/api";

const PRIORITY_COLORS = { low: "#a0aec0", medium: "#3182ce", high: "#ed8936", urgent: "#e53e3e" };
const PRIORITY_LABELS = { low: "Baixa", medium: "Média", high: "Alta", urgent: "Urgente" };
const STATUS_LABELS = { todo: "A Fazer", in_progress: "Em Andamento", review: "Em Revisão", done: "Concluído" };

export default function VincularTarefaModal({ open, onClose, projectId, onSuccess }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!open) return;
    setSearch("");
    loadTasks();
  }, [open, projectId]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      // Mostra todas as tarefas sem projeto ou já deste projeto
      const available = data.filter(t => !t.projectId || Number(t.projectId) === Number(projectId));
      setTasks(available);
      // Pré-seleciona as já vinculadas a este projeto
      const alreadyLinked = available
        .filter(t => Number(t.projectId) === Number(projectId))
        .map(t => t.id);
      setSelected(alreadyLinked);
    } catch { toast.error("Erro ao carregar tarefas"); }
    setLoading(false);
  };

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleVincular = async () => {
    setSaving(true);
    try {
      const previouslyLinked = tasks
        .filter(t => Number(t.projectId) === Number(projectId))
        .map(t => t.id);

      // Vincular tarefas selecionadas
      const toLink = selected.filter(id => !previouslyLinked.includes(id));
      // Desvincular tarefas desmarcadas
      const toUnlink = previouslyLinked.filter(id => !selected.includes(id));

      await Promise.all([
        ...toLink.map(id => api.put(`/tasks/${id}`, { projectId: Number(projectId) })),
        ...toUnlink.map(id => api.put(`/tasks/${id}`, { projectId: null })),
      ]);

      const linked = toLink.length;
      const unlinked = toUnlink.length;
      if (linked || unlinked) {
        toast.success(`${linked} vinculada(s), ${unlinked} desvinculada(s)`);
      } else {
        toast.info("Nenhuma alteração realizada");
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (e) {
      console.error(e);
      toast.error("Erro ao salvar vínculos");
    }
    setSaving(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle style={{ background: "#4299e1", color: "#fff", fontWeight: 700 }}>
        <Box display="flex" alignItems="center" style={{ gap: 8 }}>
          <LinkIcon />
          Vincular Tarefas ao Projeto
        </Box>
      </DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <TextField
          placeholder="Buscar tarefa..."
          fullWidth
          size="small"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon style={{ color: "#a0aec0" }} /></InputAdornment>
          }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" p={3}><CircularProgress size={24} /></Box>
        ) : filtered.length === 0 ? (
          <Typography style={{ textAlign: "center", color: "#a0aec0", padding: 24 }}>
            Nenhuma tarefa disponível para vincular
          </Typography>
        ) : (
          <List dense style={{ maxHeight: 400, overflow: "auto" }}>
            {filtered.map(task => (
              <ListItem
                key={task.id}
                button
                onClick={() => toggle(task.id)}
                style={{
                  borderRadius: 8,
                  marginBottom: 4,
                  backgroundColor: selected.includes(task.id) ? "#ebf8ff" : "#f8fafc",
                  border: `1px solid ${selected.includes(task.id) ? "#4299e1" : "#e2e8f0"}`
                }}
              >
                <Checkbox
                  checked={selected.includes(task.id)}
                  color="primary"
                  size="small"
                  style={{ padding: "0 8px 0 0" }}
                />
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" style={{ gap: 6, flexWrap: "wrap" }}>
                      <Typography style={{ fontSize: 14, fontWeight: 600 }}>{task.title}</Typography>
                      <Chip
                        label={PRIORITY_LABELS[task.priority] || task.priority}
                        size="small"
                        style={{ height: 16, fontSize: 9, backgroundColor: PRIORITY_COLORS[task.priority] + "20", color: PRIORITY_COLORS[task.priority] }}
                      />
                      <Chip
                        label={STATUS_LABELS[task.status] || task.status}
                        size="small"
                        style={{ height: 16, fontSize: 9, backgroundColor: "#e2e8f0", color: "#718096" }}
                      />
                      {task.projectId === projectId && (
                        <Chip label="Já vinculada" size="small" style={{ height: 16, fontSize: 9, backgroundColor: "#c6f6d5", color: "#38a169" }} />
                      )}
                    </Box>
                  }
                  secondary={task.description?.slice(0, 60) || ""}
                />
              </ListItem>
            ))}
          </List>
        )}

        {selected.length > 0 && (
          <Typography style={{ fontSize: 12, color: "#4299e1", marginTop: 8, fontWeight: 600 }}>
            {selected.length} tarefa(s) selecionada(s)
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancelar</Button>
        <Button
          onClick={handleVincular}
          variant="contained"
          disabled={saving || !selected.length}
          style={{ backgroundColor: "#4299e1", color: "#fff" }}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <LinkIcon />}
        >
          Vincular
        </Button>
      </DialogActions>
    </Dialog>
  );
}
