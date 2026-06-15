import React, { useState, useEffect, useReducer, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PaymentIcon from "@material-ui/icons/Payment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import ConfirmationModal from "../../components/ConfirmationModal";
import DespesaModal from "../../components/DespesaModal";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";
import { toast } from "react-toastify";
import {
  listFinanceiroDespesas,
  deleteFinanceiroDespesa,
  pagarFinanceiroDespesa,
} from "../../services/financeiroDespesas";
import { listFinanceiroCategorias } from "../../services/financeiroCategorias";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD": {
      const incoming = action.payload || [];
      const updated = [...state];
      incoming.forEach((item) => {
        const idx = updated.findIndex((s) => s.id === item.id);
        if (idx >= 0) updated[idx] = item;
        else updated.push(item);
      });
      return updated;
    }
    case "DELETE":
      return state.filter((s) => s.id !== action.payload);
    case "RESET":
      return [];
    default:
      return state;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "transparent",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #e0e0e0",
    flexWrap: "wrap",
    gap: 12,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 16 },
  headerTitle: { fontSize: "1.5rem", fontWeight: 600, color: "#1a1a1a" },
  headerSubtitle: { fontSize: "0.875rem", color: "#666" },
  headerRight: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  searchField: {
    backgroundColor: "#fff",
    borderRadius: 8,
    minWidth: 220,
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      "& fieldset": { borderColor: "#e0e0e0" },
      "&:hover fieldset": { borderColor: theme.palette.primary.main },
    },
  },
  filterSelect: {
    minWidth: 160,
    backgroundColor: "#fff",
    borderRadius: 8,
    "& .MuiOutlinedInput-root": { borderRadius: 8 },
  },
  content: { padding: "0 24px 16px" },
  tableWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    marginTop: 16,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    "& th": {
      color: theme.palette.primary.contrastText || "#fff",
      fontWeight: 600,
      fontSize: "0.8rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: "none",
      padding: "14px 16px",
    },
  },
  tableBody: {
    "& td": {
      padding: "12px 16px",
      fontSize: "0.875rem",
      color: "#334155",
      borderBottom: "1px solid #f1f5f9",
    },
    "& tr:hover": { backgroundColor: "#f8fafc" },
  },
  actionBtn: {
    color: "#6366f1",
    "&:hover": { backgroundColor: "rgba(99,102,241,0.08)" },
  },
  actionBtnDanger: { color: "#ef4444" },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    color: "#999",
  },
  paginationBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderTop: "1px solid #f1f5f9",
    backgroundColor: "#fff",
    borderRadius: "0 0 12px 12px",
  },
}));

const STATUS_CFG = {
  aberta:    { text: "Aberta",    color: "#f59e0b", bg: "#fef3c7" },
  paga:      { text: "Paga",      color: "#10b981", bg: "#d1fae5" },
  vencida:   { text: "Vencida",   color: "#ef4444", bg: "#fee2e2" },
  cancelada: { text: "Cancelada", color: "#6b7280", bg: "#f3f4f6" },
};

const StatusChip = ({ status }) => {
  const cfg = STATUS_CFG[status] || STATUS_CFG.cancelada;
  return (
    <Chip
      label={cfg.text}
      size="small"
      style={{ backgroundColor: cfg.bg, color: cfg.color, fontWeight: 600, fontSize: "0.75rem" }}
    />
  );
};

const fmtBRL = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(v) || 0);

const fmtDate = (v) => {
  if (!v) return "—";
  const s = String(v).substring(0, 10);
  const [y, m, d] = s.split("-");
  return `${d}/${m}/${y}`;
};

const ContasPagar = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [despesas, dispatch] = useReducer(reducer, []);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoriaFilter, setCategoriaFilter] = useState("");

  const [despesaModal, setDespesaModal] = useState({ open: false, despesa: null });
  const [confirmModal, setConfirmModal] = useState({ open: false, despesa: null });
  const [pagarDialog, setPagarDialog] = useState({ open: false, despesa: null, metodo: "pix" });

  useEffect(() => {
    listFinanceiroCategorias({ pageNumber: 1 })
      .then((r) => setCategorias(r?.categorias || r?.records || (Array.isArray(r) ? r : [])))
      .catch(() => {});
  }, []);

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam, statusFilter, categoriaFilter]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const r = await listFinanceiroDespesas({
          searchParam,
          pageNumber,
          status: statusFilter === "all" ? "" : statusFilter,
          categoriaId: categoriaFilter || undefined,
        });
        const list = r?.despesas || r?.records || (Array.isArray(r) ? r : []);
        dispatch({ type: "LOAD", payload: list });
        setHasMore(r?.hasMore ?? false);
      } catch (err) {
        toastError(err);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchParam, pageNumber, statusFilter, categoriaFilter]);

  const handleDelete = async () => {
    try {
      await deleteFinanceiroDespesa(confirmModal.despesa.id);
      dispatch({ type: "DELETE", payload: confirmModal.despesa.id });
      toast.success("Despesa excluída!");
      setConfirmModal({ open: false, despesa: null });
    } catch (err) {
      toastError(err);
    }
  };

  const handlePagar = async () => {
    try {
      const result = await pagarFinanceiroDespesa(pagarDialog.despesa.id, {
        metodoPagamento: pagarDialog.metodo,
        dataPagamento: new Date().toISOString(),
      });
      dispatch({ type: "LOAD", payload: [result] });
      toast.success("Despesa marcada como paga!");
      setPagarDialog({ open: false, despesa: null, metodo: "pix" });
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Box className={classes.headerLeft}>
          <Box>
            <Typography className={classes.headerTitle}>Contas a Pagar</Typography>
            <Typography className={classes.headerSubtitle}>Gerencie suas despesas e contas a pagar</Typography>
          </Box>
        </Box>
        <Box className={classes.headerRight}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Buscar..."
            className={classes.searchField}
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#999", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" variant="outlined" className={classes.filterSelect}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="aberta">Aberta</MenuItem>
              <MenuItem value="paga">Paga</MenuItem>
              <MenuItem value="vencida">Vencida</MenuItem>
              <MenuItem value="cancelada">Cancelada</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" variant="outlined" className={classes.filterSelect}>
            <InputLabel>Categoria</InputLabel>
            <Select value={categoriaFilter} onChange={(e) => setCategoriaFilter(e.target.value)} label="Categoria">
              <MenuItem value="">Todas</MenuItem>
              {categorias.filter((c) => c.tipo === "despesa").map((cat) => (
                <MenuItem key={cat.id} value={String(cat.id)}>
                  <Box display="flex" alignItems="center" style={{ gap: 8 }}>
                    <Box width={10} height={10} borderRadius="50%" style={{ background: cat.cor || "#607d8b", flexShrink: 0 }} />
                    {cat.nome}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setDespesaModal({ open: true, despesa: null })}
          >
            Nova Despesa
          </Button>
        </Box>
      </Box>

      <Box className={classes.content}>
        <Box className={classes.tableWrapper}>
          <Table size="small">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Fornecedor</TableCell>
                <TableCell align="right">Valor</TableCell>
                <TableCell align="center">Vencimento</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {despesas.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.id}</TableCell>
                  <TableCell style={{ maxWidth: 240 }}>
                    <Typography variant="body2" noWrap title={d.descricao}>{d.descricao}</Typography>
                  </TableCell>
                  <TableCell>
                    {d.categoria ? (
                      <Box display="flex" alignItems="center" style={{ gap: 6 }}>
                        <Box width={10} height={10} borderRadius="50%"
                          style={{ background: d.categoria.cor || "#607d8b", flexShrink: 0 }} />
                        {d.categoria.nome}
                      </Box>
                    ) : "—"}
                  </TableCell>
                  <TableCell>{d.fornecedor?.nome || "—"}</TableCell>
                  <TableCell align="right" style={{ fontWeight: 600 }}>{fmtBRL(d.valor)}</TableCell>
                  <TableCell align="center">{fmtDate(d.dataVencimento)}</TableCell>
                  <TableCell align="center"><StatusChip status={d.status} /></TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" style={{ gap: 4 }}>
                      {d.status !== "paga" && d.status !== "cancelada" && (
                        <Tooltip title="Marcar como paga">
                          <IconButton size="small" className={classes.actionBtn}
                            onClick={() => setPagarDialog({ open: true, despesa: d, metodo: "pix" })}>
                            <PaymentIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Editar">
                        <IconButton size="small" className={classes.actionBtn}
                          onClick={() => setDespesaModal({ open: true, despesa: d })}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton size="small" className={classes.actionBtnDanger}
                          onClick={() => setConfirmModal({ open: true, despesa: d })}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {loading && (
            <Box className={classes.emptyState}><CircularProgress /></Box>
          )}

          {!loading && despesas.length === 0 && (
            <Box className={classes.emptyState}>
              <AttachMoneyIcon style={{ fontSize: 48, marginBottom: 12 }} />
              <Typography variant="h6" color="textSecondary">Nenhuma despesa encontrada</Typography>
              <Typography variant="body2" color="textSecondary">Crie sua primeira despesa para começar</Typography>
            </Box>
          )}
        </Box>

        {!loading && hasMore && (
          <Box className={classes.paginationBar}>
            <Button color="primary" onClick={() => setPageNumber((p) => p + 1)}>Carregar mais</Button>
          </Box>
        )}
      </Box>

      <DespesaModal
        open={despesaModal.open}
        onClose={() => setDespesaModal({ open: false, despesa: null })}
        despesa={despesaModal.despesa}
        onSaved={(d) => dispatch({ type: "LOAD", payload: [d] })}
      />

      <ConfirmationModal
        title="Excluir Despesa"
        open={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, despesa: null })}
        onConfirm={handleDelete}
      >
        Tem certeza que deseja excluir esta despesa? Esta ação não pode ser desfeita.
      </ConfirmationModal>

      {/* Dialog de pagamento */}
      <Dialog open={pagarDialog.open} onClose={() => setPagarDialog({ open: false, despesa: null, metodo: "pix" })} maxWidth="xs" fullWidth>
        <DialogTitle>Registrar Pagamento</DialogTitle>
        <DialogContent>
          <Typography variant="body2" style={{ marginBottom: 16 }}>
            {pagarDialog.despesa?.descricao} — {fmtBRL(pagarDialog.despesa?.valor)}
          </Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Método de pagamento</InputLabel>
            <Select
              value={pagarDialog.metodo}
              onChange={(e) => { const v = e.target.value; setPagarDialog((p) => ({ ...p, metodo: v })); }}
              label="Método de pagamento"
            >
              <MenuItem value="pix">Pix</MenuItem>
              <MenuItem value="boleto">Boleto</MenuItem>
              <MenuItem value="cartao">Cartão</MenuItem>
              <MenuItem value="transferencia">Transferência</MenuItem>
              <MenuItem value="dinheiro">Dinheiro</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPagarDialog({ open: false, despesa: null, metodo: "pix" })}>Cancelar</Button>
          <Button onClick={handlePagar} variant="contained" color="primary">Confirmar Pagamento</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContasPagar;
