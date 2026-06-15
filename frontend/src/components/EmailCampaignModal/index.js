import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Select, FormControl, InputLabel,
  Grid, Box, Typography, Tabs, Tab, Chip, IconButton, CircularProgress,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import EmailIcon from "@material-ui/icons/Email";
import PeopleIcon from "@material-ui/icons/People";
import LabelIcon from "@material-ui/icons/Label";
import EventIcon from "@material-ui/icons/Event";
import { toast } from "react-toastify";
import moment from "moment";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
    color: "#fff",
    padding: "14px 20px",
  },
  titleLeft: { display: "flex", alignItems: "center", gap: 10 },
  section: {
    background: "#f8fafc",
    borderRadius: 10,
    padding: "16px 20px",
    marginBottom: 16,
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  htmlEditor: {
    fontFamily: "monospace",
    fontSize: 13,
    minHeight: 200,
  },
  recipientTab: {
    minWidth: 0,
    fontSize: 12,
    textTransform: "none",
  },
  attachRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  previewBox: {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 16,
    background: "#fff",
    minHeight: 120,
    fontSize: 13,
    color: "#334155",
    marginTop: 8,
  },
}));

export default function EmailCampaignModal({ open, onClose, campaignId, onSaved }) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { companyId } = user;
  const fileRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [emailAccountId, setEmailAccountId] = useState("");
  const [recipientTab, setRecipientTab] = useState(0); // 0=lista, 1=tag, 2=kanban
  const [contactListId, setContactListId] = useState("");
  const [tagListId, setTagListId] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [emailAccounts, setEmailAccounts] = useState([]);
  const [contactLists, setContactLists] = useState([]);
  const [tags, setTags] = useState([]);
  const [kanbanTags, setKanbanTags] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoadingData(true);

    Promise.all([
      api.get("/email-accounts").catch(() => ({ data: [] })),
      api.get("/contact-lists/", { params: { companyId } }).catch(() => ({ data: [] })),
      api.get("/tags/list", { params: { companyId, kanban: 0 } }).catch(() => ({ data: [] })),
      api.get("/tags", { params: { kanban: 1, companyId } }).catch(() => ({ data: [] })),
    ]).then(([eaRes, clRes, tagRes, kanbanRes]) => {
      // EmailAccounts — array direto
      setEmailAccounts(Array.isArray(eaRes.data) ? eaRes.data : []);

      // ContactLists — pode vir como array, { lists: [] } ou { records: [] }
      const cl = clRes.data;
      if (Array.isArray(cl)) setContactLists(cl);
      else if (Array.isArray(cl?.lists)) setContactLists(cl.lists);
      else if (Array.isArray(cl?.records)) setContactLists(cl.records);
      else setContactLists([]);

      // Tags normais
      const tg = tagRes.data;
      if (Array.isArray(tg)) setTags(tg);
      else if (Array.isArray(tg?.tags)) setTags(tg.tags);
      else setTags([]);

      // Tags Kanban
      const kb = kanbanRes.data;
      if (Array.isArray(kb)) setKanbanTags(kb);
      else if (Array.isArray(kb?.tags)) setKanbanTags(kb.tags);
      else setKanbanTags([]);
    }).finally(() => setLoadingData(false));

    if (!campaignId) {
      // reset
      setName(""); setSubject(""); setBody(""); setScheduledAt("");
      setEmailAccountId(""); setContactListId(""); setTagListId("");
      setAttachment(null); setRecipientTab(0); setShowPreview(false);
      return;
    }

    api.get(`/campaigns/${campaignId}`).then(({ data }) => {
      setName(data.name || "");
      setSubject(data.subject || "");
      setBody(data.message1 || "");
      setEmailAccountId(data.emailAccountId || "");
      setContactListId(data.contactListId || "");
      setTagListId(data.tagListId || "");
      if (data.scheduledAt) setScheduledAt(moment(data.scheduledAt).format("YYYY-MM-DDTHH:mm"));
      if (data.tagListId) setRecipientTab(1);
    }).catch(() => {});
  }, [open, campaignId]);

  const handleSave = async () => {
    if (!name.trim()) { toast.error("Informe o nome da campanha."); return; }
    if (!emailAccountId) { toast.error("Selecione a conta de e-mail."); return; }
    if (!subject.trim()) { toast.error("Informe o assunto do e-mail."); return; }
    if (!body.trim()) { toast.error("Informe o corpo do e-mail."); return; }
    if (recipientTab === 0 && !contactListId) { toast.error("Selecione a lista de contatos."); return; }
    if (recipientTab !== 0 && !tagListId) { toast.error("Selecione a tag."); return; }

    setSaving(true);
    try {
      const payload = {
        name,
        subject,
        message1: body,
        emailAccountId: Number(emailAccountId),
        channel: "email",
        status: scheduledAt ? "PROGRAMADA" : "INATIVA",
        companyId,
        contactListId: recipientTab === 0 ? (contactListId || null) : null,
        tagListId: recipientTab !== 0 ? (tagListId || null) : null,
        scheduledAt: scheduledAt ? moment(scheduledAt).format("YYYY-MM-DD HH:mm:ss") : null,
      };

      if (campaignId) {
        await api.put(`/campaigns/${campaignId}`, payload);
      } else {
        const { data: created } = await api.post("/campaigns", payload);
        // Upload anexo separado se houver
        if (attachment && created?.id) {
          const fd = new FormData();
          fd.append("file", attachment);
          await api.post(`/campaigns/${created.id}/media-upload`, fd, {
            headers: { "Content-Type": "multipart/form-data" }
          }).catch(() => {});
        }
      }

      toast.success(campaignId ? "Campanha atualizada!" : "Campanha criada!");
      onSaved && onSaved();
      onClose();
    } catch (err) { toastError(err); } finally { setSaving(false); }
  };

  const selectedAccountLabel = emailAccounts.find(a => a.id === emailAccountId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <div className={classes.dialogTitle}>
        <Box className={classes.titleLeft}>
          <EmailIcon style={{ fontSize: 22 }} />
          <Typography variant="h6" style={{ fontWeight: 700, fontSize: 16 }}>
            {campaignId ? "Editar Campanha de E-mail" : "Nova Campanha de E-mail"}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} style={{ color: "#fff" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      <DialogContent style={{ padding: "20px 24px", background: "#f1f5f9" }}>
        {loadingData ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : (
          <>
            {/* Bloco 1: Identificação */}
            <Box className={classes.section}>
              <Typography className={classes.sectionTitle}>
                📋 Identificação
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField label="Nome da campanha *" fullWidth variant="outlined" size="small"
                    value={name} onChange={e => setName(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Conta de e-mail *</InputLabel>
                    <Select value={emailAccountId} onChange={e => setEmailAccountId(e.target.value)} label="Conta de e-mail *">
                      {emailAccounts.map(acc => (
                        <MenuItem key={acc.id} value={acc.id}>
                          {acc.name} &lt;{acc.email}&gt;
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {selectedAccountLabel && (
                  <Grid item xs={12}>
                    <Typography style={{ fontSize: 12, color: "#64748b" }}>
                      Enviando de: <strong>{selectedAccountLabel.email}</strong> via {selectedAccountLabel.smtpHost}:{selectedAccountLabel.smtpPort}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>

            {/* Bloco 2: Destinatários */}
            <Box className={classes.section}>
              <Typography className={classes.sectionTitle}>
                <PeopleIcon style={{ fontSize: 16 }} /> Destinatários
              </Typography>
              <Tabs value={recipientTab} onChange={(_, v) => { setRecipientTab(v); setContactListId(""); setTagListId(""); }}
                indicatorColor="primary" textColor="primary" style={{ marginBottom: 12 }}>
                <Tab label="Lista de Contatos" className={classes.recipientTab} />
                <Tab label="Tag" className={classes.recipientTab} />
                <Tab label="Tag Kanban" className={classes.recipientTab} />
              </Tabs>

              {recipientTab === 0 && (
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Lista de contatos *</InputLabel>
                  <Select value={contactListId} onChange={e => setContactListId(e.target.value)} label="Lista de contatos *">
                    {contactLists.map(cl => (
                      <MenuItem key={cl.id} value={cl.id}>{cl.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {recipientTab === 1 && (
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Tag *</InputLabel>
                  <Select value={tagListId} onChange={e => setTagListId(e.target.value)} label="Tag *">
                    {tags.map(t => (
                      <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {recipientTab === 2 && (
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Tag Kanban *</InputLabel>
                  <Select value={tagListId} onChange={e => setTagListId(e.target.value)} label="Tag Kanban *">
                    {kanbanTags.map(t => (
                      <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Typography style={{ fontSize: 11, color: "#94a3b8", marginTop: 8 }}>
                Serão enviados apenas para contatos com e-mail cadastrado.
              </Typography>
            </Box>

            {/* Bloco 3: Agendamento */}
            <Box className={classes.section}>
              <Typography className={classes.sectionTitle}>
                <EventIcon style={{ fontSize: 16 }} /> Agendamento
              </Typography>
              <TextField
                label="Data e hora do envio"
                type="datetime-local"
                fullWidth
                variant="outlined"
                size="small"
                value={scheduledAt}
                onChange={e => setScheduledAt(e.target.value)}
                InputLabelProps={{ shrink: true }}
                helperText="Deixe vazio para salvar como rascunho (INATIVA) e disparar manualmente."
              />
            </Box>

            {/* Bloco 4: Conteúdo */}
            <Box className={classes.section}>
              <Typography className={classes.sectionTitle}>
                ✉️ Conteúdo do E-mail
              </Typography>
              <TextField label="Assunto *" fullWidth variant="outlined" size="small"
                value={subject} onChange={e => setSubject(e.target.value)}
                style={{ marginBottom: 12 }}
                placeholder="Ex: Oferta exclusiva para você, {nome}!" />

              <Box display="flex" alignItems="center" justifyContent="space-between" style={{ marginBottom: 6 }}>
                <Typography style={{ fontSize: 12, color: "#64748b" }}>
                  Corpo do e-mail * — suporta HTML completo. Use <code style={{ background: "#f1f5f9", padding: "1px 4px", borderRadius: 4 }}>{"{nome}"}</code> para personalizar.
                </Typography>
                <Button size="small" onClick={() => setShowPreview(p => !p)} style={{ fontSize: 11 }}>
                  {showPreview ? "Editar" : "Prévia"}
                </Button>
              </Box>

              {showPreview ? (
                <Box className={classes.previewBox} dangerouslySetInnerHTML={{ __html: body || "<em style='color:#aaa'>Nenhum conteúdo</em>" }} />
              ) : (
                <TextField
                  multiline
                  rows={10}
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder={`<h2>Olá, {nome}!</h2>\n<p>Temos uma novidade especial para você...</p>`}
                  inputProps={{ className: classes.htmlEditor }}
                />
              )}

              {/* Anexo */}
              <input ref={fileRef} type="file" style={{ display: "none" }}
                onChange={e => setAttachment(e.target.files[0] || null)} />
              <Box className={classes.attachRow}>
                <Button variant="outlined" size="small" startIcon={<AttachFileIcon />}
                  onClick={() => fileRef.current?.click()}>
                  {attachment ? attachment.name : "Adicionar anexo"}
                </Button>
                {attachment && (
                  <IconButton size="small" onClick={() => { setAttachment(null); if (fileRef.current) fileRef.current.value = ""; }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions style={{ padding: "12px 24px", background: "#f1f5f9", borderTop: "1px solid #e2e8f0" }}>
        <Button onClick={onClose} disabled={saving}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || loadingData}
          style={{ minWidth: 120 }}>
          {saving ? <CircularProgress size={20} color="inherit" /> : scheduledAt ? "Programar envio" : "Salvar rascunho"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
