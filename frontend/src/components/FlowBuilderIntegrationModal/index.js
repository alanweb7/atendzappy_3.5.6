import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, CircularProgress, InputAdornment
} from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import api from "../../services/api";
import toastError from "../../errors/toastError";

const FlowBuilderIntegrationModal = ({ open, onClose, integrationId, onSave }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (integrationId) {
      api.get(`/queueIntegration/${integrationId}`)
        .then(({ data }) => setName(data.name || ""))
        .catch(() => {});
    } else {
      setName("");
    }
  }, [open, integrationId]);

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Informe o nome da integração");
      return;
    }
    setLoading(true);
    try {
      const values = {
        type: "flowbuilder",
        name: name.trim(),
        projectName: name.trim(),
        jsonContent: "",
        language: "",
        urlN8N: "",
        typebotExpires: 0,
        typebotDelayMessage: 1000,
        typebotKeywordFinish: "",
        typebotUnknownMessage: "",
        typebotSlug: "",
        typebotKeywordRestart: "",
        typebotRestartMessage: "",
      };
      if (integrationId) {
        await api.put(`/queueIntegration/${integrationId}`, values);
        toast.success("Integração atualizada!");
      } else {
        await api.post("/queueIntegration", values);
        toast.success("Integração Flow Builder criada!");
      }
      if (onSave) onSave();
      handleClose();
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ background: "#10B981", color: "#fff" }}>
        {integrationId ? "Editar Integração Flow Builder" : "Ativar Integração Flow Builder"}
      </DialogTitle>
      <DialogContent style={{ paddingTop: 20 }}>
        <TextField
          label="Nome da integração"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountTreeIcon style={{ color: "#10B981" }} />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading || !name.trim()}
          style={{ backgroundColor: "#10B981", color: "#fff" }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : (integrationId ? "Salvar" : "Ativar")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlowBuilderIntegrationModal;
