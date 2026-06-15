import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

import toastError from "../../errors/toastError";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";

import usePlans from "../../hooks/usePlans";
import { AuthContext } from "../../context/Auth/AuthContext";
import ApiPostmanDownload from "../../components/ApiPostmanDownload";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(2),
    paddingBottom: 100
  },
  elementMargin: {
    padding: theme.spacing(2)
  },
  formContainer: {
    maxWidth: 520
  },
  textRight: {
    textAlign: "right"
  },
  resultBox: {
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: 13,
    padding: theme.spacing(2),
    borderRadius: 8,
    overflowX: "auto"
  },
  webhookBox: {
    background: "#1e293b",
    color: "#94a3b8",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: 12,
    padding: theme.spacing(2),
    borderRadius: 8,
    overflowX: "auto"
  }
}));

const ApiProdutosPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { getPlanCompany } = usePlans();

  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    async function checkPermission() {
      const companyId = user.companyId;
      const planConfigs = await getPlanCompany(undefined, companyId);
      if (!planConfigs.plan.useExternalApi) {
        toast.error("Esta empresa não possui permissão para acessar essa página!");
        setTimeout(() => {
          history.push(`/`);
        }, 1000);
      }
    }
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductsEndpoint = () => `${process.env.REACT_APP_BACKEND_URL}/api/external/products`;
  const getCategoriesEndpoint = () => `${process.env.REACT_APP_BACKEND_URL}/api/external/product-categories`;

  const postmanRequests = [
    {
      name: "Listar produtos",
      method: "GET",
      url: getProductsEndpoint(),
      description: "Retorna os produtos externos cadastrados. Filtros opcionais: tipo, categoriaId."
    },
    {
      name: "Buscar produto por ID",
      method: "GET",
      url: `${getProductsEndpoint()}/1`,
      description: "Substitua o ID ao final da URL para consultar um produto específico."
    },
    {
      name: "Criar produto",
      method: "POST",
      url: getProductsEndpoint(),
      description: "Cria um novo produto externo.",
      body: {
        nome: "Corte de cabelo",
        tipo: "servico",
        valor: 149.9,
        descricao: "Produto de exemplo",
        status: "disponivel"
      }
    },
    {
      name: "Atualizar produto",
      method: "PUT",
      url: `${getProductsEndpoint()}/1`,
      description: "Altere o ID para atualizar o produto desejado.",
      body: { nome: "Corte de cabelo (novo)", status: "indisponivel" }
    },
    {
      name: "Remover produto",
      method: "DELETE",
      url: `${getProductsEndpoint()}/1`,
      description: "Remove definitivamente o produto informado no path."
    },
    {
      name: "Listar categorias",
      method: "GET",
      url: getCategoriesEndpoint(),
      description: "Retorna todas as categorias de produtos."
    },
    {
      name: "Criar categoria",
      method: "POST",
      url: getCategoriesEndpoint(),
      description: "Cria uma nova categoria de produto.",
      body: { nome: "Cortes", slug: "cortes", descricao: "Serviços de corte" }
    },
    {
      name: "Atualizar categoria",
      method: "PUT",
      url: `${getCategoriesEndpoint()}/1`,
      description: "Atualiza uma categoria existente.",
      body: { nome: "Cortes e Penteados" }
    },
    {
      name: "Remover categoria",
      method: "DELETE",
      url: `${getCategoriesEndpoint()}/1`,
      description: "Remove a categoria (somente se não tiver produtos vinculados)."
    }
  ];

  const formatJSON = (data) => JSON.stringify(data, null, 2);

  const cleanProduct = (product) => ({
    id: product.id,
    nome: product.nome,
    tipo: product.tipo,
    valor: Number(product.valor || 0),
    status: product.status,
    descricao: product.descricao,
    imagemPrincipal: product.imagem_principal,
    galeria: product.galeria,
    dadosEspecificos: product.dados_especificos
  });

  const cleanCategory = (cat) => ({
    id: cat.id,
    nome: cat.nome,
    slug: cat.slug,
    descricao: cat.descricao,
    createdAt: cat.createdAt
  });

  const saveResult = (title, payload) => {
    setTestResult({
      title,
      payload: typeof payload === "string" ? payload : formatJSON(payload),
      timestamp: new Date().toLocaleString()
    });
  };

  const handleListProducts = async (token, tipo, categoriaId) => {
    try {
      const params = {};
      if (tipo) params.tipo = tipo;
      if (categoriaId) params.categoriaId = categoriaId;
      const { data } = await axios.get(getProductsEndpoint(), {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      saveResult("Lista de produtos", { ...data, products: data.products?.map(cleanProduct) });
      toast.success("Produtos carregados!");
    } catch (err) {
      toastError(err);
    }
  };

  const handleShowProduct = async (token, productId) => {
    try {
      const { data } = await axios.get(`${getProductsEndpoint()}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      saveResult(`Produto ${productId}`, cleanProduct(data));
      toast.success("Produto carregado!");
    } catch (err) {
      toastError(err);
    }
  };

  const buildProductPayload = (values) => {
    const payload = {
      nome: values.nome,
      tipo: values.tipo,
      valor: values.valor ? Number(values.valor) : undefined,
      descricao: values.descricao || null,
      status: values.status || undefined
    };
    if (values.dadosEspecificos) {
      try {
        payload.dados_especificos = JSON.parse(values.dadosEspecificos);
      } catch {
        throw new Error("JSON inválido em dados específicos.");
      }
    }
    return payload;
  };

  const handleCreateProduct = async (values) => {
    try {
      const payload = buildProductPayload(values);
      const { data } = await axios.post(getProductsEndpoint(), payload, {
        headers: { Authorization: `Bearer ${values.token}` }
      });
      saveResult("Produto criado", cleanProduct(data));
      toast.success("Produto criado com sucesso!");
    } catch (err) {
      if (err.message?.includes("JSON inválido")) { toast.error(err.message); return; }
      toastError(err);
    }
  };

  const handleUpdateProduct = async (values) => {
    try {
      const payload = buildProductPayload(values);
      const { data } = await axios.put(`${getProductsEndpoint()}/${values.productId}`, payload, {
        headers: { Authorization: `Bearer ${values.token}` }
      });
      saveResult("Produto atualizado", cleanProduct(data));
      toast.success("Produto atualizado com sucesso!");
    } catch (err) {
      if (err.message?.includes("JSON inválido")) { toast.error(err.message); return; }
      toastError(err);
    }
  };

  const handleDeleteProduct = async (values) => {
    try {
      await axios.delete(`${getProductsEndpoint()}/${values.productId}`, {
        headers: { Authorization: `Bearer ${values.token}` }
      });
      saveResult("Produto removido", { id: values.productId, deleted: true });
      toast.success("Produto removido!");
    } catch (err) {
      toastError(err);
    }
  };

  const handleListCategories = async (token) => {
    try {
      const { data } = await axios.get(getCategoriesEndpoint(), {
        headers: { Authorization: `Bearer ${token}` }
      });
      saveResult("Lista de categorias", { ...data, categories: data.categories?.map(cleanCategory) });
      toast.success("Categorias carregadas!");
    } catch (err) {
      toastError(err);
    }
  };

  const handleShowCategory = async (token, categoryId) => {
    try {
      const { data } = await axios.get(`${getCategoriesEndpoint()}/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      saveResult(`Categoria ${categoryId}`, cleanCategory(data));
      toast.success("Categoria carregada!");
    } catch (err) {
      toastError(err);
    }
  };

  const handleCreateCategory = async (values) => {
    try {
      const { data } = await axios.post(getCategoriesEndpoint(), {
        nome: values.nome,
        slug: values.slug || null,
        descricao: values.descricao || null
      }, { headers: { Authorization: `Bearer ${values.token}` } });
      saveResult("Categoria criada", cleanCategory(data));
      toast.success("Categoria criada com sucesso!");
    } catch (err) {
      toastError(err);
    }
  };

  const handleUpdateCategory = async (values) => {
    try {
      const { data } = await axios.put(`${getCategoriesEndpoint()}/${values.categoryId}`, {
        nome: values.nome || undefined,
        slug: values.slug || undefined,
        descricao: values.descricao || undefined
      }, { headers: { Authorization: `Bearer ${values.token}` } });
      saveResult("Categoria atualizada", cleanCategory(data));
      toast.success("Categoria atualizada com sucesso!");
    } catch (err) {
      toastError(err);
    }
  };

  const handleDeleteCategory = async (values) => {
    try {
      await axios.delete(`${getCategoriesEndpoint()}/${values.categoryId}`, {
        headers: { Authorization: `Bearer ${values.token}` }
      });
      saveResult("Categoria removida", { id: values.categoryId, deleted: true });
      toast.success("Categoria removida!");
    } catch (err) {
      toastError(err);
    }
  };

  const renderListAndShowForm = () => (
    <Formik
      initialValues={{ token: "", productId: "", tipo: "", categoriaId: "" }}
      onSubmit={(values) => handleListProducts(values.token, values.tipo, values.categoriaId)}
    >
      {({ values, isSubmitting }) => (
        <Form className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Token" name="token" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Product ID (opcional para buscar um)" name="productId" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Filtrar por tipo (opcional)" name="tipo" variant="outlined" margin="dense" fullWidth placeholder="produto, servico..." />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Filtrar por Categoria ID (opcional)" name="categoriaId" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.textRight}>
              <Button type="submit" variant="contained" startIcon={<SendIcon />} disabled={isSubmitting} style={{ marginRight: 8 }}>
                {isSubmitting ? <CircularProgress size={20} /> : "Listar todos"}
              </Button>
              <Button variant="outlined" onClick={() => {
                if (!values.productId) { toast.error("Informe o Product ID para buscar um registro."); return; }
                handleShowProduct(values.token, values.productId);
              }}>
                Buscar por ID
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  const renderCreateForm = () => (
    <Formik
      initialValues={{ token: "", nome: "", tipo: "", descricao: "", valor: "", status: "disponivel", dadosEspecificos: "" }}
      onSubmit={async (values, actions) => { await handleCreateProduct(values); actions.setSubmitting(false); }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Token" name="token" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Nome" name="nome" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Tipo" name="tipo" variant="outlined" margin="dense" fullWidth required placeholder="produto, serviço..." />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Valor" name="valor" variant="outlined" margin="dense" fullWidth required type="number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Status" name="status" variant="outlined" margin="dense" fullWidth placeholder="disponivel, indisponivel..." />
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} label="Descrição" name="descricao" variant="outlined" margin="dense" fullWidth multiline minRows={3} />
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} label='Dados específicos (JSON)' name="dadosEspecificos" variant="outlined" margin="dense" fullWidth multiline minRows={3} placeholder='{"cor": "vermelho"}' />
            </Grid>
            <Grid item xs={12} className={classes.textRight}>
              <Button type="submit" startIcon={<SendIcon />} variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} /> : "Criar produto"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  const renderUpdateForm = () => (
    <Formik
      initialValues={{ token: "", productId: "", nome: "", tipo: "", descricao: "", valor: "", status: "", dadosEspecificos: "" }}
      onSubmit={async (values, actions) => { await handleUpdateProduct(values); actions.setSubmitting(false); }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Token" name="token" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Product ID" name="productId" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Nome" name="nome" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Tipo" name="tipo" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Status" name="status" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Valor" name="valor" type="number" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Descrição" name="descricao" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} label='Dados específicos (JSON)' name="dadosEspecificos" variant="outlined" margin="dense" fullWidth multiline minRows={3} placeholder='{"cor": "vermelho"}' />
            </Grid>
            <Grid item xs={12} className={classes.textRight}>
              <Button type="submit" startIcon={<SendIcon />} variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} /> : "Atualizar produto"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  const renderDeleteForm = () => (
    <Formik
      initialValues={{ token: "", productId: "" }}
      onSubmit={async (values, actions) => { await handleDeleteProduct(values); actions.setSubmitting(false); }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Token" name="token" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Product ID" name="productId" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} className={classes.textRight}>
              <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} /> : "Excluir produto"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  const renderListCategoriesForm = () => (
    <Formik
      initialValues={{ token: "", categoryId: "" }}
      onSubmit={(values) => handleListCategories(values.token)}
    >
      {({ values, isSubmitting }) => (
        <Form className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Token" name="token" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Category ID (opcional para buscar uma)" name="categoryId" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.textRight}>
              <Button type="submit" variant="contained" startIcon={<SendIcon />} disabled={isSubmitting} style={{ marginRight: 8 }}>
                {isSubmitting ? <CircularProgress size={20} /> : "Listar todas"}
              </Button>
              <Button variant="outlined" onClick={() => {
                if (!values.categoryId) { toast.error("Informe o Category ID."); return; }
                handleShowCategory(values.token, values.categoryId);
              }}>
                Buscar por ID
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  const renderCreateCategoryForm = () => (
    <Formik
      initialValues={{ token: "", nome: "", slug: "", descricao: "" }}
      onSubmit={async (values, actions) => { await handleCreateCategory(values); actions.setSubmitting(false); }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Token" name="token" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Nome" name="nome" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Slug (opcional)" name="slug" variant="outlined" margin="dense" fullWidth placeholder="minha-categoria" />
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} label="Descrição (opcional)" name="descricao" variant="outlined" margin="dense" fullWidth multiline minRows={2} />
            </Grid>
            <Grid item xs={12} className={classes.textRight}>
              <Button type="submit" startIcon={<SendIcon />} variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} /> : "Criar categoria"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  const renderUpdateCategoryForm = () => (
    <Formik
      initialValues={{ token: "", categoryId: "", nome: "", slug: "", descricao: "" }}
      onSubmit={async (values, actions) => { await handleUpdateCategory(values); actions.setSubmitting(false); }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Token" name="token" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Category ID" name="categoryId" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Nome" name="nome" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Slug" name="slug" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field as={TextField} label="Descrição" name="descricao" variant="outlined" margin="dense" fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.textRight}>
              <Button type="submit" startIcon={<SendIcon />} variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} /> : "Atualizar categoria"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  const renderDeleteCategoryForm = () => (
    <Formik
      initialValues={{ token: "", categoryId: "" }}
      onSubmit={async (values, actions) => { await handleDeleteCategory(values); actions.setSubmitting(false); }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Token" name="token" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field as={TextField} label="Category ID" name="categoryId" variant="outlined" margin="dense" fullWidth required />
            </Grid>
            <Grid item xs={12} className={classes.textRight}>
              <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} /> : "Excluir categoria"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  return (
    <Paper className={classes.mainPaper} variant="outlined">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <div>
          <Typography variant="h5">API de Produtos</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Gere, consulte e sincronize produtos e categorias externos utilizando os tokens desta conta.
          </Typography>
        </div>
        <Button startIcon={<ReplyIcon />} variant="outlined" onClick={() => history.push("/messages-api")}>
          Voltar para tokens
        </Button>
      </Box>

      <Box mb={4}>
        <Typography variant="h6">Visão geral — Produtos</Typography>
        <Typography component="div" color="textSecondary">
          <ul>
            <li><b>Listar produtos:</b> GET {getProductsEndpoint()} <br /><small>Filtros opcionais: <code>?tipo=produto</code> | <code>?categoriaId=3</code></small></li>
            <li><b>Buscar produto:</b> GET {getProductsEndpoint()}/:id</li>
            <li><b>Criar produto:</b> POST {getProductsEndpoint()}</li>
            <li><b>Atualizar produto:</b> PUT {getProductsEndpoint()}/:id</li>
            <li><b>Excluir produto:</b> DELETE {getProductsEndpoint()}/:id</li>
          </ul>
        </Typography>
        <Typography variant="h6" style={{ marginTop: 16 }}>Visão geral — Categorias</Typography>
        <Typography component="div" color="textSecondary">
          <ul>
            <li><b>Listar categorias:</b> GET {getCategoriesEndpoint()}</li>
            <li><b>Buscar categoria:</b> GET {getCategoriesEndpoint()}/:id</li>
            <li><b>Criar categoria:</b> POST {getCategoriesEndpoint()}</li>
            <li><b>Atualizar categoria:</b> PUT {getCategoriesEndpoint()}/:id</li>
            <li><b>Excluir categoria:</b> DELETE {getCategoriesEndpoint()}/:id</li>
          </ul>
          Sempre envie o header <code>Authorization: Bearer {"{token}"}</code> com um token ativo gerado na página de API.
        </Typography>
      </Box>

      <Divider />

      <ApiPostmanDownload
        collectionName="Whaticket - API de Produtos"
        requests={postmanRequests}
        filename="whaticket-api-produtos.json"
        helperText="Informe o token e clique em baixar para importar no Postman."
      />

      {/* ===== PRODUTOS ===== */}
      <Box mt={4}>
        <Typography variant="h6" color="primary">1. Consultar produtos</Typography>
        <Typography color="textSecondary">
          Filtros opcionais: <b>tipo</b> e <b>categoriaId</b>. Informe apenas o token para listar todos.
        </Typography>
        {renderListAndShowForm()}
      </Box>

      <Divider style={{ margin: "32px 0" }} />

      <Box>
        <Typography variant="h6" color="primary">2. Criar produto</Typography>
        <Typography color="textSecondary">
          Campos mínimos: <b>nome</b>, <b>tipo</b> e <b>valor</b>. Descrição, status e dados específicos são opcionais.
        </Typography>
        {renderCreateForm()}
      </Box>

      <Divider style={{ margin: "32px 0" }} />

      <Box>
        <Typography variant="h6" color="primary">3. Atualizar produto</Typography>
        <Typography color="textSecondary">
          Informe o <b>Product ID</b> retornado pela criação/listagem e envie os campos que deseja atualizar.
        </Typography>
        {renderUpdateForm()}
      </Box>

      <Divider style={{ margin: "32px 0" }} />

      <Box>
        <Typography variant="h6" color="primary">4. Excluir produto</Typography>
        <Typography color="textSecondary">
          Esta operação remove o registro definitivamente. Utilize com cuidado.
        </Typography>
        {renderDeleteForm()}
      </Box>

      <Divider style={{ margin: "48px 0" }} />

      {/* ===== CATEGORIAS ===== */}
      <Box mb={2}>
        <Typography variant="h5">Categorias de Produtos</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Gerencie as categorias que organizam seus produtos.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" color="primary">5. Consultar categorias</Typography>
        <Typography color="textSecondary">Listar todas ou buscar uma específica pelo ID.</Typography>
        {renderListCategoriesForm()}
      </Box>

      <Divider style={{ margin: "32px 0" }} />

      <Box>
        <Typography variant="h6" color="primary">6. Criar categoria</Typography>
        <Typography color="textSecondary">Campo obrigatório: <b>nome</b>. Slug e descrição são opcionais.</Typography>
        {renderCreateCategoryForm()}
      </Box>

      <Divider style={{ margin: "32px 0" }} />

      <Box>
        <Typography variant="h6" color="primary">7. Atualizar categoria</Typography>
        <Typography color="textSecondary">Informe o <b>Category ID</b> e os campos que deseja atualizar.</Typography>
        {renderUpdateCategoryForm()}
      </Box>

      <Divider style={{ margin: "32px 0" }} />

      <Box>
        <Typography variant="h6" color="primary">8. Excluir categoria</Typography>
        <Typography color="textSecondary">Não é possível remover uma categoria que possui produtos vinculados.</Typography>
        {renderDeleteCategoryForm()}
      </Box>

      <Divider style={{ margin: "48px 0" }} />

      {/* ===== WEBHOOKS ===== */}
      <Box mb={2}>
        <Typography variant="h5">Webhooks de Produtos</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Configure uma URL de webhook no token para receber notificações automáticas dos eventos abaixo.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" color="primary">Eventos disponíveis</Typography>
        <Typography component="div" color="textSecondary">
          <ul>
            <li><b>product.created</b> — produto criado via API</li>
            <li><b>product.updated</b> — produto atualizado via API</li>
            <li><b>product.deleted</b> — produto removido via API</li>
            <li><b>product_category.created</b> — categoria criada via API</li>
            <li><b>product_category.updated</b> — categoria atualizada via API</li>
            <li><b>product_category.deleted</b> — categoria removida via API</li>
          </ul>
        </Typography>
        <Typography variant="subtitle2" style={{ marginTop: 8 }}>Exemplo de payload (product.created):</Typography>
        <Box component="pre" mt={1} className={classes.webhookBox}>
{`{
  "event": "product.created",
  "data": {
    "apiKeyId": 1,
    "product": {
      "id": 42,
      "nome": "Corte de cabelo",
      "tipo": "servico",
      "valor": 149.90,
      "status": "disponivel",
      "companyId": 1
    }
  }
}`}
        </Box>
      </Box>

      {testResult && (
        <Box mt={4}>
          <Typography variant="h6">Resultado do último teste</Typography>
          <Typography variant="body2" color="textSecondary">
            {testResult.title} — {testResult.timestamp}
          </Typography>
          <Box component="pre" mt={2} className={classes.resultBox}>
            {testResult.payload}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default ApiProdutosPage;
