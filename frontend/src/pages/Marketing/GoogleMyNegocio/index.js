import React, { useState, useEffect, useContext } from "react";
import {
  Box, Typography, Button, Tabs, Tab, CircularProgress,
  Card, CardContent, Grid, IconButton, TextField, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Star, StarBorder, Reply, Add, Delete, Edit, Refresh,
  TrendingUp, RateReview, PostAdd, Business, Settings,
} from "@material-ui/icons";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { AuthContext } from "../../../context/Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: { padding: 24, backgroundColor: "#f8fafc", minHeight: "100vh" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  title: { fontSize: 26, fontWeight: 700, color: "#1a1a2e" },
  subtitle: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  card: { borderRadius: 12, border: "1px solid #e2e8f0", backgroundColor: "#fff" },
  metricCard: {
    borderRadius: 12, border: "1px solid #e2e8f0", backgroundColor: "#fff",
    padding: 20, textAlign: "center",
  },
  metricValue: { fontSize: 32, fontWeight: 800, color: "#1a1a2e" },
  metricLabel: { fontSize: 12, color: "#6b7280", marginTop: 4 },
  reviewCard: {
    borderRadius: 10, border: "1px solid #e2e8f0", backgroundColor: "#fff",
    padding: 16, marginBottom: 12,
  },
  starFilled: { color: "#f59e0b", fontSize: 18 },
  starEmpty: { color: "#d1d5db", fontSize: 18 },
  tabs: { borderBottom: "1px solid #e2e8f0", marginBottom: 20 },
  accountChip: { cursor: "pointer", marginRight: 8, marginBottom: 8 },
  postCard: {
    borderRadius: 10, border: "1px solid #e2e8f0", backgroundColor: "#fff",
    padding: 16, marginBottom: 12,
  },
  emptyState: {
    textAlign: "center", padding: 60, color: "#9ca3af",
  },
}));

const Stars = ({ rating }) => {
  const classes = useStyles();
  return (
    <Box display="flex">
      {[1, 2, 3, 4, 5].map(i =>
        i <= rating
          ? <Star key={i} className={classes.starFilled} />
          : <StarBorder key={i} className={classes.starEmpty} />
      )}
    </Box>
  );
};

const ComingSoon = ({ feature }) => (
  <Box style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "60px 20px", textAlign: "center",
    backgroundColor: "#fff", borderRadius: 12, border: "1px dashed #e2e8f0",
  }}>
    <Box style={{
      width: 64, height: 64, borderRadius: "50%", backgroundColor: "#f0fdf4",
      display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
    }}>
      <span style={{ fontSize: 28 }}>🚀</span>
    </Box>
    <Typography variant="h6" style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>
      Em breve
    </Typography>
    <Typography style={{ color: "#6b7280", fontSize: 14, maxWidth: 360, lineHeight: 1.6 }}>
      A funcionalidade de <strong>{feature}</strong> estará disponível em breve.
      Estamos aguardando a aprovação do Google para liberar o acesso completo à API.
    </Typography>
    <Box style={{
      marginTop: 20, padding: "10px 20px", backgroundColor: "#eff6ff",
      borderRadius: 8, border: "1px solid #bfdbfe",
    }}>
      <Typography style={{ fontSize: 12, color: "#1d4ed8" }}>
        📋 Aprovação da Google Business Profile API em andamento
      </Typography>
    </Box>
  </Box>
);

const TABS = [
  { label: "Visão Geral", icon: <TrendingUp /> },
  { label: "Avaliações", icon: <RateReview /> },
  { label: "Posts", icon: <PostAdd /> },
  { label: "Informações", icon: <Business /> },
  { label: "Configurações", icon: <Settings /> },
];

export default function GoogleMyNegocio() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab data
  const [metrics, setMetrics] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [posts, setPosts] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [newPost, setNewPost] = useState({ summary: "", callToActionType: "", callToActionUrl: "" });
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);

  useEffect(() => {
    loadAccounts();
    // Checar se veio de callback de sucesso
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "connected") {
      toast.success("Google Meu Negócio conectado com sucesso!");
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("error")) {
      toast.error("Erro ao conectar. Verifique as credenciais.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/google-business/accounts");
      setAccounts(data);
      if (data.length > 0) setSelectedAccount(data[0]);
    } catch { toast.error("Erro ao carregar contas"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (!selectedAccount) return;
    loadTabData();
  }, [selectedAccount, tab]);

  const loadTabData = async () => {
    if (!selectedAccount) return;
    setTabLoading(true);
    try {
      if (tab === 0) {
        const { data } = await api.get(`/google-business/accounts/${selectedAccount.id}/metrics`);
        setMetrics(data);
      } else if (tab === 1) {
        const { data } = await api.get(`/google-business/accounts/${selectedAccount.id}/reviews`);
        setReviews(data.reviews || []);
      } else if (tab === 2) {
        const { data } = await api.get(`/google-business/accounts/${selectedAccount.id}/posts`);
        setPosts(data.localPosts || []);
      } else if (tab === 3) {
        const { data } = await api.get(`/google-business/accounts/${selectedAccount.id}/info`);
        setBusinessInfo(data);
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally { setTabLoading(false); }
  };

  const handleReply = async (reviewId) => {
    if (!replyText[reviewId]?.trim()) return;
    try {
      await api.put(`/google-business/accounts/${selectedAccount.id}/reviews/${reviewId}/reply`, {
        comment: replyText[reviewId]
      });
      toast.success("Resposta enviada!");
      setReplyText(prev => ({ ...prev, [reviewId]: "" }));
      loadTabData();
    } catch { toast.error("Erro ao responder avaliação"); }
  };

  const handleCreatePost = async () => {
    try {
      await api.post(`/google-business/accounts/${selectedAccount.id}/posts`, newPost);
      toast.success("Post criado!");
      setPostDialogOpen(false);
      setNewPost({ summary: "", callToActionType: "", callToActionUrl: "" });
      loadTabData();
    } catch { toast.error("Erro ao criar post"); }
  };

  const handleDeletePost = async (postName) => {
    if (!window.confirm("Excluir este post?")) return;
    try {
      await api.delete(`/google-business/accounts/${selectedAccount.id}/posts/${encodeURIComponent(postName)}`);
      toast.success("Post excluído!");
      loadTabData();
    } catch { toast.error("Erro ao excluir post"); }
  };

  const handleDeleteAccount = async (id) => {
    if (!window.confirm("Desconectar esta conta?")) return;
    try {
      await api.delete(`/google-business/accounts/${id}`);
      toast.success("Conta desconectada");
      loadAccounts();
    } catch { toast.error("Erro ao desconectar"); }
  };

  if (loading) return <Box display="flex" justifyContent="center" pt={8}><CircularProgress /></Box>;

  if (accounts.length === 0) {
    return (
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Box>
            <Typography className={classes.title}>Google Meu Negócio</Typography>
            <Typography className={classes.subtitle}>Nenhuma conta conectada</Typography>
          </Box>
        </Box>
        <Box className={classes.emptyState}>
          <Business style={{ fontSize: 64, color: "#d1d5db", marginBottom: 12 }} />
          <Typography variant="h6" style={{ color: "#9ca3af" }}>Nenhuma conta do Google Business conectada</Typography>
          <Typography style={{ color: "#9ca3af", fontSize: 13, marginTop: 8 }}>
            Vá em <strong>Configurações → Canais → + → Google Meu Negócio</strong> para conectar sua conta.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      {/* Header */}
      <Box className={classes.header}>
        <Box>
          <Typography className={classes.title}>Google Meu Negócio</Typography>
          <Typography className={classes.subtitle}>{selectedAccount?.name}</Typography>
        </Box>
        <IconButton onClick={loadTabData} title="Atualizar"><Refresh /></IconButton>
      </Box>

      {/* Account selector */}
      {accounts.length > 1 && (
        <Box mb={2}>
          {accounts.map(acc => (
            <Chip
              key={acc.id}
              label={acc.name}
              onClick={() => setSelectedAccount(acc)}
              color={selectedAccount?.id === acc.id ? "primary" : "default"}
              className={classes.accountChip}
              onDelete={() => handleDeleteAccount(acc.id)}
            />
          ))}
        </Box>
      )}

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}
        indicatorColor="primary" textColor="primary">
        {TABS.map((t, i) => (
          <Tab key={i} label={t.label} icon={t.icon} iconPosition="start"
            style={{ textTransform: "none", fontWeight: 600, minHeight: 48 }} />
        ))}
      </Tabs>

      {tabLoading ? (
        <Box display="flex" justifyContent="center" pt={4}><CircularProgress /></Box>
      ) : (
        <>
          {/* Visão Geral */}
          {tab === 0 && (
            <Grid container spacing={2}>
              {[
                { label: "Cliques no site", key: "WEBSITE_CLICKS" },
                { label: "Cliques p/ ligar", key: "CALL_CLICKS" },
                { label: "Pedidos de rota", key: "BUSINESS_DIRECTION_REQUESTS" },
                { label: "Impressões (maps)", key: "BUSINESS_IMPRESSIONS_DESKTOP_MAPS" },
              ].map(m => (
                <Grid item xs={6} md={3} key={m.key}>
                  <Box className={classes.metricCard}>
                    <Typography className={classes.metricValue}>
                      {metrics?.multiDailyMetricTimeSeries?.find(s => s.dailyMetric === m.key)
                        ?.timeSeries?.datedValues?.reduce((sum, d) => sum + (d.value || 0), 0) ?? "—"}
                    </Typography>
                    <Typography className={classes.metricLabel}>{m.label}</Typography>
                    <Typography style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>Últimos 30 dias</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Avaliações */}
          {tab === 1 && (
            <Box>
              <ComingSoon feature="Avaliações" />
            </Box>
          )}

          {/* Avaliações — CONTEÚDO FUTURO (desabilitado até aprovação Google) */}
          {false && tab === 1 && (
            <Box>
              {reviews.length === 0 ? (
                <Box className={classes.emptyState}><Typography>Nenhuma avaliação encontrada</Typography></Box>
              ) : reviews.map(review => (
                <Box key={review.reviewId} className={classes.reviewCard}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography style={{ fontWeight: 600, fontSize: 14 }}>{review.reviewer?.displayName || "Anônimo"}</Typography>
                      <Stars rating={review.starRating === "FIVE" ? 5 : review.starRating === "FOUR" ? 4 : review.starRating === "THREE" ? 3 : review.starRating === "TWO" ? 2 : 1} />
                    </Box>
                    <Typography style={{ fontSize: 11, color: "#9ca3af" }}>
                      {new Date(review.createTime).toLocaleDateString("pt-BR")}
                    </Typography>
                  </Box>
                  {review.comment && <Typography style={{ fontSize: 13, color: "#374151", marginTop: 8 }}>{review.comment}</Typography>}
                  {review.reviewReply ? (
                    <Box mt={1} p={1} style={{ backgroundColor: "#f0f9ff", borderRadius: 6 }}>
                      <Typography style={{ fontSize: 11, color: "#0284c7", fontWeight: 600 }}>Sua resposta:</Typography>
                      <Typography style={{ fontSize: 12, color: "#374151" }}>{review.reviewReply.comment}</Typography>
                    </Box>
                  ) : (
                    <Box mt={1} display="flex" gap={1} alignItems="center">
                      <TextField size="small" fullWidth placeholder="Escreva uma resposta..." variant="outlined"
                        value={replyText[review.reviewId] || ""}
                        onChange={(e) => setReplyText(prev => ({ ...prev, [review.reviewId]: e.target.value }))} />
                      <Button size="small" variant="contained" color="primary" startIcon={<Reply />}
                        onClick={() => handleReply(review.reviewId)} style={{ textTransform: "none", whiteSpace: "nowrap" }}>
                        Responder
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Posts */}
          {tab === 2 && (
            <Box>
              <ComingSoon feature="Posts" />
            </Box>
          )}

          {/* Posts — CONTEÚDO FUTURO (desabilitado até aprovação Google) */}
          {false && tab === 2 && (
            <Box>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="primary" startIcon={<Add />}
                  onClick={() => setPostDialogOpen(true)} style={{ textTransform: "none" }}>
                  Novo Post
                </Button>
              </Box>
              {posts.length === 0 ? (
                <Box className={classes.emptyState}><Typography>Nenhum post encontrado</Typography></Box>
              ) : posts.map(post => (
                <Box key={post.name} className={classes.postCard}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography style={{ fontSize: 13, color: "#374151", flex: 1 }}>{post.summary}</Typography>
                    <IconButton size="small" onClick={() => handleDeletePost(post.name)}><Delete fontSize="small" /></IconButton>
                  </Box>
                  {post.callToAction && (
                    <Chip size="small" label={post.callToAction.url} style={{ marginTop: 6, fontSize: 10 }} />
                  )}
                  <Typography style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>
                    {new Date(post.createTime).toLocaleDateString("pt-BR")} · {post.state}
                  </Typography>
                </Box>
              ))}
              <Dialog open={postDialogOpen} onClose={() => setPostDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Novo Post</DialogTitle>
                <DialogContent>
                  <TextField label="Texto do post" fullWidth multiline rows={4} variant="outlined"
                    value={newPost.summary} onChange={e => setNewPost(p => ({ ...p, summary: e.target.value }))}
                    style={{ marginBottom: 12, marginTop: 8 }} />
                  <TextField label="URL do botão (opcional)" fullWidth variant="outlined" size="small"
                    value={newPost.callToActionUrl} onChange={e => setNewPost(p => ({ ...p, callToActionUrl: e.target.value }))} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setPostDialogOpen(false)}>Cancelar</Button>
                  <Button variant="contained" color="primary" onClick={handleCreatePost}>Publicar</Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}

          {/* Informações */}
          {tab === 3 && (
            <Box>
              <ComingSoon feature="Edição de Informações do Perfil" />
            </Box>
          )}

          {/* Informações — CONTEÚDO FUTURO (desabilitado até aprovação Google) */}
          {false && tab === 3 && (
            <Box>
              {businessInfo ? (
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{businessInfo.title || businessInfo.locationName}</Typography>
                    <Divider style={{ margin: "12px 0" }} />
                    {businessInfo.phoneNumbers?.primaryPhone && (
                      <Typography style={{ marginBottom: 8 }}>📞 {businessInfo.phoneNumbers.primaryPhone}</Typography>
                    )}
                    {businessInfo.websiteUri && (
                      <Typography style={{ marginBottom: 8 }}>🌐 <a href={businessInfo.websiteUri} target="_blank" rel="noreferrer">{businessInfo.websiteUri}</a></Typography>
                    )}
                    {businessInfo.storefrontAddress && (
                      <Typography style={{ marginBottom: 8 }}>📍 {[
                        businessInfo.storefrontAddress.addressLines?.[0],
                        businessInfo.storefrontAddress.locality,
                        businessInfo.storefrontAddress.regionCode
                      ].filter(Boolean).join(", ")}</Typography>
                    )}
                    {businessInfo.regularHours?.periods && (
                      <Box mt={2}>
                        <Typography variant="subtitle2" gutterBottom>Horários de funcionamento:</Typography>
                        {businessInfo.regularHours.periods.map((p, i) => (
                          <Typography key={i} style={{ fontSize: 13 }}>
                            {p.openDay}: {p.openTime?.hours}:{String(p.openTime?.minutes || 0).padStart(2, "0")} – {p.closeTime?.hours}:{String(p.closeTime?.minutes || 0).padStart(2, "0")}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Box className={classes.emptyState}><Typography>Informações não disponíveis</Typography></Box>
              )}
            </Box>
          )}

          {/* Configurações */}
          {tab === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom>Contas conectadas</Typography>
              {accounts.map(acc => (
                <Box key={acc.id} className={classes.reviewCard} display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography style={{ fontWeight: 600 }}>{acc.name}</Typography>
                    <Typography style={{ fontSize: 12, color: "#9ca3af" }}>{acc.accountId}</Typography>
                    <Chip size="small" label={acc.status} style={{ marginTop: 4, backgroundColor: acc.status === "CONNECTED" ? "#e8f5e9" : "#ffebee", color: acc.status === "CONNECTED" ? "#388e3c" : "#d32f2f" }} />
                  </Box>
                  <Button variant="outlined" color="secondary" size="small"
                    onClick={() => handleDeleteAccount(acc.id)} style={{ textTransform: "none" }}>
                    Desconectar
                  </Button>
                </Box>
              ))}
              <Typography style={{ fontSize: 12, color: "#9ca3af", marginTop: 12 }}>
                Para conectar uma nova conta, vá em <strong>Canais → + → Google Meu Negócio</strong>.
              </Typography>
            </Box>
          )}
        </>
      )}

    </Box>
  );
}
