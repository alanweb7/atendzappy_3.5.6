import React, { useContext, useEffect, useState } from "react";
import {
  Box, Button, Chip, CircularProgress, Collapse, Dialog, DialogActions,
  DialogContent, DialogTitle, Divider, FormControl, IconButton, InputAdornment,
  InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead,
  TableRow, TextField, Tooltip, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LinkIcon from "@material-ui/icons/Link";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import TableChartIcon from "@material-ui/icons/TableChart";
import SearchIcon from "@material-ui/icons/Search";
import { toast } from "react-toastify";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import ConfirmationModal from "../../components/ConfirmationModal";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex", flexDirection: "column", height: "100%",
    backgroundColor: "transparent", overflowY: "auto",
    ...theme.scrollbarStyles,
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 24px", borderBottom: "1px solid #e0e0e0",
    flexWrap: "wrap", gap: 12,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 16 },
  headerTitle: { fontSize: "1.5rem", fontWeight: 600, color: "#1a1a1a" },
  headerSubtitle: { fontSize: "0.875rem", color: "#666" },
  headerRight: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  searchField: {
    backgroundColor: "#fff", borderRadius: 8, minWidth: 220,
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      "& fieldset": { borderColor: "#e0e0e0" },
      "&:hover fieldset": { borderColor: "#1976d2" },
    },
  },
  addButton: { borderRadius: 8, padding: "6px 20px", textTransform: "none", fontWeight: 600 },
  content: { padding: "16px 24px" },
  tableWrapper: {
    backgroundColor: "#fff", borderRadius: 12, overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 16,
  },
  tableHead: {
    backgroundColor: "var(--sidebar-color, #1e293b)",
    "& th": {
      color: "#cbd5e1", fontWeight: 600, fontSize: "0.8rem",
      textTransform: "uppercase", letterSpacing: "0.05em",
      borderBottom: "none", padding: "14px 16px",
    },
  },
  baseRow: {
    cursor: "pointer",
    "& td": {
      padding: "12px 16px", fontSize: "0.875rem",
      color: "#334155", borderBottom: "1px solid #f1f5f9",
    },
    "&:hover td": { backgroundColor: "#f8fafc" },
  },
  itemsRow: {
    "& td": { padding: 0, borderBottom: "1px solid #e2e8f0" },
  },
  itemsInner: { padding: "0 16px 16px" },
  itemTable: {
    "& th": {
      background: "#f8fafc", fontWeight: 600, fontSize: 12,
      color: "#64748b", padding: "8px 12px",
    },
    "& td": { padding: "8px 12px", fontSize: 13, color: "#334155" },
    "& tr:hover td": { background: "#f1f5f9" },
  },
  typeChip: { fontSize: 11, height: 22 },
  emptyState: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "48px 0", color: "#94a3b8",
  },
}));

const TYPE_LABELS = {
  text: "Texto", link: "Link", pdf: "PDF",
  image: "Imagem", spreadsheet: "Planilha"
};
const TYPE_COLORS = {
  text: "#e0f2fe", link: "#fce7f3", pdf: "#fee2e2",
  image: "#f3e8ff", spreadsheet: "#dcfce7"
};
const TYPE_TEXT_COLORS = {
  text: "#0369a1", link: "#9d174d", pdf: "#991b1b",
  image: "#6b21a8", spreadsheet: "#166534"
};

// ── Modal criar/editar base ──────────────────────────────────────────────────
function BaseModal({ open, base, onClose, onSaved }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (base) { setName(base.name || ""); setDescription(base.description || ""); }
    else { setName(""); setDescription(""); }
  }, [base, open]);

  const handleSave = async () => {
    if (!name.trim()) { toast.error("Informe o nome da base."); return; }
    setSaving(true);
    try {
      if (base) {
        await api.put(`/knowledge-bases/${base.id}`, { name, description });
        toast.success("Base atualizada!");
      } else {
        await api.post("/knowledge-bases", { name, description });
        toast.success("Base criada!");
      }
      onSaved(); onClose();
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{base ? "Editar base" : "Nova base de conhecimento"}</DialogTitle>
      <DialogContent>
        <TextField label="Nome da base *" fullWidth variant="outlined" size="small"
          value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: 12 }} />
        <TextField label="Descrição (opcional)" fullWidth variant="outlined" size="small"
          multiline rows={3} value={description} onChange={e => setDescription(e.target.value)}
          placeholder="Descreva o conteúdo desta base para ajudar a IA a entender quando usá-la..." />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
          {saving ? <CircularProgress size={20} /> : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Modal adicionar item ─────────────────────────────────────────────────────
function AddItemModal({ open, baseId, onClose, onSaved }) {
  const [type, setType] = useState("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  // Para planilhas
  const [sheets, setSheets] = useState([]);
  const [selectedSheetId, setSelectedSheetId] = useState("");
  const [sheetsLoading, setSheetsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setType("text"); setTitle(""); setContent("");
      setUrl(""); setFile(null); setSelectedSheetId("");
    }
  }, [open]);

  useEffect(() => {
    if (type === "spreadsheet" && sheets.length === 0) {
      setSheetsLoading(true);
      api.get("/google-sheets/status")
        .then(({ data }) => setSheets(Array.isArray(data.sheets) ? data.sheets : []))
        .catch(() => {})
        .finally(() => setSheetsLoading(false));
    }
  }, [type]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("type", type);
      if (title) formData.append("title", title);

      if (type === "text") {
        formData.append("content", content);
      } else if (type === "link") {
        formData.append("url", url);
      } else if (type === "spreadsheet") {
        const sheet = sheets.find(s => String(s.id) === String(selectedSheetId));
        if (!sheet) { toast.error("Selecione uma planilha."); setSaving(false); return; }
        formData.append("url", sheet.spreadsheetId);
        formData.append("content", JSON.stringify({ tokenId: sheet.tokenId, sheetName: sheet.sheetName }));
        if (!title) formData.set("title", sheet.title);
      } else if (file) {
        formData.append("file", file);
      }

      await api.post(`/knowledge-bases/${baseId}/items`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Item adicionado!");
      onSaved(); onClose();
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar item</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined" size="small" style={{ marginBottom: 12 }}>
          <InputLabel>Tipo</InputLabel>
          <Select value={type} onChange={e => setType(e.target.value)} label="Tipo">
            <MenuItem value="text">Texto</MenuItem>
            <MenuItem value="link">Link (URL)</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="image">Imagem</MenuItem>
            <MenuItem value="spreadsheet">Planilha Google Sheets</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Título" fullWidth variant="outlined" size="small"
          value={title} onChange={e => setTitle(e.target.value)}
          style={{ marginBottom: 12 }}
          placeholder={type === "spreadsheet" ? "Deixe vazio para usar o nome da planilha" : ""} />

        {type === "text" && (
          <TextField label="Conteúdo *" fullWidth variant="outlined" size="small"
            multiline rows={6} value={content} onChange={e => setContent(e.target.value)}
            placeholder="Digite o texto que a IA poderá usar como referência..." />
        )}
        {type === "link" && (
          <TextField label="URL *" fullWidth variant="outlined" size="small"
            value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
        )}
        {(type === "pdf" || type === "image") && (
          <Button variant="outlined" component="label" fullWidth startIcon={<AttachFileIcon />}>
            {file ? file.name : `Selecionar ${type === "pdf" ? "PDF" : "imagem"}`}
            <input type="file" hidden
              accept={type === "pdf" ? "application/pdf" : "image/*"}
              onChange={e => setFile(e.target.files?.[0] || null)} />
          </Button>
        )}
        {type === "spreadsheet" && (
          sheetsLoading ? (
            <Box display="flex" justifyContent="center" py={2}><CircularProgress size={24} /></Box>
          ) : sheets.length === 0 ? (
            <Box style={{ background: "#f0f7ff", borderRadius: 8, padding: 16 }}>
              <Typography style={{ fontSize: 13, color: "#1a73e8", marginBottom: 6 }}>
                Nenhuma planilha conectada. Conecte uma em <strong>Controle → Planilhas</strong>.
              </Typography>
            </Box>
          ) : (
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Planilha *</InputLabel>
              <Select value={selectedSheetId}
                onChange={e => setSelectedSheetId(e.target.value)} label="Planilha *">
                {sheets.map(s => (
                  <MenuItem key={s.id} value={String(s.id)}>
                    {s.title} {s.sheetName ? `— aba: ${s.sheetName}` : ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
          {saving ? <CircularProgress size={20} /> : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Modal editar item ────────────────────────────────────────────────────────
function EditItemModal({ open, item, baseId, onClose, onSaved }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setContent(item.content || "");
      setUrl(item.url || "");
      setFile(null);
    }
  }, [item, open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (title !== item.title) formData.append("title", title);
      if (item.type === "text") formData.append("content", content);
      if (item.type === "link") formData.append("url", url);
      if (item.type === "spreadsheet") formData.append("url", url);
      if (file) formData.append("file", file);

      await api.put(`/knowledge-bases/${baseId}/items/${item.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Item atualizado!");
      onSaved();
      onClose();
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar item — {TYPE_LABELS[item.type] || item.type}</DialogTitle>
      <DialogContent>
        <TextField label="Título" fullWidth variant="outlined" size="small"
          value={title} onChange={e => setTitle(e.target.value)}
          style={{ marginBottom: 12 }} />

        {item.type === "text" && (
          <TextField label="Conteúdo *" fullWidth variant="outlined" size="small"
            multiline rows={8} value={content} onChange={e => setContent(e.target.value)}
            placeholder="Digite o texto que a IA poderá usar como referência..." />
        )}
        {item.type === "link" && (
          <TextField label="URL *" fullWidth variant="outlined" size="small"
            value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
        )}
        {(item.type === "pdf" || item.type === "image") && (
          <>
            <Typography style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>
              Arquivo atual: <strong>{item.filePath || "—"}</strong>
            </Typography>
            <Button variant="outlined" component="label" fullWidth startIcon={<AttachFileIcon />}>
              {file ? file.name : `Substituir ${item.type === "pdf" ? "PDF" : "imagem"}`}
              <input type="file" hidden
                accept={item.type === "pdf" ? "application/pdf" : "image/*"}
                onChange={e => setFile(e.target.files?.[0] || null)} />
            </Button>
          </>
        )}
        {item.type === "spreadsheet" && (
          <Box style={{ background: "#f0f7ff", borderRadius: 8, padding: 12 }}>
            <Typography style={{ fontSize: 13, color: "#1a73e8" }}>
              Planilha vinculada. Para trocar, remova este item e adicione outro.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
          {saving ? <CircularProgress size={20} /> : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Página principal ─────────────────────────────────────────────────────────
export default function BasesConhecimento() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  const [expanded, setExpanded] = useState({});
  const [baseModal, setBaseModal] = useState({ open: false, base: null });
  const [itemModal, setItemModal] = useState({ open: false, baseId: null });
  const [editItemModal, setEditItemModal] = useState({ open: false, item: null, baseId: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, type: null, id: null, baseId: null });

  const fetchBases = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/knowledge-bases");
      setBases(data);
    } catch (err) { toastError(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchBases(); }, []);

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handleDeleteConfirm = async () => {
    const { type, id, baseId } = deleteModal;
    try {
      if (type === "base") {
        await api.delete(`/knowledge-bases/${id}`);
        toast.success("Base removida!");
      } else {
        await api.delete(`/knowledge-bases/${baseId}/items/${id}`);
        toast.success("Item removido!");
      }
      fetchBases();
    } catch (err) { toastError(err); }
    setDeleteModal({ open: false, type: null, id: null, baseId: null });
  };

  const filtered = bases.filter(b =>
    !searchParam || b.name?.toLowerCase().includes(searchParam.toLowerCase())
  );

  const getItemPreview = (item) => {
    if (item.type === "text") return item.content?.slice(0, 80) + (item.content?.length > 80 ? "…" : "");
    if (item.type === "spreadsheet") {
      try {
        const meta = JSON.parse(item.content || "{}");
        return `Aba: ${meta.sheetName || "—"} | ID: ${item.url?.substring(0, 20)}…`;
      } catch { return item.url || "—"; }
    }
    return item.url || item.filePath || "—";
  };

  return (
    <div className={classes.root}>
      {/* Header */}
      <Box className={classes.header}>
        <Box className={classes.headerLeft}>
          <Box>
            <Typography className={classes.headerTitle}>Bases de Conhecimento</Typography>
            <Typography className={classes.headerSubtitle}>
              {bases.length} base(s) cadastrada(s)
            </Typography>
          </Box>
        </Box>
        <Box className={classes.headerRight}>
          <TextField
            size="small" variant="outlined" placeholder="Pesquisa"
            value={searchParam} onChange={e => setSearchParam(e.target.value)}
            className={classes.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" startIcon={<AddIcon />}
            className={classes.addButton}
            onClick={() => setBaseModal({ open: true, base: null })}>
            Nova base
          </Button>
        </Box>
      </Box>

      {/* Tabela */}
      <Box className={classes.content}>
        <Box className={classes.tableWrapper}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell style={{ width: 40 }} />
                <TableCell>Nome</TableCell>
                <TableCell align="center">Itens</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" style={{ padding: 32 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box className={classes.emptyState}>
                      <LibraryBooksIcon style={{ fontSize: 48, marginBottom: 8, opacity: 0.3 }} />
                      <Typography style={{ fontSize: 14 }}>Nenhuma base encontrada</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(base => (
                  <React.Fragment key={base.id}>
                    <TableRow className={classes.baseRow} onClick={() => toggleExpand(base.id)}>
                      <TableCell style={{ width: 40, color: "#94a3b8" }}>
                        {expanded[base.id] ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontWeight: 600, fontSize: 14, color: "#1e40af" }}>
                          {base.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={`${base.items?.length || 0} itens`}
                          size="small" className={classes.typeChip}
                          style={{ background: "#f1f5f9" }} />
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: 13, color: "#64748b" }}>
                          {base.description || "—"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" style={{ gap: 4 }}>
                          <Tooltip title="Editar base">
                            <IconButton size="small" onClick={e => {
                              e.stopPropagation();
                              setBaseModal({ open: true, base });
                            }}>
                              <EditIcon style={{ fontSize: 18, color: "#1976d2" }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir base">
                            <IconButton size="small" onClick={e => {
                              e.stopPropagation();
                              setDeleteModal({ open: true, type: "base", id: base.id });
                            }}>
                              <DeleteOutlineIcon style={{ fontSize: 18, color: "#ef4444" }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>

                    {/* Linha expandida com itens */}
                    <TableRow className={classes.itemsRow}>
                      <TableCell colSpan={5} style={{ padding: 0, borderBottom: expanded[base.id] ? "1px solid #e2e8f0" : "none" }}>
                        <Collapse in={!!expanded[base.id]}>
                          <Box className={classes.itemsInner}>
                            <Box display="flex" justifyContent="flex-end" style={{ marginBottom: 8, marginTop: 12 }}>
                              <Button size="small" variant="outlined" color="primary"
                                startIcon={<AddIcon />}
                                onClick={() => setItemModal({ open: true, baseId: base.id })}>
                                Adicionar item
                              </Button>
                            </Box>
                            {!base.items?.length ? (
                              <Typography style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: "12px 0" }}>
                                Nenhum item. Clique em "Adicionar item" para começar.
                              </Typography>
                            ) : (
                              <Table size="small" className={classes.itemTable}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Título</TableCell>
                                    <TableCell>Conteúdo / Referência</TableCell>
                                    <TableCell align="right">Ação</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {base.items.map(item => (
                                    <TableRow key={item.id}>
                                      <TableCell>
                                        <Chip
                                          icon={item.type === "spreadsheet"
                                            ? <TableChartIcon style={{ fontSize: 14 }} />
                                            : item.type === "link"
                                              ? <LinkIcon style={{ fontSize: 14 }} />
                                              : item.type === "text"
                                                ? <TextFieldsIcon style={{ fontSize: 14 }} />
                                                : <AttachFileIcon style={{ fontSize: 14 }} />}
                                          label={TYPE_LABELS[item.type] || item.type}
                                          size="small"
                                          className={classes.typeChip}
                                          style={{
                                            background: TYPE_COLORS[item.type] || "#f1f5f9",
                                            color: TYPE_TEXT_COLORS[item.type] || "#334155"
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>{item.title || "—"}</TableCell>
                                      <TableCell style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {getItemPreview(item)}
                                      </TableCell>
                                      <TableCell align="right">
                                        <Box display="flex" justifyContent="flex-end" style={{ gap: 4 }}>
                                          <Tooltip title="Editar item">
                                            <IconButton size="small" onClick={() =>
                                              setEditItemModal({ open: true, item, baseId: base.id })}>
                                              <EditIcon style={{ fontSize: 18, color: "#1976d2" }} />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Remover item">
                                            <IconButton size="small" onClick={() =>
                                              setDeleteModal({ open: true, type: "item", id: item.id, baseId: base.id })}>
                                              <DeleteOutlineIcon style={{ fontSize: 18, color: "#ef4444" }} />
                                            </IconButton>
                                          </Tooltip>
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>

      <BaseModal open={baseModal.open} base={baseModal.base}
        onClose={() => setBaseModal({ open: false, base: null })} onSaved={fetchBases} />
      <AddItemModal open={itemModal.open} baseId={itemModal.baseId}
        onClose={() => setItemModal({ open: false, baseId: null })} onSaved={fetchBases} />
      <EditItemModal
        open={editItemModal.open}
        item={editItemModal.item}
        baseId={editItemModal.baseId}
        onClose={() => setEditItemModal({ open: false, item: null, baseId: null })}
        onSaved={fetchBases}
      />
      <ConfirmationModal
        title={deleteModal.type === "base" ? "Excluir base de conhecimento" : "Remover item"}
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, type: null, id: null, baseId: null })}
        onConfirm={handleDeleteConfirm}>
        {deleteModal.type === "base"
          ? "Todos os itens desta base serão excluídos permanentemente."
          : "O item será removido permanentemente desta base."}
      </ConfirmationModal>
    </div>
  );
}
