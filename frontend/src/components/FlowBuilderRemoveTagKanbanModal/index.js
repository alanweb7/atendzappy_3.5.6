import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { i18n } from "../../translate/i18n";
import { Stack } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles(() => ({
  root: { display: "flex", flexWrap: "wrap" },
}));

// Este nó não precisa de configuração — remove a etapa kanban atual do ticket
const FlowBuilderRemoveTagKanbanModal = ({ open, onSave, data, onUpdate, close }) => {
  const classes = useStyles();
  const [activeModal, setActiveModal] = useState(false);

  useEffect(() => {
    if (open === "create" || open === "edit") setActiveModal(true);
  }, [open]);

  const handleClose = () => { close(null); setActiveModal(false); };

  const handleSave = () => {
    if (open === "edit") {
      onUpdate({ ...data, data: {} });
    } else {
      onSave({ data: {} });
    }
    handleClose();
  };

  return (
    <div className={classes.root}>
      <Dialog open={activeModal} onClose={handleClose} fullWidth maxWidth="sm" scroll="paper">
        <DialogTitle>{open === "create" ? "Remover Tag Kanban" : "Editar — Remover Tag Kanban"}</DialogTitle>
        <Stack>
          <DialogContent dividers>
            <Typography style={{ color: "#6b7280", fontSize: 14 }}>
              Este nó remove a etapa kanban atual do ticket automaticamente, sem precisar especificar qual etapa.
              Útil para limpar o kanban antes de definir uma nova etapa.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} startIcon={<CancelIcon />} style={{ color: "white", backgroundColor: "#db6565", boxShadow: "none", borderRadius: 0, fontSize: "12px" }} variant="outlined">
              {i18n.t("contactModal.buttons.cancel")}
            </Button>
            <Button startIcon={<SaveIcon />} onClick={handleSave} style={{ color: "white", backgroundColor: "#ef4444", boxShadow: "none", borderRadius: 0, fontSize: "12px" }} variant="contained">
              {open === "create" ? "Adicionar nó" : "Salvar"}
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};

export default FlowBuilderRemoveTagKanbanModal;
