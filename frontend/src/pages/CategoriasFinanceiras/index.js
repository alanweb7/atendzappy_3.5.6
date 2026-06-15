import React, { useState, useEffect, useReducer } from "react";
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
import LabelIcon from "@material-ui/icons/Label";

import toastError from "../../errors/toastError";
import { toast } from "react-toastify";
import {
  listFinanceiroCategorias,
  createFinanceiroCategoria,
  updateFinanceiroCategoria,
  deleteFinanceiroCategoria,
} from "../../services/financeiroCategorias";

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

const EMPTY_DIALOG = { open: false, cat: null, nome: "", tipo: "despesa", cor: "#607d8b" };

const CategoriasFinanceiras = () => {
  const classes = useStyles();

  const [categorias, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [tipoFilter, setTipoFilter] = useState("all");
  const [dialog, setDialog] = useState(EMPTY_DIALOG);

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam, tipoFilter]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const r = await listFinanceiroCategorias({
          searchParam,
          pageNumber,
          tipo: tipoFilter === "all" ? "" : tipoFilter,
        });
        const list = r?.categorias || r?.records || (Array.isArray(r) ? r : []);
        dispatch({ type: "LOAD", payload: list });
        setHasMore(r?.hasMore ?? false);
      } catch (err) {
        toastError(err);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchParam, pageNumber, tipoFilter]);

  const handleSave = async () => {
    if (!dialog.nome.trim()) { toast.error("Informe o nome da categoria."); return; }
    try {
      const payload = { nome: dialog.nome.trim(), tipo: dialog.tipo, cor: dialog.cor, ativo: true };
      const result = dialog.cat?.id
        ? await updateFinanceiroCategoria(dialog.cat.id, payload)
        : await createFinanceiroCategoria(payload);
      dispatch({ type: "LOAD", payload: [result] });
      toast.success(dialog.cat?.id ? "Categoria atualizada!" : "Categoria criada!");
      setDialog(EMPTY_DIALOG);
    } catch (err) {
      toastError(err);
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Excluir a categoria "${cat.nome}"?`)) return;
    try {
      await deleteFinanceiroCategoria(cat.id);
      dispatch({ type: "DELETE", payload: cat.id });
      toast.success("Categoria excluída!");
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Box className={classes.headerLeft}>
          <Box>
            <Typography className={classes.headerTitle}>Categorias Financeiras</Typography>
            <Typography className={classes.headerSubtitle}>Organize categorias de receitas e despesas</Typography>
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
            <InputLabel>Tipo</InputLabel>
            <Select value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)} label="Tipo">
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="receita">Receita</MenuItem>
              <MenuItem value="despesa">Despesa</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setDialog(EMPTY_DIALOG)}
          >
            Nova Categoria
          </Button>
        </Box>
      </Box>

      <Box className={classes.content}>
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
                    <Box
                      width={20}
                      height={20}
                      borderRadius="50%"
                      style={{ background: cat.cor || "#607d8b", display: "inline-block" }}
                    />
                  </TableCell>
                  <TableCell style={{ fontWeight: 500 }}>{cat.nome}</TableCell>
                  <TableCell>
                    <Chip
                      label={cat.tipo === "receita" ? "Receita" : "Despesa"}
                      size="small"
                      style={{
                        backgroundColor: cat.tipo === "receita" ? "#d1fae5" : "#fee2e2",
                        color: cat.tipo === "receita" ? "#10b981" : "#ef4444",
                        fontWeight: 600,
                        fontSize: "0.72rem",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" style={{ gap: 4 }}>
                      <Tooltip title="Editar">
                        <IconButton size="small" className={classes.actionBtn}
                          onClick={() => setDialog({ open: true, cat, nome: cat.nome, tipo: cat.tipo, cor: cat.cor || "#607d8b" })}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton size="small" className={classes.actionBtnDanger}
                          onClick={() => handleDelete(cat)}>
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

          {!loading && categorias.length === 0 && (
            <Box className={classes.emptyState}>
              <LabelIcon style={{ fontSize: 48, marginBottom: 12 }} />
              <Typography variant="h6" color="textSecondary">Nenhuma categoria cadastrada</Typography>
              <Typography variant="body2" color="textSecondary">Crie categorias para organizar suas contas</Typography>
            </Box>
          )}
        </Box>

        {!loading && hasMore && (
          <Box className={classes.paginationBar}>
            <Button color="primary" onClick={() => setPageNumber((p) => p + 1)}>Carregar mais</Button>
          </Box>
        )}
      </Box>

      {/* Dialog de criação/edição */}
      <Dialog
        open={dialog.open}
        onClose={() => setDialog(EMPTY_DIALOG)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{dialog.cat?.id ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome" fullWidth margin="dense" variant="outlined"
            value={dialog.nome}
            onChange={(e) => { const v = e.target.value; setDialog((p) => ({ ...p, nome: v })); }}
            autoFocus
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={dialog.tipo}
              onChange={(e) => { const v = e.target.value; setDialog((p) => ({ ...p, tipo: v })); }}
              label="Tipo"
            >
              <MenuItem value="despesa">Despesa</MenuItem>
              <MenuItem value="receita">Receita</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Cor" fullWidth margin="dense" variant="outlined"
            type="color"
            InputLabelProps={{ shrink: true }}
            value={dialog.cor}
            onChange={(e) => { const v = e.target.value; setDialog((p) => ({ ...p, cor: v })); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(EMPTY_DIALOG)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoriasFinanceiras;
