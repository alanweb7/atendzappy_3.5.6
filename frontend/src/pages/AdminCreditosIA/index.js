import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import { toast } from "react-toastify";
import api from "../../services/api";

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
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
}));

const emptyPackage = { name: "", credits: "", priceInCents: "", description: "", isActive: true };

const formatCents = (cents) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const AdminCreditosIA = () => {
  const classes = useStyles();
  const [packages, setPackages] = useState([]);
  const [usageRows, setUsageRows] = useState([]);
  const [loadingPkg, setLoadingPkg] = useState(true);
  const [loadingUsage, setLoadingUsage] = useState(true);

  // pkg modal
  const [pkgModal, setPkgModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [pkgForm, setPkgForm] = useState(emptyPackage);
  const [savingPkg, setSavingPkg] = useState(false);

  // grant credits
  const [grantCompanyId, setGrantCompanyId] = useState("");
  const [grantCredits, setGrantCredits] = useState("");
  const [granting, setGranting] = useState(false);
  const [companies, setCompanies] = useState([]);

  const fetchPackages = useCallback(async () => {
    try {
      const { data } = await api.get("/ai-credits/packages");
      setPackages(data);
    } catch {
      toast.error("Erro ao carregar pacotes.");
    } finally {
      setLoadingPkg(false);
    }
  }, []);

  const fetchUsage = useCallback(async () => {
    try {
      const { data } = await api.get("/ai-credits/admin/usage");
      setUsageRows(data);
    } catch {
      toast.error("Erro ao carregar uso das empresas.");
    } finally {
      setLoadingUsage(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
    fetchUsage();
    api.get("/companiesPlan/", { params: { searchParam: "", pageNumber: 1 } })
      .then(({ data }) => setCompanies(data.companies || []))
      .catch(() => {});
  }, [fetchPackages, fetchUsage]);

  const openCreate = () => {
    setEditingPkg(null);
    setPkgForm(emptyPackage);
    setPkgModal(true);
  };

  const openEdit = (pkg) => {
    setEditingPkg(pkg);
    setPkgForm({
      name: pkg.name,
      credits: pkg.credits,
      priceInCents: pkg.priceInCents,
      description: pkg.description || "",
      isActive: pkg.isActive,
    });
    setPkgModal(true);
  };

  const handleSavePkg = async () => {
    setSavingPkg(true);
    try {
      const payload = {
        ...pkgForm,
        credits: Number(pkgForm.credits),
        priceInCents: Number(pkgForm.priceInCents),
      };
      if (editingPkg) {
        await api.put(`/ai-credits/packages/${editingPkg.id}`, payload);
        toast.success("Pacote atualizado.");
      } else {
        await api.post("/ai-credits/packages", payload);
        toast.success("Pacote criado.");
      }
      setPkgModal(false);
      fetchPackages();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Erro ao salvar pacote.");
    } finally {
      setSavingPkg(false);
    }
  };

  const handleDeletePkg = async (pkg) => {
    if (!window.confirm(`Desativar pacote "${pkg.name}"?`)) return;
    try {
      await api.delete(`/ai-credits/packages/${pkg.id}`);
      toast.success("Pacote desativado.");
      fetchPackages();
    } catch {
      toast.error("Erro ao desativar pacote.");
    }
  };

  const handleGrant = async () => {
    if (!grantCompanyId || !grantCredits) return toast.error("Preencha empresa e quantidade.");
    setGranting(true);
    try {
      await api.post("/ai-credits/grant", {
        companyId: Number(grantCompanyId),
        credits: Number(grantCredits),
      });
      toast.success("Créditos concedidos.");
      setGrantCompanyId("");
      setGrantCredits("");
      fetchUsage();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Erro ao conceder créditos.");
    } finally {
      setGranting(false);
    }
  };

  return (
    <MainContainer>
      <MainHeader>
        <Title>Créditos IA — Administração</Title>
      </MainHeader>

      <Paper className={classes.mainPaper}>

        {/* Pacotes */}
        <div className={classes.section}>
          <div className={classes.sectionTitle}>
            <Typography variant="h6">Pacotes de créditos</Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openCreate}>
              Novo pacote
            </Button>
          </div>
          {loadingPkg ? (
            <CircularProgress size={24} />
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Créditos</TableCell>
                  <TableCell align="right">Preço</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.name}</TableCell>
                    <TableCell align="right">{pkg.credits.toLocaleString("pt-BR")}</TableCell>
                    <TableCell align="right">{formatCents(pkg.priceInCents)}</TableCell>
                    <TableCell>{pkg.isActive ? "Ativo" : "Inativo"}</TableCell>
                    <TableCell>{pkg.description || "-"}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => openEdit(pkg)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeletePkg(pkg)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {packages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">Nenhum pacote cadastrado.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <Divider style={{ marginBottom: 24 }} />

        {/* Concessão manual */}
        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>Conceder créditos manualmente</Typography>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Empresa</InputLabel>
                <Select
                  value={grantCompanyId}
                  onChange={(e) => setGrantCompanyId(e.target.value)}
                  label="Empresa"
                >
                  {companies.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name} (ID: {c.id})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Quantidade de créditos"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                value={grantCredits}
                onChange={(e) => setGrantCredits(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={granting}
                onClick={handleGrant}
              >
                {granting ? <CircularProgress size={20} color="inherit" /> : "Conceder"}
              </Button>
            </Grid>
          </Grid>
        </div>

        <Divider style={{ marginBottom: 24 }} />

        {/* Uso por empresa */}
        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>Uso do mês atual por empresa</Typography>
          {loadingUsage ? (
            <CircularProgress size={24} />
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Empresa</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Créditos usados</TableCell>
                  <TableCell align="right">Créditos extras</TableCell>
                  <TableCell>Período</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usageRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.companyName}</TableCell>
                    <TableCell>{row.companyId}</TableCell>
                    <TableCell align="right">{row.tokensUsed.toLocaleString("pt-BR")}</TableCell>
                    <TableCell align="right">{row.extraCredits.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{row.period}</TableCell>
                  </TableRow>
                ))}
                {usageRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">Nenhum uso registrado neste mês.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </Paper>

      {/* Modal criar/editar pacote */}
      <Dialog open={pkgModal} onClose={() => setPkgModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingPkg ? "Editar pacote" : "Novo pacote"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: 4 }}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                variant="outlined"
                size="small"
                fullWidth
                value={pkgForm.name}
                onChange={(e) => { const v = e.target.value; setPkgForm((p) => ({ ...p, name: v })); }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Créditos"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                value={pkgForm.credits}
                onChange={(e) => { const v = e.target.value; setPkgForm((p) => ({ ...p, credits: v })); }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Preço (centavos)"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                helperText={pkgForm.priceInCents ? formatCents(Number(pkgForm.priceInCents)) : ""}
                value={pkgForm.priceInCents}
                onChange={(e) => { const v = e.target.value; setPkgForm((p) => ({ ...p, priceInCents: v })); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descrição"
                variant="outlined"
                size="small"
                fullWidth
                value={pkgForm.description}
                onChange={(e) => { const v = e.target.value; setPkgForm((p) => ({ ...p, description: v })); }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pkgForm.isActive}
                    onChange={(e) => { const v = e.target.checked; setPkgForm((p) => ({ ...p, isActive: v })); }}
                    color="primary"
                  />
                }
                label="Ativo"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPkgModal(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSavePkg}
            disabled={savingPkg}
          >
            {savingPkg ? <CircularProgress size={20} color="inherit" /> : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
};

export default AdminCreditosIA;
