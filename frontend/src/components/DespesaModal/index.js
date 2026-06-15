import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { toast } from "react-toastify";

import {
  createFinanceiroDespesa,
  updateFinanceiroDespesa,
} from "../../services/financeiroDespesas";
import { listFinanceiroCategorias } from "../../services/financeiroCategorias";
import { listFinanceiroFornecedores } from "../../services/financeiroFornecedores";
import toastError from "../../errors/toastError";

const METODOS_PAGAMENTO = [
  { value: "", label: "Não definido" },
  { value: "pix", label: "PIX" },
  { value: "boleto", label: "Boleto" },
  { value: "cartao", label: "Cartão" },
  { value: "transferencia", label: "Transferência" },
  { value: "dinheiro", label: "Dinheiro" },
];

const TIPOS_RECORRENCIA = [
  { value: "diario", label: "Diário" },
  { value: "semanal", label: "Semanal" },
  { value: "mensal", label: "Mensal" },
  { value: "anual", label: "Anual" },
];

const STATUS_OPTIONS = [
  { value: "aberta", label: "Aberta" },
  { value: "paga", label: "Paga" },
  { value: "vencida", label: "Vencida" },
  { value: "cancelada", label: "Cancelada" },
];

const DEFAULT_FORM = {
  descricao: "",
  valor: "",
  dataVencimento: "",
  status: "aberta",
  categoriaId: "",
  fornecedorId: "",
  metodoPagamentoPrevisto: "",
  observacoes: "",
  recorrente: false,
  tipoRecorrencia: "mensal",
  quantidadeCiclos: "",
};

const DespesaModal = ({ open, onClose, despesa, onSaved }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    if (!open) return;
    const load = async () => {
      try {
        const [catResult, fornResult] = await Promise.all([
          listFinanceiroCategorias({ tipo: "despesa", ativa: true, pageNumber: 1 }),
          listFinanceiroFornecedores({ ativo: true, pageNumber: 1 }),
        ]);
        setCategorias(
          catResult?.categorias || catResult?.records || (Array.isArray(catResult) ? catResult : [])
        );
        setFornecedores(
          fornResult?.fornecedores || fornResult?.records || (Array.isArray(fornResult) ? fornResult : [])
        );
      } catch (err) {
        toastError(err);
      }
    };
    load();
  }, [open]);

  useEffect(() => {
    if (open && despesa) {
      setForm({
        descricao: despesa.descricao || "",
        valor: despesa.valor != null ? String(Number(despesa.valor).toFixed(2)) : "",
        dataVencimento: despesa.dataVencimento
          ? String(despesa.dataVencimento).substring(0, 10)
          : "",
        status: despesa.status || "aberta",
        categoriaId: despesa.categoriaId ? String(despesa.categoriaId) : "",
        fornecedorId: despesa.fornecedorId ? String(despesa.fornecedorId) : "",
        metodoPagamentoPrevisto: despesa.metodoPagamentoPrevisto || "",
        observacoes: despesa.observacoes || "",
        recorrente: despesa.recorrente || false,
        tipoRecorrencia: despesa.tipoRecorrencia || "mensal",
        quantidadeCiclos:
          despesa.quantidadeCiclos != null ? String(despesa.quantidadeCiclos) : "",
      });
    } else if (open) {
      setForm(DEFAULT_FORM);
    }
  }, [open, despesa]);

  const handleChange = (field) => (event) => {
    const value = field === "recorrente" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.descricao.trim()) {
      toast.error("Informe a descrição da despesa.");
      return;
    }
    if (!form.valor) {
      toast.error("Informe o valor da despesa.");
      return;
    }
    if (!form.dataVencimento) {
      toast.error("Informe a data de vencimento.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        descricao: form.descricao.trim(),
        valor: Number(String(form.valor).replace(",", ".")),
        dataVencimento: form.dataVencimento,
        status: form.status,
        categoriaId: form.categoriaId ? Number(form.categoriaId) : undefined,
        fornecedorId: form.fornecedorId ? Number(form.fornecedorId) : undefined,
        metodoPagamentoPrevisto: form.metodoPagamentoPrevisto || undefined,
        observacoes: form.observacoes || undefined,
        recorrente: form.recorrente,
        tipoRecorrencia: form.recorrente ? form.tipoRecorrencia : undefined,
        quantidadeCiclos:
          form.recorrente && form.quantidadeCiclos
            ? Number(form.quantidadeCiclos)
            : undefined,
      };

      const response = despesa?.id
        ? await updateFinanceiroDespesa(despesa.id, payload)
        : await createFinanceiroDespesa(payload);

      toast.success(despesa?.id ? "Despesa atualizada com sucesso" : "Despesa criada com sucesso");
      if (onSaved) onSaved(response);
      handleClose();
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{despesa?.id ? "Editar Despesa" : "Nova Despesa"}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              fullWidth
              margin="dense"
              value={form.descricao}
              onChange={handleChange("descricao")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Valor (R$)"
              fullWidth
              margin="dense"
              type="number"
              inputProps={{ min: 0, step: "0.01" }}
              value={form.valor}
              onChange={handleChange("valor")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Data de Vencimento"
              fullWidth
              margin="dense"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.dataVencimento}
              onChange={handleChange("dataVencimento")}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              fullWidth
              margin="dense"
              select
              value={form.status}
              onChange={handleChange("status")}
            >
              {STATUS_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Categoria"
              fullWidth
              margin="dense"
              select
              value={form.categoriaId}
              onChange={handleChange("categoriaId")}
            >
              <MenuItem value="">Sem categoria</MenuItem>
              {categorias.map((cat) => (
                <MenuItem key={cat.id} value={String(cat.id)}>
                  {cat.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Fornecedor"
              fullWidth
              margin="dense"
              select
              value={form.fornecedorId}
              onChange={handleChange("fornecedorId")}
            >
              <MenuItem value="">Sem fornecedor</MenuItem>
              {fornecedores.map((f) => (
                <MenuItem key={f.id} value={String(f.id)}>
                  {f.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Método de Pagamento Previsto"
              fullWidth
              margin="dense"
              select
              value={form.metodoPagamentoPrevisto}
              onChange={handleChange("metodoPagamentoPrevisto")}
            >
              {METODOS_PAGAMENTO.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Observações"
              fullWidth
              margin="dense"
              multiline
              rows={3}
              value={form.observacoes}
              onChange={handleChange("observacoes")}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.recorrente}
                  onChange={handleChange("recorrente")}
                  color="primary"
                />
              }
              label="Despesa recorrente"
            />
          </Grid>

          {form.recorrente && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Frequência"
                  fullWidth
                  margin="dense"
                  select
                  value={form.tipoRecorrencia}
                  onChange={handleChange("tipoRecorrencia")}
                >
                  {TIPOS_RECORRENCIA.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantidade de ciclos"
                  fullWidth
                  margin="dense"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={form.quantidadeCiclos}
                  onChange={handleChange("quantidadeCiclos")}
                  helperText="Deixe em branco para indeterminado"
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DespesaModal;
