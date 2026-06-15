import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import {
  Box, Typography, IconButton, Avatar, Chip, Divider, CircularProgress,
  List, ListItem, ListItemText, Tooltip, Button, TextField, Select,
  MenuItem, FormControl, Dialog, DialogTitle, DialogContent, DialogActions
} from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";
import FolderIcon from "@material-ui/icons/Folder";
import InboxIcon from "@material-ui/icons/Inbox";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import ReportIcon from "@material-ui/icons/Report";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CreateIcon from "@material-ui/icons/Create";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", height: "calc(100vh - 64px)", backgroundColor: "#f8fafc" },
  sidebar: { width: 220, backgroundColor: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", flexShrink: 0 },
  sidebarHeader: { padding: "16px", borderBottom: "1px solid #e2e8f0" },
  folderItem: { padding: "8px 16px", cursor: "pointer", borderRadius: 8, margin: "2px 8px", "&:hover": { backgroundColor: "#f0f4ff" } },
  folderItemActive: { backgroundColor: "#ebf4ff", color: "#4299e1", fontWeight: 700 },
  emailList: { width: 320, borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", backgroundColor: "#fff", flexShrink: 0 },
  emailListHeader: { padding: "12px 16px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" },
  emailItem: { padding: "12px 16px", borderBottom: "1px solid #f1f5f9", cursor: "pointer", "&:hover": { backgroundColor: "#f8fafc" } },
  emailItemActive: { backgroundColor: "#ebf4ff" },
  emailItemUnread: { fontWeight: 700, backgroundColor: "#fafbff" },
  emailViewer: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  emailViewerHeader: { padding: "16px 24px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff" },
  emailBody: { flex: 1, overflow: "auto", padding: "24px" },
  composeBtn: { margin: "12px", borderRadius: 24, fontWeight: 700 },
  accountSelect: { margin: "8px 16px 0" },
}));

const FOLDER_ICONS = { INBOX: <InboxIcon />, Trash: <DeleteSweepIcon />, Junk: <ReportIcon />, Spam: <ReportIcon />, Sent: <SendIcon />, Drafts: <CreateIcon /> };
const FOLDER_LABELS = { INBOX: "Caixa de Entrada", Trash: "Lixeira", "[Gmail]/Trash": "Lixeira", Junk: "Spam", Spam: "Spam", "[Gmail]/Spam": "Spam", Sent: "Enviados", "[Gmail]/Sent Mail": "Enviados", Drafts: "Rascunhos" };

export default function EmailInbox() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState("INBOX");
  const [emails, setEmails] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailBody, setEmailBody] = useState({ html: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [loadingBody, setLoadingBody] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [compose, setCompose] = useState({ to: "", subject: "", body: "" });
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccount) { loadFolders(); loadEmails(); }
  }, [selectedAccount, currentFolder, page]);

  const loadAccounts = async () => {
    try {
      const { data } = await api.get("/email-accounts");
      // Apenas contas conectadas aparecem na caixa de entrada
      const connected = data.filter(a => a.status === "CONNECTED");
      setAccounts(connected);
      if (connected.length > 0) setSelectedAccount(connected.find(a => a.isDefault) || connected[0]);
      else setSelectedAccount(null);
    } catch { toast.error("Erro ao carregar contas de email"); }
  };

  const loadFolders = async () => {
    if (!selectedAccount) return;
    try {
      const { data } = await api.get(`/email-accounts/${selectedAccount.id}/folders`);
      const important = ["INBOX", "Sent", "[Gmail]/Sent Mail", "Trash", "[Gmail]/Trash", "Spam", "Junk", "[Gmail]/Spam", "Drafts"];
      const sorted = [...data].sort((a, b) => {
        const ai = important.indexOf(a.path), bi = important.indexOf(b.path);
        if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
        if (ai === -1) return 1; if (bi === -1) return -1;
        return ai - bi;
      });
      setFolders(sorted);
    } catch {}
  };

  const loadEmails = async () => {
    if (!selectedAccount) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/email-accounts/${selectedAccount.id}/emails`, { params: { folder: currentFolder, page, limit: 20 } });
      setEmails(data.emails || []);
      setTotal(data.total || 0);
    } catch (e) { toast.error("Erro ao carregar emails"); }
    setLoading(false);
  };

  const openEmail = async (email) => {
    setSelectedEmail(email);
    setEmailBody({ html: "", text: "" });
    setLoadingBody(true);
    try {
      const { data } = await api.get(`/email-accounts/${selectedAccount.id}/emails/${email.uid}`, { params: { folder: currentFolder } });
      setEmailBody(data);
      setEmails(prev => prev.map(e => e.uid === email.uid ? { ...e, seen: true } : e));
    } catch { toast.error("Erro ao abrir email"); }
    setLoadingBody(false);
  };

  const handleDelete = async (email) => {
    try {
      await api.delete(`/email-accounts/${selectedAccount.id}/emails/${email.uid}`, { params: { folder: currentFolder } });
      toast.success("Email excluído!");
      setEmails(prev => prev.filter(e => e.uid !== email.uid));
      if (selectedEmail?.uid === email.uid) setSelectedEmail(null);
    } catch { toast.error("Erro ao excluir email"); }
  };

  const handleMoveToTrash = async (email) => {
    const trashFolder = folders.find(f => f.path.toLowerCase().includes("trash") || f.path.toLowerCase().includes("lixeira"))?.path || "Trash";
    try {
      await api.put(`/email-accounts/${selectedAccount.id}/emails/${email.uid}/move`, { from: currentFolder, to: trashFolder });
      toast.success("Movido para lixeira!");
      setEmails(prev => prev.filter(e => e.uid !== email.uid));
      if (selectedEmail?.uid === email.uid) setSelectedEmail(null);
    } catch { toast.error("Erro ao mover email"); }
  };

  const handleMoveToSpam = async (email) => {
    const spamFolder = folders.find(f => f.path.toLowerCase().includes("spam") || f.path.toLowerCase().includes("junk"))?.path || "Spam";
    try {
      await api.put(`/email-accounts/${selectedAccount.id}/emails/${email.uid}/move`, { from: currentFolder, to: spamFolder });
      toast.success("Marcado como spam!");
      setEmails(prev => prev.filter(e => e.uid !== email.uid));
      if (selectedEmail?.uid === email.uid) setSelectedEmail(null);
    } catch { toast.error("Erro ao marcar como spam"); }
  };

  const handleSend = async () => {
    if (!compose.to || !compose.subject) { toast.error("Preencha destinatário e assunto"); return; }
    try {
      const formData = new FormData();
      formData.append("to", compose.to);
      formData.append("subject", compose.subject);
      formData.append("html", compose.body);
      if (replyMode && selectedEmail) formData.append("replyTo", String(selectedEmail.uid));
      attachments.forEach(file => formData.append("attachments", file));

      // Não definir Content-Type manualmente — axios adiciona o boundary correto automaticamente
      await api.post(`/email-accounts/${selectedAccount.id}/emails/send`, formData);
      toast.success("Email enviado!");
      setComposeOpen(false);
      setCompose({ to: "", subject: "", body: "" });
      setAttachments([]);
      setReplyMode(false);
    } catch { toast.error("Erro ao enviar email"); }
  };

  const openReply = () => {
    if (!selectedEmail) return;
    setCompose({ to: selectedEmail.from, subject: `Re: ${selectedEmail.subject}`, body: `<br/><br/><hr/><p><b>De:</b> ${selectedEmail.from}</p>` });
    setAttachments([]);
    setReplyMode(true);
    setComposeOpen(true);
  };

  const getFolderLabel = (path) => FOLDER_LABELS[path] || path.split("/").pop();

  const totalPages = Math.ceil(total / 20);

  return (
    <Box className={classes.root}>
      {/* Sidebar */}
      <Box className={classes.sidebar}>
        <Box className={classes.sidebarHeader}>
          <Typography style={{ fontWeight: 700, fontSize: 16, color: "#1a202c" }}>Email</Typography>
          {accounts.length > 1 && (
            <FormControl size="small" fullWidth style={{ marginTop: 8 }}>
              <Select value={selectedAccount?.id || ""} onChange={e => setSelectedAccount(accounts.find(a => a.id === e.target.value))}>
                {accounts.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
              </Select>
            </FormControl>
          )}
          {selectedAccount && (
            <Typography style={{ fontSize: 11, color: "#718096", marginTop: 4 }}>{selectedAccount.email}</Typography>
          )}
        </Box>

        <Button variant="contained" className={classes.composeBtn} startIcon={<CreateIcon />} onClick={() => { setCompose({ to: "", subject: "", body: "" }); setReplyMode(false); setComposeOpen(true); }} style={{ backgroundColor: "#4299e1", color: "#fff", margin: 12 }}>
          Novo Email
        </Button>

        <Box style={{ flex: 1, overflow: "auto", padding: "4px 0" }}>
          {folders.map(f => {
            const isNoselect = (f.flags || []).some(fl => fl.toLowerCase() === "\\noselect");
            return (
            <Box key={f.path} className={`${classes.folderItem} ${currentFolder === f.path ? classes.folderItemActive : ""}`}
              style={isNoselect ? { opacity: 0.4, cursor: "default" } : {}}
              onClick={() => { if (!isNoselect) { setCurrentFolder(f.path); setPage(1); setSelectedEmail(null); } }}>
              <Box display="flex" alignItems="center" style={{ gap: 8 }}>
                {FOLDER_ICONS[f.path] || <FolderIcon style={{ fontSize: 18 }} />}
                <Typography style={{ fontSize: 13, fontWeight: currentFolder === f.path ? 700 : 400 }}>
                  {getFolderLabel(f.path)}
                </Typography>
              </Box>
            </Box>
            );
          })}
        </Box>
      </Box>

      {/* Lista de emails */}
      <Box className={classes.emailList}>
        <Box className={classes.emailListHeader}>
          <Typography style={{ fontWeight: 700, fontSize: 14 }}>{getFolderLabel(currentFolder)}</Typography>
          <Box display="flex" alignItems="center" style={{ gap: 4 }}>
            <Typography style={{ fontSize: 11, color: "#a0aec0" }}>{total} emails</Typography>
            <IconButton size="small" onClick={loadEmails}><RefreshIcon fontSize="small" /></IconButton>
          </Box>
        </Box>

        {!selectedAccount ? (
          <Box style={{ padding: 24, textAlign: "center", color: "#a0aec0" }}>
            <InboxIcon style={{ fontSize: 40, marginBottom: 8, color: "#a0aec0" }} />
            <Typography style={{ fontWeight: 600 }}>Nenhuma conta conectada</Typography>
            <Typography style={{ fontSize: 11, marginTop: 4 }}>Vá em Configurações → Canais para conectar</Typography>
            <Button size="small" color="primary" href="/canais" style={{ marginTop: 8 }}>Ir para Conexões</Button>
          </Box>
        ) : loading ? (
          <Box display="flex" justifyContent="center" p={3}><CircularProgress size={24} /></Box>
        ) : emails.length === 0 ? (
          <Box style={{ padding: 24, textAlign: "center", color: "#a0aec0" }}>
            <InboxIcon style={{ fontSize: 40, marginBottom: 8 }} />
            <Typography>Nenhum email</Typography>
          </Box>
        ) : (
          <>
            <Box style={{ flex: 1, overflow: "auto" }}>
              {emails.map(email => (
                <Box key={email.uid} className={`${classes.emailItem} ${selectedEmail?.uid === email.uid ? classes.emailItemActive : ""} ${!email.seen ? classes.emailItemUnread : ""}`} onClick={() => openEmail(email)}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography style={{ fontSize: 13, fontWeight: email.seen ? 400 : 700, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {email.from?.split("<")[0].trim() || email.from}
                    </Typography>
                    <Typography style={{ fontSize: 10, color: "#a0aec0", flexShrink: 0, marginLeft: 4 }}>
                      {email.date ? format(new Date(email.date), "dd/MM HH:mm", { locale: ptBR }) : ""}
                    </Typography>
                  </Box>
                  <Typography style={{ fontSize: 12, color: email.seen ? "#718096" : "#2d3748", fontWeight: email.seen ? 400 : 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {email.subject || "(sem assunto)"}
                  </Typography>
                  {!email.seen && <Box style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#4299e1", marginTop: 4 }} />}
                </Box>
              ))}
            </Box>

            {/* Paginação */}
            <Box display="flex" justifyContent="center" alignItems="center" style={{ padding: "8px", borderTop: "1px solid #e2e8f0", gap: 8 }}>
              <IconButton size="small" disabled={page <= 1} onClick={() => setPage(p => p - 1)}><ChevronLeftIcon /></IconButton>
              <Typography style={{ fontSize: 12, color: "#718096" }}>{page} / {totalPages || 1}</Typography>
              <IconButton size="small" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}><ChevronRightIcon /></IconButton>
            </Box>
          </>
        )}
      </Box>

      {/* Visualizador */}
      <Box className={classes.emailViewer}>
        {!selectedEmail ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" style={{ color: "#a0aec0" }}>
            <InboxIcon style={{ fontSize: 64, marginBottom: 12 }} />
            <Typography style={{ fontSize: 16 }}>Selecione um email para ler</Typography>
          </Box>
        ) : (
          <>
            <Box className={classes.emailViewerHeader}>
              <Typography style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{selectedEmail.subject}</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" style={{ gap: 8 }}>
                <Box>
                  <Typography style={{ fontSize: 13, color: "#2d3748" }}><b>De:</b> {selectedEmail.from}</Typography>
                  <Typography style={{ fontSize: 12, color: "#718096" }}>{selectedEmail.date ? format(new Date(selectedEmail.date), "dd/MM/yyyy HH:mm", { locale: ptBR }) : ""}</Typography>
                </Box>
                <Box display="flex" style={{ gap: 6 }}>
                  <Tooltip title="Responder">
                    <IconButton size="small" onClick={openReply} style={{ backgroundColor: "#ebf8ff", color: "#4299e1" }}><ReplyIcon fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Mover para Spam">
                    <IconButton size="small" onClick={() => handleMoveToSpam(selectedEmail)} style={{ backgroundColor: "#fff5f5", color: "#e53e3e" }}><ReportIcon fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Mover para Lixeira">
                    <IconButton size="small" onClick={() => handleMoveToTrash(selectedEmail)} style={{ backgroundColor: "#fff5f5", color: "#718096" }}><DeleteSweepIcon fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir permanentemente">
                    <IconButton size="small" onClick={() => handleDelete(selectedEmail)} style={{ backgroundColor: "#fff5f5", color: "#e53e3e" }}><DeleteIcon fontSize="small" /></IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>

            <Box className={classes.emailBody}>
              {loadingBody ? (
                <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
              ) : emailBody.html ? (
                <iframe
                  sandbox="allow-same-origin"
                  srcDoc={emailBody.html}
                  style={{ width: "100%", minHeight: 400, border: "none", backgroundColor: "#fff" }}
                  title="email-body"
                />
              ) : (
                <Typography style={{ whiteSpace: "pre-wrap", fontSize: 14, color: "#2d3748" }}>{emailBody.text || "Sem conteúdo"}</Typography>
              )}
            </Box>
          </>
        )}
      </Box>

      {/* Modal Composição */}
      <Dialog open={composeOpen} onClose={() => setComposeOpen(false)} fullWidth maxWidth="md">
        <DialogTitle style={{ background: "#4299e1", color: "#fff", fontWeight: 700 }}>
          {replyMode ? "Responder Email" : "Novo Email"}
        </DialogTitle>
        <DialogContent style={{ paddingTop: 16 }}>
          <TextField label="Para" fullWidth variant="outlined" size="small" style={{ marginBottom: 10 }} value={compose.to} onChange={e => { const v = e.target.value; setCompose(c => ({ ...c, to: v })); }} />
          <TextField label="Assunto" fullWidth variant="outlined" size="small" style={{ marginBottom: 10 }} value={compose.subject} onChange={e => { const v = e.target.value; setCompose(c => ({ ...c, subject: v })); }} />

          {/* Editor HTML */}
          <Box style={{ marginBottom: 10 }}>
            <ReactQuill
              theme="snow"
              value={compose.body}
              onChange={value => setCompose(c => ({ ...c, body: value }))}
              style={{ height: 250, marginBottom: 42 }}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </Box>

          {/* Anexos */}
          <Box style={{ marginTop: 8 }}>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={e => setAttachments(prev => [...prev, ...Array.from(e.target.files)])}
            />
            <Button size="small" startIcon={<AttachFileIcon />} onClick={() => fileInputRef.current?.click()} style={{ color: "#4299e1" }}>
              Anexar arquivo
            </Button>
            {attachments.length > 0 && (
              <Box display="flex" flexWrap="wrap" style={{ gap: 6, marginTop: 6 }}>
                {attachments.map((f, i) => (
                  <Chip
                    key={i}
                    label={`${f.name} (${(f.size / 1024).toFixed(0)}KB)`}
                    size="small"
                    onDelete={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))}
                    style={{ backgroundColor: "#ebf8ff", color: "#2b6cb0" }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComposeOpen(false)}>Cancelar</Button>
          <Button variant="contained" startIcon={<SendIcon />} onClick={handleSend} style={{ backgroundColor: "#4299e1", color: "#fff" }}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
