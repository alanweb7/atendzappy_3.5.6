import React, { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import PaymentIcon from "@material-ui/icons/Payment";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SearchIcon from "@material-ui/icons/Search";
import SyncIcon from "@material-ui/icons/Sync";
import { toast } from "react-toastify";

import ConfirmationModal from "../../components/ConfirmationModal";
import DespesaModal from "../../components/DespesaModal";
import FaturaModal from "../../components/FaturaModal";
import PagamentoModal from "../../components/PagamentoModal";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";
import {
  createFinanceiroCategoria,
  deleteFinanceiroCategoria,
  listFinanceiroCategorias,
  updateFinanceiroCategoria,
} from "../../services/financeiroCategorias";
import {
  deleteFinanceiroDespesa,
  listFinanceiroDespesas,
  pagarFinanceiroDespesa,
} from "../../services/financeiroDespesas";
import {
  deleteFinanceiroFatura,
  listFinanceiroFaturas,
  syncSuperAdminContas,
} from "../../services/financeiroFaturas";
import {
  createFinanceiroFornecedor,
  deleteFinanceiroFornecedor,
  listFinanceiroFornecedores,
  updateFinanceiroFornecedor,
} from "../../services/financeiroFornecedores";

const makeReducer = (idFn = (i) => i.id) => (state, action) => {
  switch (action.type) {
    case "LOAD": {
      const incoming = action.payload || [];
      const updated = [...state];
      incoming.forEach((item) => {
        const idx = updated.findIndex((s) => idFn(s) === idFn(item));
        if (idx >= 0) updated[idx] = item;
        else updated.push(item);
      });
      return updated;
    }
    case "DELETE":
      return state.filter((s) => idFn(s) !== action.payload);
    case "RESET":
      return [];
    default:
      return state;
  }
};

const faturaReducer = makeReducer();
const despesaReducer = makeReducer();
const categoriaReducer = makeReducer();
const fornecedorReducer = makeReducer();

const fmtBRL = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(v) || 0);

const fmtDate = (v) => {
  if (!v) return "—";
  const s = String(v).substring(0, 10);
  const [y, m, d] = s.split("-");
  return `${d}/${m}/${y}`;
};

const STATUS_CONFIG = {
  aberta:    { text: "Aberta",    color: "#f59e0b", backgroundColor: "#fef3c7" },
  paga:      { text: "Paga",      color: "#10b981", backgroundColor: "#d1fae5" },
  vencida:   { text: "Vencida",   color: "#ef4444", backgroundColor: "#fee2e2" },
  cancelada: { text: "Cancelada", color: "#6b7280", backgroundColor: "#f3f4f6" },
};

const StatusChip = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.cancelada;
  return (
    <Chip
      label={cfg.text}
      size="small"
      style={{ backgroundColor: cfg.backgroundColor, color: cfg.color, fontWeight: 600, fontSize: "0.75rem" }}
    />
  );
};

const ORIGEM_CFG = {
  invoice_plano: { label: "Plano",       color: "#ede9fe", textColor: "#7c3aed" },
  credito_ia:    { label: "Créditos IA", color: "#dbeafe", textColor: "#1d4ed8" },
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
    minWidth: 200,
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      "& fieldset": { borderColor: "#e0e0e0" },
      "&:hover fieldset": { borderColor: theme.palette.primary.main },
    },
  },
  filterSelect: {
    minWidth: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    "& .MuiOutlinedInput-root": { borderRadius: 8 },
  },
  content: { padding: "0 24px 24px" },
  tabsBar: { borderBottom: "1px solid #e0e0e0", marginBottom: 16 },
  tableWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
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

const ContasFinanceiras = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const isSuperAdmin = Number(user?.companyId) === 1;

  const [tab, setTab] = useState(0);

  // Contadores de versão — incrementar força reload da aba correspondente
  const [dVersion, setDVersion] = useState(0);
  const [fVersion, setFVersion] = useState(0);

  const [faturas, dispatchF] = useReducer(faturaReducer, []);
  const [despesas, dispatchD] = useReducer(despesaReducer, []);
  const [categorias, dispatchC] = useReducer(categoriaReducer, []);
  const [fornecedores, dispatchForn] = useReducer(fornecedorReducer, []);
  const [allCategorias, setAllCategorias] = useState([]);

  const [fSearch, setFSearch] = useState("");
  const [fStatus, setFStatus] = useState("all");
  const [fPage, setFPage] = useState(1);
  const [fHasMore, setFHasMore] = useState(false);
  const [fLoading, setFLoading] = useState(false);

  const [dSearch, setDSearch] = useState("");
  const [dStatus, setDStatus] = useState("all");
  const [dCatId, setDCatId] = useState("");
  const [dPage, setDPage] = useState(1);
  const [dHasMore, setDHasMore] = useState(false);
  const [dLoading, setDLoading] = useState(false);

  const [cSearch, setCSearch] = useState("");
  const [cLoading, setCLoading] = useState(false);

  const [fornSearch, setFornSearch] = useState("");
  const [fornLoading, setFornLoading] = useState(false);
  const [fornHasMore, setFornHasMore] = useState(false);
  const [fornPage, setFornPage] = useState(1);
  const EMPTY_FORN = { open: false, forn: null, nome: "", documento: "", email: "", telefone: "", categoria: "", observacoes: "" };
  const [fornDialog, setFornDialog] = useState(EMPTY_FORN);

  const [faturaModal, setFaturaModal] = useState({ open: false, fatura: null });
  const [pagamentoModal, setPagamentoModal] = useState({ open: false, fatura: null });
  const [despesaModal, setDespesaModal] = useState({ open: false, despesa: null });
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, tipo: null });
  const [catDialog, setCatDialog] = useState({ open: false, cat: null, nome: "", tipo: "despesa", cor: "#607d8b" });
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    listFinanceiroCategorias({ pageNumber: 1 })
      .then((r) => setAllCategorias(r?.categorias || r?.records || (Array.isArray(r) ? r : [])))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (tab !== 0) return;
    let cancelled = false;
    setFLoading(true);
    if (fPage === 1) dispatchF({ type: "RESET" });
    const timer = setTimeout(async () => {
      try {
        const r = await listFinanceiroFaturas({
          searchParam: fSearch,
          status: fStatus === "all" ? "" : fStatus,
          pageNumber: fPage,
        });
        if (!cancelled) {
          dispatchF({ type: "LOAD", payload: r?.faturas || r?.records || (Array.isArray(r) ? r : []) });
          setFHasMore(r?.hasMore ?? false);
        }
      } catch (err) { if (!cancelled) toastError(err); }
      finally { if (!cancelled) setFLoading(false); }
    }, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [tab, fPage, fSearch, fStatus, fVersion]);

  useEffect(() => {
    if (tab !== 1) return;
    let cancelled = false;
    setDLoading(true);
    if (dPage === 1) dispatchD({ type: "RESET" });
    const timer = setTimeout(async () => {
      try {
        const r = await listFinanceiroDespesas({
          searchParam: dSearch,
          status: dStatus === "all" ? "" : dStatus,
          categoriaId: dCatId || undefined,
          pageNumber: dPage,
        });
        if (!cancelled) {
          dispatchD({ type: "LOAD", payload: r?.despesas || r?.records || (Array.isArray(r) ? r : []) });
          setDHasMore(r?.hasMore ?? false);
        }
      } catch (err) { if (!cancelled) toastError(err); }
      finally { if (!cancelled) setDLoading(false); }
    }, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [tab, dPage, dSearch, dStatus, dCatId, dVersion]);

  useEffect(() => {
    if (tab !== 3) return;
    let cancelled = false;
    setFornLoading(true);
    if (fornPage === 1) dispatchForn({ type: "RESET" });
    const timer = setTimeout(async () => {
      try {
        const r = await listFinanceiroFornecedores({ searchParam: fornSearch, pageNumber: fornPage });
        if (!cancelled) {
          dispatchForn({ type: "LOAD", payload: r?.fornecedores || r?.records || (Array.isArray(r) ? r : []) });
          setFornHasMore(r?.hasMore ?? false);
        }
      } catch (err) { if (!cancelled) toastError(err); }
      finally { if (!cancelled) setFornLoading(false); }
    }, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [tab, fornPage, fornSearch]);

  useEffect(() => {
    if (tab !== 2) return;
    let cancelled = false;
    setCLoading(true);
    dispatchC({ type: "RESET" });
    listFinanceiroCategorias({ searchParam: cSearch, pageNumber: 1 })
      .then((r) => {
        if (!cancelled) dispatchC({ type: "LOAD", payload: r?.categorias || r?.records || (Array.isArray(r) ? r : []) });
      })
      .catch((err) => { if (!cancelled) toastError(err); })
      .finally(() => { if (!cancelled) setCLoading(false); });
    return () => { cancelled = true; };
  }, [tab, cSearch]);

  const handleConfirmDelete = async () => {
    try {
      if (confirmModal.tipo === "fatura") {
        await deleteFinanceiroFatura(confirmModal.id);
        dispatchF({ type: "DELETE", payload: confirmModal.id });
        toast.success("Fatura excluída!");
      } else {
        await deleteFinanceiroDespesa(confirmModal.id);
        dispatchD({ type: "DELETE", payload: confirmModal.id });
        toast.success("Despesa excluída!");
      }
      setConfirmModal({ open: false, id: null, tipo: null });
    } catch (err) { toastError(err); }
  };

  const handlePagarDespesa = async (despesa) => {
    const metodo = window.prompt("Método de pagamento:\npix | boleto | cartao | transferencia | dinheiro", "pix");
    if (!metodo) return;
    try {
      await pagarFinanceiroDespesa(despesa.id, { metodoPagamento: metodo.trim(), dataPagamento: new Date().toISOString() });
      toast.success("Despesa marcada como paga!");
      dispatchD({ type: "RESET" });
      setDPage(1);
      setDVersion((v) => v + 1);
    } catch (err) { toastError(err); }
  };

  const handleSaveCategoria = async () => {
    if (!catDialog.nome.trim()) { toast.error("Informe o nome da categoria."); return; }
    try {
      const payload = { nome: catDialog.nome.trim(), tipo: catDialog.tipo, cor: catDialog.cor, ativo: true };
      const result = catDialog.cat?.id
        ? await updateFinanceiroCategoria(catDialog.cat.id, payload)
        : await createFinanceiroCategoria(payload);
      dispatchC({ type: "LOAD", payload: [result] });
      setAllCategorias((prev) => {
        const idx = prev.findIndex((c) => c.id === result.id);
        if (idx >= 0) { const n = [...prev]; n[idx] = result; return n; }
        return [result, ...prev];
      });
      toast.success(catDialog.cat?.id ? "Categoria atualizada!" : "Categoria criada!");
      setCatDialog((p) => ({ ...p, open: false }));
    } catch (err) { toastError(err); }
  };

  const handleSaveFornecedor = async () => {
    if (!fornDialog.nome.trim()) { toast.error("Informe o nome do fornecedor."); return; }
    try {
      const payload = {
        nome: fornDialog.nome.trim(),
        documento: fornDialog.documento.trim() || null,
        email: fornDialog.email.trim() || null,
        telefone: fornDialog.telefone.trim() || null,
        categoria: fornDialog.categoria.trim() || null,
        observacoes: fornDialog.observacoes.trim() || null,
        ativo: true,
      };
      const result = fornDialog.forn?.id
        ? await updateFinanceiroFornecedor(fornDialog.forn.id, payload)
        : await createFinanceiroFornecedor(payload);
      dispatchForn({ type: "LOAD", payload: [result] });
      toast.success(fornDialog.forn?.id ? "Fornecedor atualizado!" : "Fornecedor criado!");
      setFornDialog(EMPTY_FORN);
    } catch (err) { toastError(err); }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      const r = await syncSuperAdminContas();
      toast.success(`Sincronizado: ${r.created} criadas, ${r.updated} atualizadas`);
      dispatchF({ type: "RESET" });
      setFPage(1);
    } catch (err) { toastError(err); }
    finally { setSyncing(false); }
  };

  const handleNovo = () => {
    if (tab === 0) setFaturaModal({ open: true, fatura: null });
    if (tab === 1) setDespesaModal({ open: true, despesa: null });
    if (tab === 2) setCatDialog({ open: true, cat: null, nome: "", tipo: "despesa", cor: "#607d8b" });
    if (tab === 3) setFornDialog({ ...EMPTY_FORN, open: true });
  };

  const novoLabel = ["Nova Fatura", "Nova Despesa", "Nova Categoria", "Novo Fornecedor"][tab] || "Novo";

  // Filtros do header — variam por aba mas mantêm o mesmo espaçamento
  const headerFilters = (
    <>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Buscar..."
        className={classes.searchField}
        value={tab === 0 ? fSearch : tab === 1 ? dSearch : tab === 2 ? cSearch : fornSearch}
        onChange={(e) => {
          const v = e.target.value;
          if (tab === 0) { setFSearch(v); setFPage(1); dispatchF({ type: "RESET" }); }
          if (tab === 1) { setDSearch(v); setDPage(1); dispatchD({ type: "RESET" }); }
          if (tab === 2) setCSearch(v);
          if (tab === 3) { setFornSearch(v); setFornPage(1); dispatchForn({ type: "RESET" }); }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "#999", fontSize: 18 }} />
            </InputAdornment>
          ),
        }}
      />

      {tab !== 2 && tab !== 3 && (
        <FormControl size="small" variant="outlined" className={classes.filterSelect}>
          <InputLabel>Status</InputLabel>
          <Select
            value={tab === 0 ? fStatus : dStatus}
            onChange={(e) => {
              const v = e.target.value;
              if (tab === 0) { setFStatus(v); setFPage(1); dispatchF({ type: "RESET" }); }
              if (tab === 1) { setDStatus(v); setDPage(1); dispatchD({ type: "RESET" }); }
            }}
            label="Status"
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="aberta">Aberta</MenuItem>
            <MenuItem value="paga">Paga</MenuItem>
            <MenuItem value="vencida">Vencida</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
          </Select>
        </FormControl>
      )}

      {tab === 1 && (
        <FormControl size="small" variant="outlined" className={classes.filterSelect} style={{ minWidth: 170 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={dCatId}
            onChange={(e) => { setDCatId(e.target.value); setDPage(1); dispatchD({ type: "RESET" }); }}
            label="Categoria"
          >
            <MenuItem value="">Todas</MenuItem>
            {allCategorias.filter((c) => c.tipo === "despesa").map((cat) => (
              <MenuItem key={cat.id} value={String(cat.id)}>
                <Box display="flex" alignItems="center" style={{ gap: 8 }}>
                  <Box width={10} height={10} borderRadius="50%" style={{ background: cat.cor || "#607d8b", flexShrink: 0 }} />
                  {cat.nome}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Sincronizar apenas na aba A Receber e apenas para super admin */}
      {isSuperAdmin && tab === 0 && (
        <Button
          variant="outlined"
          startIcon={syncing ? <CircularProgress size={14} /> : <SyncIcon />}
          onClick={handleSync}
          disabled={syncing}
        >
          {syncing ? "Sincronizando..." : "Sincronizar"}
        </Button>
      )}

      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleNovo}>
        {novoLabel}
      </Button>
    </>
  );

  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Box className={classes.headerLeft}>
          <Box>
            <Typography className={classes.headerTitle}>Contas Financeiras</Typography>
            <Typography className={classes.headerSubtitle}>Gerencie contas a receber, a pagar e categorias</Typography>
          </Box>
        </Box>
        <Box className={classes.headerRight}>
          {headerFilters}
        </Box>
      </Box>

      <Box className={classes.content}>
        <Box className={classes.tabsBar}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} indicatorColor="primary" textColor="primary">
            <Tab label="A Receber" />
            <Tab label="A Pagar" />
            <Tab label="Categorias" />
            <Tab label="Fornecedores" />
          </Tabs>
        </Box>

        {/* ─── A Receber ─── */}
        {tab === 0 && (
          <>
            <Box className={classes.tableWrapper}>
              <Table size="small">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell align="right">Valor</TableCell>
                    <TableCell align="center">Vencimento</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Origem</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {faturas.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>{f.id}</TableCell>
                      <TableCell style={{ maxWidth: 260 }}>
                        <Typography variant="body2" noWrap title={f.descricao}>{f.descricao}</Typography>
                      </TableCell>
                      <TableCell>{f.client?.name || "—"}</TableCell>
                      <TableCell align="right" style={{ fontWeight: 600 }}>{fmtBRL(f.valor)}</TableCell>
                      <TableCell align="center">{fmtDate(f.dataVencimento)}</TableCell>
                      <TableCell align="center"><StatusChip status={f.status} /></TableCell>
                      <TableCell align="center">
                        {ORIGEM_CFG[f.tipoReferencia] && (
                          <Chip
                            label={ORIGEM_CFG[f.tipoReferencia].label}
                            size="small"
                            style={{
                              background: ORIGEM_CFG[f.tipoReferencia].color,
                              color: ORIGEM_CFG[f.tipoReferencia].textColor,
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" style={{ gap: 4 }}>
                          {f.status !== "paga" && f.status !== "cancelada" && (
                            <Tooltip title="Registrar pagamento">
                              <IconButton size="small" className={classes.actionBtn}
                                onClick={() => setPagamentoModal({ open: true, fatura: f })}>
                                <PaymentIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Editar">
                            <IconButton size="small" className={classes.actionBtn}
                              onClick={() => setFaturaModal({ open: true, fatura: f })}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton size="small" className={classes.actionBtnDanger}
                              onClick={() => setConfirmModal({ open: true, id: f.id, tipo: "fatura" })}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {fLoading && <Box className={classes.emptyState}><CircularProgress /></Box>}
              {!fLoading && faturas.length === 0 && (
                <Box className={classes.emptyState}>
                  <ReceiptIcon style={{ fontSize: 48, marginBottom: 12 }} />
                  <Typography variant="h6" color="textSecondary">Nenhuma fatura encontrada</Typography>
                  <Typography variant="body2" color="textSecondary">Crie sua primeira fatura para começar</Typography>
                </Box>
              )}
            </Box>
            {!fLoading && fHasMore && (
              <Box className={classes.paginationBar}>
                <Button color="primary" onClick={() => setFPage((p) => p + 1)}>Carregar mais</Button>
              </Box>
            )}
          </>
        )}

        {/* ─── A Pagar ─── */}
        {tab === 1 && (
          <>
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
                                onClick={() => handlePagarDespesa(d)}>
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
                              onClick={() => setConfirmModal({ open: true, id: d.id, tipo: "despesa" })}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {dLoading && <Box className={classes.emptyState}><CircularProgress /></Box>}
              {!dLoading && despesas.length === 0 && (
                <Box className={classes.emptyState}>
                  <AttachMoneyIcon style={{ fontSize: 48, marginBottom: 12 }} />
                  <Typography variant="h6" color="textSecondary">Nenhuma despesa encontrada</Typography>
                  <Typography variant="body2" color="textSecondary">Crie sua primeira despesa para começar</Typography>
                </Box>
              )}
            </Box>
            {!dLoading && dHasMore && (
              <Box className={classes.paginationBar}>
                <Button color="primary" onClick={() => setDPage((p) => p + 1)}>Carregar mais</Button>
              </Box>
            )}
          </>
        )}

        {/* ─── Categorias ─── */}
        {tab === 2 && (
          <>
            <Box className={classes.tableWrapper}>
              <Table size="small">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell style={{ width: 48 }}>Cor</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {categorias.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell>
                        <Box width={18} height={18} borderRadius="50%"
                          style={{ background: cat.cor || "#607d8b", display: "inline-block" }} />
                      </TableCell>
                      <TableCell style={{ fontWeight: 500 }}>{cat.nome}</TableCell>
                      <TableCell>
                        <Chip
                          label={cat.tipo === "receita" ? "Receita" : "Despesa"}
                          size="small"
                          style={{
                            backgroundColor: cat.tipo === "receita" ? "#d1fae5" : "#fee2e2",
                            color: cat.tipo === "receita" ? "#10b981" : "#ef4444",
                            fontWeight: 600, fontSize: "0.72rem",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" style={{ gap: 4 }}>
                          <Tooltip title="Ver despesas desta categoria">
                            <IconButton size="small" className={classes.actionBtn}
                              onClick={() => { setDCatId(String(cat.id)); setDPage(1); dispatchD({ type: "RESET" }); setTab(1); }}>
                              <FilterListIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <IconButton size="small" className={classes.actionBtn}
                              onClick={() => setCatDialog({ open: true, cat, nome: cat.nome, tipo: cat.tipo, cor: cat.cor || "#607d8b" })}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton size="small" className={classes.actionBtnDanger}
                              onClick={async () => {
                                if (!window.confirm("Excluir esta categoria?")) return;
                                try {
                                  await deleteFinanceiroCategoria(cat.id);
                                  dispatchC({ type: "DELETE", payload: cat.id });
                                  setAllCategorias((p) => p.filter((c) => c.id !== cat.id));
                                  toast.success("Categoria excluída!");
                                } catch (err) { toastError(err); }
                              }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {cLoading && <Box className={classes.emptyState}><CircularProgress /></Box>}
              {!cLoading && categorias.length === 0 && (
                <Box className={classes.emptyState}>
                  <AttachMoneyIcon style={{ fontSize: 48, marginBottom: 12 }} />
                  <Typography variant="h6" color="textSecondary">Nenhuma categoria cadastrada</Typography>
                  <Typography variant="body2" color="textSecondary">Crie categorias para organizar suas contas</Typography>
                </Box>
              )}
            </Box>
          </>
        )}
        {/* ─── Fornecedores ─── */}
        {tab === 3 && (
          <>
            <Box className={classes.tableWrapper}>
              <Table size="small">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Documento</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {fornecedores.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell style={{ fontWeight: 500 }}>{f.nome}</TableCell>
                      <TableCell>{f.documento || "—"}</TableCell>
                      <TableCell>{f.email || "—"}</TableCell>
                      <TableCell>{f.telefone || "—"}</TableCell>
                      <TableCell>{f.categoria || "—"}</TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" style={{ gap: 4 }}>
                          <Tooltip title="Editar">
                            <IconButton size="small" className={classes.actionBtn}
                              onClick={() => setFornDialog({
                                open: true, forn: f,
                                nome: f.nome, documento: f.documento || "",
                                email: f.email || "", telefone: f.telefone || "",
                                categoria: f.categoria || "", observacoes: f.observacoes || "",
                              })}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton size="small" className={classes.actionBtnDanger}
                              onClick={async () => {
                                if (!window.confirm(`Excluir o fornecedor "${f.nome}"?`)) return;
                                try {
                                  await deleteFinanceiroFornecedor(f.id);
                                  dispatchForn({ type: "DELETE", payload: f.id });
                                  toast.success("Fornecedor excluído!");
                                } catch (err) { toastError(err); }
                              }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {fornLoading && <Box className={classes.emptyState}><CircularProgress /></Box>}
              {!fornLoading && fornecedores.length === 0 && (
                <Box className={classes.emptyState}>
                  <AttachMoneyIcon style={{ fontSize: 48, marginBottom: 12 }} />
                  <Typography variant="h6" color="textSecondary">Nenhum fornecedor cadastrado</Typography>
                  <Typography variant="body2" color="textSecondary">Cadastre fornecedores para usar nas despesas</Typography>
                </Box>
              )}
            </Box>
            {!fornLoading && fornHasMore && (
              <Box className={classes.paginationBar}>
                <Button color="primary" onClick={() => setFornPage((p) => p + 1)}>Carregar mais</Button>
              </Box>
            )}
          </>
        )}
      </Box>

      <FaturaModal
        open={faturaModal.open}
        onClose={() => setFaturaModal({ open: false, fatura: null })}
        fatura={faturaModal.fatura}
        onSaved={() => { dispatchF({ type: "RESET" }); setFPage(1); setFVersion((v) => v + 1); }}
      />

      <PagamentoModal
        open={pagamentoModal.open}
        onClose={() => { setPagamentoModal({ open: false, fatura: null }); dispatchF({ type: "RESET" }); setFPage(1); setFVersion((v) => v + 1); }}
        fatura={pagamentoModal.fatura}
      />

      <DespesaModal
        open={despesaModal.open}
        onClose={() => setDespesaModal({ open: false, despesa: null })}
        despesa={despesaModal.despesa}
        onSaved={() => { dispatchD({ type: "RESET" }); setDPage(1); setDVersion((v) => v + 1); }}
      />

      <ConfirmationModal
        title={confirmModal.tipo === "fatura" ? "Excluir Fatura" : "Excluir Despesa"}
        open={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, id: null, tipo: null })}
        onConfirm={handleConfirmDelete}
      >
        Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.
      </ConfirmationModal>

      <Dialog open={catDialog.open} onClose={() => setCatDialog((p) => ({ ...p, open: false }))} maxWidth="xs" fullWidth>
        <DialogTitle>{catDialog.cat?.id ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome" fullWidth margin="dense" variant="outlined"
            value={catDialog.nome}
            onChange={(e) => { const v = e.target.value; setCatDialog((p) => ({ ...p, nome: v })); }}
            autoFocus
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={catDialog.tipo}
              onChange={(e) => { const v = e.target.value; setCatDialog((p) => ({ ...p, tipo: v })); }}
              label="Tipo"
            >
              <MenuItem value="despesa">Despesa</MenuItem>
              <MenuItem value="receita">Receita</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Cor" fullWidth margin="dense" variant="outlined"
            type="color" InputLabelProps={{ shrink: true }}
            value={catDialog.cor}
            onChange={(e) => { const v = e.target.value; setCatDialog((p) => ({ ...p, cor: v })); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCatDialog((p) => ({ ...p, open: false }))}>Cancelar</Button>
          <Button onClick={handleSaveCategoria} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog fornecedor */}
      <Dialog open={fornDialog.open} onClose={() => setFornDialog(EMPTY_FORN)} maxWidth="sm" fullWidth>
        <DialogTitle>{fornDialog.forn?.id ? "Editar Fornecedor" : "Novo Fornecedor"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome *" fullWidth margin="dense" variant="outlined"
            value={fornDialog.nome}
            onChange={(e) => { const v = e.target.value; setFornDialog((p) => ({ ...p, nome: v })); }}
            autoFocus
          />
          <TextField
            label="CPF / CNPJ" fullWidth margin="dense" variant="outlined"
            value={fornDialog.documento}
            onChange={(e) => { const v = e.target.value; setFornDialog((p) => ({ ...p, documento: v })); }}
          />
          <TextField
            label="Email" fullWidth margin="dense" variant="outlined" type="email"
            value={fornDialog.email}
            onChange={(e) => { const v = e.target.value; setFornDialog((p) => ({ ...p, email: v })); }}
          />
          <TextField
            label="Telefone" fullWidth margin="dense" variant="outlined"
            value={fornDialog.telefone}
            onChange={(e) => { const v = e.target.value; setFornDialog((p) => ({ ...p, telefone: v })); }}
          />
          <TextField
            label="Categoria / Tipo" fullWidth margin="dense" variant="outlined"
            placeholder="Ex: Serviços, Produtos, Software..."
            value={fornDialog.categoria}
            onChange={(e) => { const v = e.target.value; setFornDialog((p) => ({ ...p, categoria: v })); }}
          />
          <TextField
            label="Observações" fullWidth margin="dense" variant="outlined" multiline rows={3}
            value={fornDialog.observacoes}
            onChange={(e) => { const v = e.target.value; setFornDialog((p) => ({ ...p, observacoes: v })); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFornDialog(EMPTY_FORN)}>Cancelar</Button>
          <Button onClick={handleSaveFornecedor} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContasFinanceiras;
