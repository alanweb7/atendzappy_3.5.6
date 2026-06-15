import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import { toast } from "react-toastify";
import api from "../../services/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(2),
    overflowY: "auto",
    ...theme.scrollbarStyles,
  },
  section: {
    marginBottom: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(2),
    borderRadius: 8,
    background: "#f9f9f9",
    border: "1px solid #e0e0e0",
  },
  usageBar: {
    height: 12,
    borderRadius: 6,
    marginTop: theme.spacing(1),
  },
  packageCard: {
    padding: theme.spacing(2),
    borderRadius: 8,
    border: "2px solid #e0e0e0",
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color 0.2s",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
  packagePrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
  },
  packageCredits: {
    fontSize: 16,
    color: "#555",
  },
  buyButton: {
    marginTop: theme.spacing(1),
  },
  statusChip: {
    fontSize: 12,
  },
}));

const statusLabel = {
  pending: { label: "Pendente", color: "default" },
  paid: { label: "Pago", color: "primary" },
  cancelled: { label: "Cancelado", color: "secondary" },
  expired: { label: "Expirado", color: "default" },
};

const formatCents = (cents) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const CreditosIA = () => {
  const classes = useStyles();
  const [usage, setUsage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingUsage, setLoadingUsage] = useState(true);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [purchasing, setPurchasing] = useState(null);

  const fetchUsage = useCallback(async () => {
    try {
      const { data } = await api.get("/ai-credits/usage");
      setUsage(data);
    } catch {
      toast.error("Erro ao carregar uso de créditos IA.");
    } finally {
      setLoadingUsage(false);
    }
  }, []);

  const fetchPackages = useCallback(async () => {
    try {
      const { data } = await api.get("/ai-credits/packages");
      setPackages(data);
    } catch {
      toast.error("Erro ao carregar pacotes.");
    } finally {
      setLoadingPackages(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await api.get("/ai-credits/orders");
      setOrders(data);
    } catch {
      toast.error("Erro ao carregar pedidos.");
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    fetchUsage();
    fetchPackages();
    fetchOrders();
  }, [fetchUsage, fetchPackages, fetchOrders]);

  const handlePurchase = async (pkg) => {
    setPurchasing(pkg.id);
    try {
      const { data } = await api.post(`/ai-credits/purchase/${pkg.id}`);
      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, "_blank");
        toast.success("Link de pagamento aberto. Após pagar, os créditos serão adicionados automaticamente.");
        setTimeout(fetchOrders, 3000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Erro ao criar link de pagamento.");
    } finally {
      setPurchasing(null);
    }
  };

  const handleVerifyOrder = async (orderId) => {
    try {
      const { data } = await api.get(`/ai-credits/orders/${orderId}/verify`);
      if (data.paid) {
        toast.success("Pagamento confirmado! Créditos adicionados.");
        fetchUsage();
        fetchOrders();
      } else {
        toast.info("Pagamento ainda não confirmado.");
      }
    } catch {
      toast.error("Erro ao verificar pagamento.");
    }
  };

  const usagePercent =
    usage && usage.limit > 0 ? Math.min((usage.tokensUsed / usage.limit) * 100, 100) : 0;

  return (
    <MainContainer>
      <MainHeader>
        <Title>Créditos de IA</Title>
      </MainHeader>

      <Paper className={classes.mainPaper}>
        {/* Uso atual */}
        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            Uso do mês atual
          </Typography>
          {loadingUsage ? (
            <CircularProgress size={24} />
          ) : usage ? (
            <div className={classes.card}>
              {usage.hasOwnKey ? (
                <Typography variant="body1" color="textSecondary">
                  Sua empresa usa chave de IA própria — sem limite de créditos aplicado.
                </Typography>
              ) : (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="textSecondary">Créditos usados</Typography>
                      <Typography variant="h5">{usage.tokensUsed.toLocaleString("pt-BR")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="textSecondary">Créditos extras comprados</Typography>
                      <Typography variant="h5">{usage.extraCredits.toLocaleString("pt-BR")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="textSecondary">Limite total</Typography>
                      <Typography variant="h5">{usage.limit.toLocaleString("pt-BR")}</Typography>
                    </Grid>
                  </Grid>
                  <LinearProgress
                    variant="determinate"
                    value={usagePercent}
                    className={classes.usageBar}
                    color={usagePercent >= 90 ? "secondary" : "primary"}
                  />
                  <Typography variant="caption" color="textSecondary">
                    {usage.remaining.toLocaleString("pt-BR")} créditos restantes ({(100 - usagePercent).toFixed(1)}%)
                  </Typography>
                  {usage.remaining <= 0 && (
                    <Typography variant="body2" color="error" style={{ marginTop: 8 }}>
                      Créditos esgotados. A IA não responderá até você comprar mais créditos ou até o próximo mês.
                    </Typography>
                  )}
                </>
              )}
            </div>
          ) : (
            <Typography color="textSecondary">Não foi possível carregar os dados.</Typography>
          )}
        </div>

        <Divider style={{ marginBottom: 24 }} />

        {/* Pacotes disponíveis */}
        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            Comprar créditos extras
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Os créditos comprados são somados ao seu limite mensal do plano e não expiram no mês atual.
          </Typography>
          {loadingPackages ? (
            <CircularProgress size={24} />
          ) : (
            <Grid container spacing={2}>
              {packages.map((pkg) => (
                <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                  <Paper className={classes.packageCard} elevation={2}>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      {pkg.name}
                    </Typography>
                    {pkg.description && (
                      <Typography variant="body2" color="textSecondary">
                        {pkg.description}
                      </Typography>
                    )}
                    <Typography className={classes.packageCredits}>
                      {pkg.credits.toLocaleString("pt-BR")} créditos
                    </Typography>
                    <Typography className={classes.packagePrice}>
                      {formatCents(pkg.priceInCents)}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.buyButton}
                      disabled={purchasing === pkg.id}
                      onClick={() => handlePurchase(pkg)}
                    >
                      {purchasing === pkg.id ? <CircularProgress size={20} color="inherit" /> : "Comprar"}
                    </Button>
                  </Paper>
                </Grid>
              ))}
              {packages.length === 0 && (
                <Grid item xs={12}>
                  <Typography color="textSecondary">Nenhum pacote disponível no momento.</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </div>

        <Divider style={{ marginBottom: 24 }} />

        {/* Histórico de pedidos */}
        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            Histórico de pedidos
          </Typography>
          {loadingOrders ? (
            <CircularProgress size={24} />
          ) : orders.length === 0 ? (
            <Typography color="textSecondary">Nenhum pedido realizado.</Typography>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Pacote</TableCell>
                  <TableCell align="right">Créditos</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.package?.name || `Pacote #${order.packageId}`}</TableCell>
                    <TableCell align="right">{order.credits.toLocaleString("pt-BR")}</TableCell>
                    <TableCell align="right">{formatCents(order.amountInCents)}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={(statusLabel[order.status] || { label: order.status }).label}
                        color={(statusLabel[order.status] || { color: "default" }).color}
                        className={classes.statusChip}
                      />
                    </TableCell>
                    <TableCell>
                      {order.createdAt
                        ? format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {order.status === "pending" && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleVerifyOrder(order.id)}
                        >
                          Verificar pagamento
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Paper>
    </MainContainer>
  );
};

export default CreditosIA;
