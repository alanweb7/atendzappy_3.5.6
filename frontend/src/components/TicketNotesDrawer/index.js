import React, { useState, useEffect, useContext } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  Divider,
  CircularProgress,
  Tooltip,
  Tabs,
  Tab,
  Chip,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import NoteIcon from "@material-ui/icons/Notes";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LabelIcon from "@material-ui/icons/Label";
import AlarmIcon from "@material-ui/icons/Alarm";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { toast } from "react-toastify";
import moment from "moment";
import useTicketNotes from "../../hooks/useTicketNotes";
import ConfirmationModal from "../ConfirmationModal";
import { AuthContext } from "../../context/Auth/AuthContext";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 420,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderLeft: "1px solid #e2e8f0",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: 15,
    color: "#1a202c",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  tabs: {
    borderBottom: "1px solid #e2e8f0",
    minHeight: 40,
    background: "#f8fafc",
  },
  tab: {
    minHeight: 40,
    fontSize: 12,
    fontWeight: 600,
    textTransform: "none",
    minWidth: 0,
    flex: 1,
    padding: "6px 8px",
  },
  tabPanel: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  addSection: {
    padding: "14px 16px",
    borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  noteItem: {
    padding: 0,
    borderBottom: "1px solid #f1f5f9",
    "&:hover": { background: "#f8fafc" },
  },
  noteText: {
    fontSize: 13,
    color: "#2d3748",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  noteMeta: {
    fontSize: 11,
    color: "#718096",
    marginTop: 2,
  },
  avatar: {
    width: 32,
    height: 32,
    fontSize: 12,
    backgroundColor: "#4299e1",
    flexShrink: 0,
  },
  avatarIa: {
    width: 32,
    height: 32,
    fontSize: 11,
    backgroundColor: "#805ad5",
    flexShrink: 0,
  },
  emptyState: {
    textAlign: "center",
    color: "#a0aec0",
    padding: "32px 20px",
    fontSize: 13,
  },
  // Protocolo
  protocolItem: {
    display: "flex",
    flexDirection: "column",
    padding: "12px 16px",
    borderBottom: "1px solid #f1f5f9",
    "&:hover": { background: "#f8fafc" },
    cursor: "default",
  },
  protocolId: {
    fontWeight: 700,
    fontSize: 13,
    color: "#2d3748",
  },
  protocolMeta: {
    fontSize: 11,
    color: "#718096",
    marginTop: 2,
  },
  statusChip: {
    height: 18,
    fontSize: 10,
    fontWeight: 600,
    marginLeft: 8,
  },
  // Tags
  tagSection: {
    padding: "16px",
  },
  tagSectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#4a5568",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tagChip: {
    margin: "2px 4px 2px 0",
    fontSize: 12,
  },
}));

const STATUS_LABELS = {
  open: { label: "Atendendo", color: "#38a169" },
  pending: { label: "Aguardando", color: "#d69e2e" },
  closed: { label: "Finalizado", color: "#718096" },
};

export default function TicketNotesDrawer({ open, onClose, ticket }) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { saveNote, deleteNote, listNotes } = useTicketNotes();

  const [tab, setTab] = useState(0);

  // Aba Anotações
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderAt, setReminderAt] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Aba Protocolos
  const [protocols, setProtocols] = useState([]);
  const [loadingProtocols, setLoadingProtocols] = useState(false);

  // Aba Tags
  const [tagHistory, setTagHistory] = useState([]);
  const [loadingTags, setLoadingTags] = useState(false);

  const isAdminOrManager =
    user?.profile === "admin" ||
    user?.userType === "administrador" ||
    user?.userType === "gerente";

  useEffect(() => {
    if (open && ticket?.id) {
      loadNotes();
      loadProtocols();
      loadTagHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ticket?.id]);

  const loadNotes = async () => {
    setLoadingNotes(true);
    try {
      const data = await listNotes({ ticketId: ticket.id, contactId: ticket.contactId });
      setNotes(data);
    } catch {
      toast.error("Erro ao carregar anotações");
    }
    setLoadingNotes(false);
  };

  const loadProtocols = async () => {
    setLoadingProtocols(true);
    try {
      const { data } = await api.get("/tickets", {
        params: { contactId: ticket.contactId, pageNumber: 1, status: "all" },
      });
      setProtocols(data.tickets || []);
    } catch {
      // silencioso
    }
    setLoadingProtocols(false);
  };

  const loadTagHistory = async () => {
    setLoadingTags(true);
    try {
      const { data } = await api.get(`/tickets-tag-history/${ticket.id}`);
      setTagHistory(data);
    } catch {
      // silencioso
    }
    setLoadingTags(false);
  };

  const handleSave = async () => {
    if (!newNote.trim()) return;
    if (hasReminder && !reminderAt) {
      toast.error("Informe a data e hora do lembrete");
      return;
    }
    setSaving(true);
    try {
      await saveNote({
        note: newNote.trim(),
        ticketId: ticket.id,
        contactId: ticket.contactId,
        reminderAt: hasReminder && reminderAt ? reminderAt : null,
      });
      setNewNote("");
      setHasReminder(false);
      setReminderAt("");
      await loadNotes();
      toast.success(hasReminder ? "Anotação com lembrete adicionada!" : "Anotação adicionada!");
    } catch {
      toast.error("Erro ao salvar anotação");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    try {
      await deleteNote(deleteTarget.id);
      await loadNotes();
      toast.success("Anotação excluída!");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Sem permissão para excluir");
    }
    setDeleteTarget(null);
  };

  const handleEditSave = async (note) => {
    if (!editText.trim()) return;
    try {
      await api.put(`/ticket-notes/${note.id}`, { ...note, note: editText.trim() });
      await loadNotes();
      setEditingId(null);
      toast.success("Anotação atualizada!");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Sem permissão para editar");
    }
  };

  const handleDoneReminder = async (note) => {
    try {
      await api.put(`/ticket-notes/${note.id}/done`);
      await loadNotes();
      toast.success("Lembrete marcado como concluído!");
    } catch {
      toast.error("Erro ao dar baixa no lembrete");
    }
  };

  const canEdit = (note) => isAdminOrManager || note.userId === user?.id;
  const canDelete = () => isAdminOrManager;

  const getInitials = (name) =>
    (name || "?").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

  return (
    <>
      <ConfirmationModal
        title="Excluir anotação"
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      >
        Deseja excluir esta anotação permanentemente?
      </ConfirmationModal>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        classes={{ paper: classes.drawerPaper }}
      >
        {/* Header */}
        <Box className={classes.header}>
          <Typography className={classes.headerTitle}>
            Histórico do Atendimento
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          className={classes.tabs}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            className={classes.tab}
            icon={<NoteIcon style={{ fontSize: 14 }} />}
            label="Anotações"
          />
          <Tab
            className={classes.tab}
            icon={<AssignmentIcon style={{ fontSize: 14 }} />}
            label="Protocolos"
          />
          <Tab
            className={classes.tab}
            icon={<LabelIcon style={{ fontSize: 14 }} />}
            label="Tags"
          />
        </Tabs>

        {/* ── ABA 0: ANOTAÇÕES ── */}
        {tab === 0 && (
          <Box className={classes.tabPanel}>
            <Box className={classes.addSection}>
              <TextField
                label="Nova anotação"
                placeholder="Ctrl+Enter para salvar..."
                multiline
                minRows={3}
                variant="outlined"
                fullWidth
                size="small"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSave();
                }}
              />
              <Box display="flex" alignItems="center" mt={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={hasReminder}
                      onChange={(e) => {
                        setHasReminder(e.target.checked);
                        if (!e.target.checked) setReminderAt("");
                      }}
                      color="primary"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={4} style={{ gap: 4 }}>
                      <AlarmIcon style={{ fontSize: 15, color: hasReminder ? "#6366f1" : "#a0aec0" }} />
                      <Typography style={{ fontSize: 12, color: hasReminder ? "#6366f1" : "#718096" }}>
                        Adicionar lembrete
                      </Typography>
                    </Box>
                  }
                  style={{ margin: 0 }}
                />
              </Box>
              {hasReminder && (
                <Box mt={1}>
                  <TextField
                    label="Data e hora do lembrete"
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={reminderAt}
                    onChange={(e) => setReminderAt(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      min: new Date().toISOString().slice(0, 16)
                    }}
                  />
                </Box>
              )}
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={saving ? <CircularProgress size={12} color="inherit" /> : <SaveIcon />}
                  onClick={handleSave}
                  disabled={saving || !newNote.trim()}
                >
                  Salvar
                </Button>
              </Box>
            </Box>

            <Box flex={1} overflow="auto">
              {loadingNotes ? (
                <Box display="flex" justifyContent="center" p={3}>
                  <CircularProgress size={24} />
                </Box>
              ) : notes.length === 0 ? (
                <Typography className={classes.emptyState}>
                  Nenhuma anotação registrada ainda.
                </Typography>
              ) : (
                <List disablePadding>
                  {notes.map((note) => (
                    <React.Fragment key={note.id}>
                      <ListItem className={classes.noteItem} disableGutters>
                        <Box display="flex" alignItems="flex-start" width="100%" px={2} py={1.5}>
                          <Avatar
                            className={note.source === "ia" ? classes.avatarIa : classes.avatar}
                            style={{ marginRight: 10, marginTop: 2 }}
                          >
                            {note.source === "ia" ? "IA" : getInitials(note.user?.name)}
                          </Avatar>

                          <Box flex={1} minWidth={0}>
                            {editingId === note.id ? (
                              <TextField
                                multiline
                                minRows={3}
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                autoFocus
                              />
                            ) : (
                              <Typography className={classes.noteText}>{note.note}</Typography>
                            )}
                            <Typography className={classes.noteMeta}>
                              {note.source === "ia" ? "Inteligência Artificial" : note.user?.name} •{" "}
                              {moment(note.createdAt).format("DD/MM/YY HH:mm")}
                            </Typography>
                            {note.reminderAt && (
                              <Box display="flex" alignItems="center" style={{ gap: 4, marginTop: 4, background: note.reminderDone ? "#f0fff4" : "#f0f0ff", borderRadius: 6, padding: "3px 8px", border: `1px solid ${note.reminderDone ? "#9ae6b4" : "#c3b5fd"}` }}>
                                <AlarmIcon style={{ fontSize: 12, color: note.reminderDone ? "#38a169" : "#6366f1" }} />
                                <Typography style={{ fontSize: 11, color: note.reminderDone ? "#38a169" : "#6366f1", fontWeight: 600, flex: 1, textDecoration: note.reminderDone ? "line-through" : "none" }}>
                                  {moment(note.reminderAt).format("DD/MM/YY HH:mm")}
                                </Typography>
                                {!note.reminderDone && (
                                  <Tooltip title="Dar baixa no lembrete">
                                    <IconButton size="small" style={{ padding: 2 }} onClick={() => handleDoneReminder(note)}>
                                      <CheckCircleOutlineIcon style={{ fontSize: 14, color: "#6366f1" }} />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {note.reminderDone && (
                                  <CheckCircleIcon style={{ fontSize: 14, color: "#38a169" }} />
                                )}
                              </Box>
                            )}
                          </Box>

                          <Box display="flex" flexDirection="column" alignItems="center" ml={0.5} flexShrink={0}>
                            {editingId === note.id ? (
                              <>
                                <Tooltip title="Confirmar">
                                  <IconButton size="small" onClick={() => handleEditSave(note)}>
                                    <CheckIcon style={{ fontSize: 16, color: "#38a169" }} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Cancelar">
                                  <IconButton size="small" onClick={() => setEditingId(null)}>
                                    <CancelIcon style={{ fontSize: 16, color: "#e53e3e" }} />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              <>
                                {canEdit(note) && (
                                  <Tooltip title="Editar">
                                    <IconButton
                                      size="small"
                                      onClick={() => { setEditingId(note.id); setEditText(note.note); }}
                                    >
                                      <EditIcon style={{ fontSize: 15, color: "#718096" }} />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {canDelete() && (
                                  <Tooltip title="Excluir">
                                    <IconButton size="small" onClick={() => setDeleteTarget(note)}>
                                      <DeleteIcon style={{ fontSize: 15, color: "#e53e3e" }} />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </>
                            )}
                          </Box>
                        </Box>
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        )}

        {/* ── ABA 1: PROTOCOLOS ── */}
        {tab === 1 && (
          <Box className={classes.tabPanel} overflow="auto">
            {loadingProtocols ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress size={24} />
              </Box>
            ) : protocols.length === 0 ? (
              <Typography className={classes.emptyState}>
                Nenhum protocolo encontrado para este contato.
              </Typography>
            ) : (
              protocols.map((p) => {
                const statusInfo = STATUS_LABELS[p.status] || { label: p.status, color: "#718096" };
                return (
                  <Box key={p.id} className={classes.protocolItem}>
                    <Box display="flex" alignItems="center">
                      <Typography className={classes.protocolId}>
                        #{String(p.id).padStart(5, "0")}
                      </Typography>
                      <Chip
                        label={statusInfo.label}
                        size="small"
                        className={classes.statusChip}
                        style={{ backgroundColor: statusInfo.color, color: "#fff" }}
                      />
                      {p.id === ticket.id && (
                        <Chip
                          label="atual"
                          size="small"
                          className={classes.statusChip}
                          style={{ backgroundColor: "#4299e1", color: "#fff", marginLeft: 4 }}
                        />
                      )}
                    </Box>
                    <Typography className={classes.protocolMeta}>
                      Aberto: {moment(p.createdAt).format("DD/MM/YY HH:mm")}
                      {p.closedAt && ` • Fechado: ${moment(p.closedAt).format("DD/MM/YY HH:mm")}`}
                    </Typography>
                    {p.user && (
                      <Typography className={classes.protocolMeta}>
                        Atendente: {p.user.name}
                      </Typography>
                    )}
                    {p.queue && (
                      <Typography className={classes.protocolMeta}>
                        Fila: {p.queue.name}
                      </Typography>
                    )}
                    {p.lastMessage && (
                      <Typography className={classes.protocolMeta} style={{ fontStyle: "italic", marginTop: 2 }}>
                        "{p.lastMessage.length > 60 ? p.lastMessage.slice(0, 60) + "…" : p.lastMessage}"
                      </Typography>
                    )}
                    <Divider style={{ marginTop: 8 }} />
                  </Box>
                );
              })
            )}
          </Box>
        )}

        {/* ── ABA 2: HISTÓRICO DE TAGS ── */}
        {tab === 2 && (
          <Box className={classes.tabPanel} overflow="auto">
            {loadingTags ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress size={24} />
              </Box>
            ) : tagHistory.length === 0 ? (
              <Typography className={classes.emptyState}>
                Nenhuma movimentação de tag registrada.
              </Typography>
            ) : (
              <List disablePadding>
                {tagHistory.map((h) => (
                  <React.Fragment key={h.id}>
                    <ListItem disableGutters style={{ padding: "10px 16px" }}>
                      <Box display="flex" alignItems="center" width="100%" gap={1}>
                        {/* Ícone de ação */}
                        <Box
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            flexShrink: 0,
                            backgroundColor: h.action === "added" ? "#38a169" : "#e53e3e",
                          }}
                        />
                        {/* Tag */}
                        <Chip
                          label={h.tag?.name || "Tag removida"}
                          size="small"
                          style={{
                            backgroundColor: h.tag?.color || "#718096",
                            color: "#fff",
                            fontSize: 11,
                            height: 20,
                            opacity: h.action === "removed" ? 0.6 : 1,
                          }}
                        />
                        {/* Tipo kanban */}
                        {h.tag?.kanban === 1 && (
                          <Typography style={{ fontSize: 10, color: "#805ad5", fontWeight: 700 }}>
                            KANBAN
                          </Typography>
                        )}
                        {/* Ação */}
                        <Typography style={{ fontSize: 11, color: h.action === "added" ? "#38a169" : "#e53e3e", fontWeight: 600, marginLeft: 2 }}>
                          {h.action === "added" ? "adicionada" : "removida"}
                        </Typography>
                        <Box flex={1} />
                        {/* Data */}
                        <Typography style={{ fontSize: 11, color: "#a0aec0", whiteSpace: "nowrap" }}>
                          {moment(h.createdAt).format("DD/MM/YY HH:mm")}
                        </Typography>
                      </Box>
                      {h.user && (
                        <Typography style={{ fontSize: 11, color: "#718096", marginLeft: 17, marginTop: 2 }}>
                          por {h.user.name}
                        </Typography>
                      )}
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        )}
      </Drawer>
    </>
  );
}
