import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box, Typography, Button, IconButton, TextField, InputAdornment,
  Table, TableHead, TableRow, TableCell, TableBody,
  Chip, CircularProgress, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Tabs, Tab,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import TableChartIcon from "@material-ui/icons/TableChart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { toast } from "react-toastify";
import api from "../../services/api";
import toastError from "../../errors/toastError";

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
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  tableHead: {
    backgroundColor: "var(--sidebar-color, #1e293b)",
    "& th": {
      color: "#cbd5e1", fontWeight: 600, fontSize: "0.8rem",
      textTransform: "uppercase", letterSpacing: "0.05em",
      borderBottom: "none", padding: "14px 16px",
    },
  },
  tableBody: {
    "& td": {
      padding: "12px 16px", fontSize: "0.875rem",
      color: "#334155", borderBottom: "1px solid #f1f5f9",
    },
    "& tr:hover": { backgroundColor: "#f8fafc" },
  },
  emptyState: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "48px 0", color: "#94a3b8",
  },
  driveItem: {
    display: "flex", alignItems: "center", padding: "10px 16px",
    borderRadius: 8, cursor: "pointer",
    "&:hover": { background: "#f5f5f5" },
  },
  previewTable: {
    fontSize: 12,
    "& th": { background: "#f5f5f5", fontWeight: 600, padding: "6px 10px" },
    "& td": { padding: "5px 10px" },
  },
}));

export default function Planilhas() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [status, setStatus] = useState({ connected: false, accounts: [], sheets: [] });
  const [loading, setLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");

  // Modais
  const [addMode, setAddMode] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editDialog, setEditDialog] = useState(null);
  const [detailDialog, setDetailDialog] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Formulários
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [saving, setSaving] = useState(false);

  // Drive
  const [driveSheets, setDriveSheets] = useState([]);
  const [driveLoading, setDriveLoading] = useState(false);

  // Detail/Preview
  const [detailTab, setDetailTab] = useState(0);
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [sheetTabs, setSheetTabs] = useState([]);

  // File
  const fileInputRef = useRef(null);
  const [importFile, setImportFile] = useState(null);
  const [importFileName, setImportFileName] = useState("");
  const [importTitle, setImportTitle] = useState("");

  const isLocal = (sheet) => sheet?.spreadsheetId?.startsWith("local_");

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/google-sheets/status");
      setStatus({
        connected: data.connected || false,
        accounts: Array.isArray(data.accounts) ? data.accounts : [],
        sheets: Array.isArray(data.sheets) ? data.sheets : [],
      });
    } catch { } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchStatus();
      if (location.search.includes("sheets-success=true")) {
        toast.success("Conta Google conectada com sucesso!");
        history.replace("/planilhas");
      } else if (location.search.includes("sheets-error=")) {
        toast.error("Erro ao conectar conta Google. Tente novamente.");
        history.replace("/planilhas");
      }
    };
    init();
  }, []);

  const filtered = status.sheets.filter(s =>
    !searchParam || s.title?.toLowerCase().includes(searchParam.toLowerCase())
  );

  const handleConnectGoogle = async () => {
    try {
      const { data } = await api.get("/google-sheets/auth-url");
      window.location.href = data.url;
    } catch (err) { toastError(err); }
  };

  const handleDisconnectAccount = async (accountId) => {
    try {
      await api.delete(`/google-sheets/accounts/${accountId}`);
      setStatus(prev => ({
        ...prev,
        accounts: prev.accounts.filter(a => a.id !== accountId),
        sheets: prev.sheets.filter(s => s.tokenId !== accountId),
      }));
      toast.success("Conta desconectada.");
    } catch (err) { toastError(err); }
  };

  const openChoose = () => {
    setNewTitle(""); setNewUrl(""); setImportFile(null);
    setImportFileName(""); setImportTitle("");
    setAddMode("choose");
  };

  const openCreate = (tokenId) => { setSelectedAccount(tokenId); setNewTitle(""); setAddMode("create"); };
  const openAddUrl = (tokenId) => { setSelectedAccount(tokenId); setNewUrl(""); setNewTitle(""); setAddMode("url"); };
  const openImportFile = () => setAddMode("import-file");

  const openImportDrive = async (tokenId) => {
    setSelectedAccount(tokenId);
    setAddMode("import-drive");
    setDriveLoading(true);
    try {
      const { data } = await api.get(`/google-sheets/drive-sheets?tokenId=${tokenId}`);
      setDriveSheets(data);
    } catch (err) { toastError(err); } finally { setDriveLoading(false); }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    try {
      const { data } = await api.post("/google-sheets/create", { title: newTitle, tokenId: selectedAccount });
      setStatus(prev => ({ ...prev, sheets: [...prev.sheets, data.sheet] }));
      setAddMode(null);
      toast.success(`Planilha "${newTitle}" criada!`);
      window.open(data.spreadsheetUrl, "_blank");
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  const handleAddByUrl = async () => {
    if (!newUrl.trim()) return;
    setSaving(true);
    try {
      const { data } = await api.post("/google-sheets/sheets", {
        spreadsheetUrl: newUrl, title: newTitle || undefined, tokenId: selectedAccount,
      });
      setStatus(prev => ({ ...prev, sheets: [...prev.sheets, data] }));
      setAddMode(null);
      toast.success("Planilha adicionada!");
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  const handleImportFromDrive = async (ds) => {
    setSaving(true);
    try {
      const { data } = await api.post("/google-sheets/sheets", {
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${ds.id}`,
        title: ds.name, tokenId: selectedAccount,
      });
      setStatus(prev => ({ ...prev, sheets: [...prev.sheets, data] }));
      setAddMode(null);
      toast.success(`"${ds.name}" importada!`);
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImportFile(f); setImportFileName(f.name);
    setImportTitle(f.name.replace(/\.[^.]+$/, ""));
  };

  const handleImportFile = async () => {
    if (!importFile) return;
    setSaving(true);
    try {
      const form = new FormData();
      form.append("file", importFile);
      form.append("title", importTitle || importFileName);
      const { data } = await api.post("/google-sheets/import-file", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(prev => ({ ...prev, sheets: [...prev.sheets, data] }));
      setAddMode(null);
      toast.success("Arquivo importado!");
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/google-sheets/sheets/${confirmDelete}`);
      setStatus(prev => ({ ...prev, sheets: prev.sheets.filter(s => s.id !== confirmDelete) }));
      setConfirmDelete(null);
      toast.success("Planilha removida.");
    } catch (err) { toastError(err); }
  };

  const handleSaveEdit = async () => {
    if (!editDialog) return;
    setSaving(true);
    try {
      const { data } = await api.put(`/google-sheets/sheets/${editDialog.id}`, {
        title: editDialog.title, sheetName: editDialog.sheetName,
      });
      setStatus(prev => ({ ...prev, sheets: prev.sheets.map(s => s.id === data.id ? data : s) }));
      setEditDialog(null);
      toast.success("Atualizado!");
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  const openDetail = async (sheet) => {
    setDetailDialog(sheet); setDetailTab(0); setPreviewData(null); setSheetTabs([]);
    if (isLocal(sheet)) return;
    try {
      setPreviewLoading(true);
      const [tabsRes, previewRes] = await Promise.all([
        api.get(`/google-sheets/sheets/${sheet.id}/tabs`),
        api.get(`/google-sheets/sheets/${sheet.id}/preview`),
      ]);
      setSheetTabs(tabsRes.data);
      setPreviewData(previewRes.data);
    } catch { } finally { setPreviewLoading(false); }
  };

  const loadPreviewTab = async (tabTitle) => {
    if (!detailDialog) return;
    setPreviewLoading(true);
    try {
      const { data } = await api.get(`/google-sheets/sheets/${detailDialog.id}/preview?tab=${encodeURIComponent(tabTitle)}`);
      setPreviewData(data);
    } catch { } finally { setPreviewLoading(false); }
  };

  const getAccountEmail = (tokenId) =>
    status.accounts.find(a => a.id === tokenId)?.email || "—";

  return (
    <Box className={classes.root}>
      {/* Header */}
      <Box className={classes.header}>
        <Box className={classes.headerLeft}>
          <Box>
            <Typography className={classes.headerTitle}>Planilhas</Typography>
            <Typography className={classes.headerSubtitle}>
              {status.sheets.length} planilha(s) cadastrada(s)
            </Typography>
          </Box>
        </Box>
        <Box className={classes.headerRight}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Pesquisa"
            value={searchParam}
            onChange={e => setSearchParam(e.target.value)}
            className={classes.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#94a3b8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.addButton}
            onClick={openChoose}
          >
            Nova Planilha
          </Button>
        </Box>
      </Box>

      {/* Contas Google conectadas */}
      {status.accounts.length > 0 && (
        <Box style={{ padding: "10px 24px 0", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Typography style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>CONTAS GOOGLE:</Typography>
          {status.accounts.map(acc => (
            <Chip
              key={acc.id}
              icon={<AccountCircleIcon style={{ fontSize: 14 }} />}
              label={acc.email}
              size="small"
              style={{ background: "#e8f5e9", color: "#2e7d32", fontSize: 11 }}
            />
          ))}
        </Box>
      )}

      {/* Tabela */}
      <Box className={classes.content}>
        <Box className={classes.tableWrapper}>
          <Table size="small">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="center">Aba</TableCell>
                <TableCell align="center">Conta Google</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
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
                      <TableChartIcon style={{ fontSize: 48, marginBottom: 8, opacity: 0.3 }} />
                      <Typography style={{ fontSize: 14 }}>Nenhuma planilha encontrada</Typography>
                      <Typography style={{ fontSize: 12, marginTop: 4 }}>
                        Clique em "Nova Planilha" para adicionar
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(sheet => (
                  <TableRow key={sheet.id} style={{ cursor: "pointer" }}>
                    <TableCell>
                      <Typography style={{ fontWeight: 600, fontSize: 14, color: "#1e40af" }}
                        onClick={() => openDetail(sheet)}>
                        {sheet.title}
                      </Typography>
                      <Typography style={{ fontSize: 11, color: "#94a3b8" }}>
                        ID: {sheet.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {isLocal(sheet) ? (
                        <Chip size="small" label="Arquivo local" style={{ background: "#fff3e0", fontSize: 11 }} />
                      ) : (
                        <Chip size="small" label="Google Sheets" style={{ background: "#e8f5e9", color: "#2e7d32", fontSize: 11 }} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Typography style={{ fontSize: 13 }}>{sheet.sheetName || "—"}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography style={{ fontSize: 12, color: "#64748b" }}>
                        {sheet.tokenId ? getAccountEmail(sheet.tokenId) : "—"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" style={{ gap: 4 }}>
                        {!isLocal(sheet) && (
                          <Tooltip title="Ver dados">
                            <IconButton size="small" onClick={() => openDetail(sheet)}>
                              <TableChartIcon style={{ fontSize: 18, color: "#64748b" }} />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Editar">
                          <IconButton size="small" onClick={() => setEditDialog({ ...sheet })}>
                            <EditIcon style={{ fontSize: 18, color: "#1976d2" }} />
                          </IconButton>
                        </Tooltip>
                        {!isLocal(sheet) && (
                          <Tooltip title="Abrir no Google">
                            <IconButton size="small" component="a"
                              href={`https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}`}
                              target="_blank">
                              <OpenInNewIcon style={{ fontSize: 18, color: "#64748b" }} />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Remover">
                          <IconButton size="small" onClick={() => setConfirmDelete(sheet.id)}>
                            <DeleteIcon style={{ fontSize: 18, color: "#ef4444" }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>

      {/* ── Dialog: escolher modo ── */}
      <Dialog open={addMode === "choose"} onClose={() => setAddMode(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Nova Planilha</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 8 }}>
          {status.accounts.length > 0 && (
            <>
              {status.accounts.length === 1 ? (
                <>
                  <Box style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
                    onClick={() => openCreate(status.accounts[0].id)}>
                    <Typography style={{ fontSize: 28 }}>✨</Typography>
                    <Box><Typography style={{ fontWeight: 700 }}>Criar nova planilha</Typography>
                      <Typography style={{ fontSize: 12, color: "#666" }}>Cria em branco no Google Drive</Typography></Box>
                  </Box>
                  <Box style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
                    onClick={() => openImportDrive(status.accounts[0].id)}>
                    <Typography style={{ fontSize: 28 }}>📂</Typography>
                    <Box><Typography style={{ fontWeight: 700 }}>Importar do Google Drive</Typography>
                      <Typography style={{ fontSize: 12, color: "#666" }}>Busca planilhas da sua conta</Typography></Box>
                  </Box>
                  <Box style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
                    onClick={() => openAddUrl(status.accounts[0].id)}>
                    <Typography style={{ fontSize: 28 }}>🔗</Typography>
                    <Box><Typography style={{ fontWeight: 700 }}>Colar URL da planilha</Typography>
                      <Typography style={{ fontSize: 12, color: "#666" }}>Cole o link de uma planilha</Typography></Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
                    onClick={() => setAddMode("choose-account-create")}>
                    <Typography style={{ fontSize: 28 }}>✨</Typography>
                    <Box><Typography style={{ fontWeight: 700 }}>Criar nova planilha</Typography>
                      <Typography style={{ fontSize: 12, color: "#666" }}>Cria em branco no Google Drive</Typography></Box>
                  </Box>
                  <Box style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
                    onClick={() => setAddMode("choose-account-drive")}>
                    <Typography style={{ fontSize: 28 }}>📂</Typography>
                    <Box><Typography style={{ fontWeight: 700 }}>Importar do Google Drive</Typography>
                      <Typography style={{ fontSize: 12, color: "#666" }}>Busca planilhas da sua conta</Typography></Box>
                  </Box>
                  <Box style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
                    onClick={() => setAddMode("choose-account-url")}>
                    <Typography style={{ fontSize: 28 }}>🔗</Typography>
                    <Box><Typography style={{ fontWeight: 700 }}>Colar URL da planilha</Typography>
                      <Typography style={{ fontSize: 12, color: "#666" }}>Cole o link de uma planilha</Typography></Box>
                  </Box>
                </>
              )}
            </>
          )}
          <Box style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
            onClick={openImportFile}>
            <Typography style={{ fontSize: 28 }}>📁</Typography>
            <Box><Typography style={{ fontWeight: 700 }}>Importar arquivo CSV / XLSX</Typography>
              <Typography style={{ fontSize: 12, color: "#666" }}>Sem precisar de conta Google</Typography></Box>
          </Box>
          {status.accounts.length === 0 && (
            <Box style={{ background: "#f0f7ff", borderRadius: 10, padding: "14px 18px" }}>
              <Typography style={{ fontSize: 13, color: "#1a73e8", fontWeight: 600, marginBottom: 6 }}>
                Conecte uma conta Google para mais opções
              </Typography>
              <Button variant="outlined" color="primary" size="small"
                onClick={() => { setAddMode(null); history.push("/integracao"); }}>
                Ir para Integrações
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions><Button onClick={() => setAddMode(null)}>Cancelar</Button></DialogActions>
      </Dialog>

      {/* ── Escolher conta ── */}
      {["choose-account-create", "choose-account-drive", "choose-account-url"].map(mode => (
        <Dialog key={mode} open={addMode === mode} onClose={() => setAddMode("choose")} maxWidth="xs" fullWidth>
          <DialogTitle>Qual conta usar?</DialogTitle>
          <DialogContent style={{ padding: 0 }}>
            {status.accounts.map(acc => (
              <Box key={acc.id} className={classes.driveItem}
                onClick={() => {
                  if (mode === "choose-account-create") openCreate(acc.id);
                  else if (mode === "choose-account-drive") openImportDrive(acc.id);
                  else openAddUrl(acc.id);
                }}>
                <AccountCircleIcon style={{ marginRight: 12, color: "#1a73e8" }} />
                <Typography>{acc.email}</Typography>
              </Box>
            ))}
          </DialogContent>
          <DialogActions><Button onClick={() => setAddMode("choose")}>Voltar</Button></DialogActions>
        </Dialog>
      ))}

      {/* ── Criar nova ── */}
      <Dialog open={addMode === "create"} onClose={() => setAddMode(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Nova planilha</DialogTitle>
        <DialogContent>
          <TextField autoFocus label="Nome da planilha" fullWidth value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleCreate()} margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddMode(null)}>Cancelar</Button>
          <Button variant="contained" color="primary" disabled={!newTitle.trim() || saving} onClick={handleCreate}>
            {saving ? <CircularProgress size={18} /> : "Criar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Colar URL ── */}
      <Dialog open={addMode === "url"} onClose={() => setAddMode(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar por URL</DialogTitle>
        <DialogContent>
          <TextField autoFocus label="URL ou ID da planilha" fullWidth value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..." margin="dense" />
          <TextField label="Nome (opcional)" fullWidth value={newTitle}
            onChange={e => setNewTitle(e.target.value)} margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddMode(null)}>Cancelar</Button>
          <Button variant="contained" color="primary" disabled={!newUrl.trim() || saving} onClick={handleAddByUrl}>
            {saving ? <CircularProgress size={18} /> : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Importar arquivo ── */}
      <Dialog open={addMode === "import-file"} onClose={() => setAddMode(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Importar arquivo</DialogTitle>
        <DialogContent>
          <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls,.ods"
            style={{ display: "none" }} onChange={handleFileSelect} />
          <Box style={{ border: "2px dashed #ccc", borderRadius: 10, padding: 24, textAlign: "center", cursor: "pointer", marginBottom: 12 }}
            onClick={() => fileInputRef.current?.click()}>
            {importFileName
              ? <Typography style={{ fontWeight: 600 }}>{importFileName}</Typography>
              : <>
                <Typography style={{ fontSize: 32, marginBottom: 8 }}>📁</Typography>
                <Typography>Clique para selecionar</Typography>
                <Typography style={{ fontSize: 12, color: "#aaa" }}>CSV, XLSX, XLS, ODS — até 20MB</Typography>
              </>}
          </Box>
          {importFile && (
            <TextField label="Nome da planilha" fullWidth value={importTitle}
              onChange={e => setImportTitle(e.target.value)} margin="dense" />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddMode(null)}>Cancelar</Button>
          <Button variant="contained" color="primary" disabled={!importFile || saving} onClick={handleImportFile}>
            {saving ? <CircularProgress size={18} /> : "Importar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Importar do Drive ── */}
      <Dialog open={addMode === "import-drive"} onClose={() => setAddMode(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Importar do Google Drive</DialogTitle>
        <DialogContent style={{ padding: 0 }}>
          {driveLoading
            ? <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
            : driveSheets.length === 0
              ? <Typography style={{ padding: 24, color: "#888" }}>Nenhuma planilha encontrada no Drive.</Typography>
              : driveSheets.map(ds => {
                const already = status.sheets.some(s => s.spreadsheetId === ds.id);
                return (
                  <Box key={ds.id} className={classes.driveItem}
                    style={{ opacity: already ? 0.5 : 1, cursor: already ? "default" : "pointer" }}
                    onClick={() => !already && !saving && handleImportFromDrive(ds)}>
                    <TableChartIcon style={{ color: "#388e3c", marginRight: 12 }} />
                    <Box flex={1}>
                      <Typography style={{ fontWeight: 600, fontSize: 14 }}>{ds.name}</Typography>
                      <Typography style={{ fontSize: 11, color: "#888" }}>
                        {ds.modifiedTime ? new Date(ds.modifiedTime).toLocaleDateString("pt-BR") : ""}
                      </Typography>
                    </Box>
                    {already
                      ? <Chip size="small" label="Adicionada" style={{ background: "#e8f5e9" }} />
                      : <Button size="small" variant="outlined" color="primary" disabled={saving}>Importar</Button>}
                  </Box>
                );
              })}
        </DialogContent>
        <DialogActions><Button onClick={() => setAddMode(null)}>Fechar</Button></DialogActions>
      </Dialog>

      {/* ── Editar ── */}
      <Dialog open={!!editDialog} onClose={() => setEditDialog(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Editar planilha</DialogTitle>
        <DialogContent>
          <TextField label="Nome" fullWidth value={editDialog?.title || ""}
            onChange={e => setEditDialog(p => ({ ...p, title: e.target.value }))} margin="dense" />
          <TextField label="Aba padrão" fullWidth value={editDialog?.sheetName || ""}
            onChange={e => setEditDialog(p => ({ ...p, sheetName: e.target.value }))}
            margin="dense" helperText="Nome exato da aba no Google Sheets" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(null)}>Cancelar</Button>
          <Button variant="contained" color="primary" disabled={saving} onClick={handleSaveEdit}>
            {saving ? <CircularProgress size={18} /> : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Detalhe / Prévia ── */}
      <Dialog open={!!detailDialog} onClose={() => setDetailDialog(null)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <span>{detailDialog?.title}</span>
            {!isLocal(detailDialog) && (
              <IconButton size="small" component="a"
                href={`https://docs.google.com/spreadsheets/d/${detailDialog?.spreadsheetId}`}
                target="_blank">
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
        <DialogContent style={{ padding: 0 }}>
          {sheetTabs.length > 0 && (
            <Tabs value={detailTab}
              onChange={(_, v) => { setDetailTab(v); loadPreviewTab(sheetTabs[v]?.title); }}
              variant="scrollable" scrollButtons="auto"
              style={{ borderBottom: "1px solid #eee" }}>
              {sheetTabs.map(t => <Tab key={t.id} label={t.title} style={{ fontSize: 12 }} />)}
            </Tabs>
          )}
          {previewLoading
            ? <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
            : previewData?.values?.length > 0
              ? <Box style={{ overflowX: "auto" }}>
                <Table size="small" className={classes.previewTable}>
                  <TableHead>
                    <TableRow>{previewData.values[0].map((c, i) => <TableCell key={i}>{c}</TableCell>)}</TableRow>
                  </TableHead>
                  <TableBody>
                    {previewData.values.slice(1).map((row, ri) => (
                      <TableRow key={ri}>
                        {previewData.values[0].map((_, ci) => <TableCell key={ci}>{row[ci] || ""}</TableCell>)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              : <Typography style={{ padding: 24, color: "#aaa", textAlign: "center" }}>Sem dados para prévia</Typography>}
        </DialogContent>
        <DialogActions><Button onClick={() => setDetailDialog(null)}>Fechar</Button></DialogActions>
      </Dialog>

      {/* ── Confirmar exclusão ── */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Remover planilha</DialogTitle>
        <DialogContent>
          <Typography>A planilha será desconectada. Os dados no Google Drive não serão excluídos.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancelar</Button>
          <Button variant="contained" style={{ background: "#ef4444", color: "#fff" }} onClick={handleDelete}>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
