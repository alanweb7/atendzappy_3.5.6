import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import { Stack, Chip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles(() => ({
  root: { display: "flex", flexWrap: "wrap" },
  btnWrapper: { position: "relative" },
  buttonProgress: { color: green[500], position: "absolute", top: "50%", left: "50%", marginTop: -12, marginLeft: -12 },
}));

const FlowBuilderRemoveTagModal = ({ open, onSave, data, onUpdate, close }) => {
  const classes = useStyles();
  const isMounted = useRef(true);
  const [activeModal, setActiveModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    if (open === "edit" || open === "create") {
      (async () => {
        try {
          const { data: tagsData } = await api.get("/tags");
          setTags(tagsData.tags || tagsData || []);
          if (open === "edit" && data?.data?.id) setSelectedTag(data.data.id);
          else setSelectedTag("");
          setActiveModal(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    return () => { isMounted.current = false; };
  }, [open]);

  const handleClose = () => { close(null); setActiveModal(false); };

  const handleSave = () => {
    if (!selectedTag) return toast.error("Selecione uma tag");
    const tag = tags.find(item => item.id === selectedTag);
    if (open === "edit") {
      onUpdate({ ...data, data: { id: tag.id, name: tag.name, color: tag.color } });
    } else {
      onSave({ data: { id: tag.id, name: tag.name, color: tag.color } });
    }
    handleClose();
  };

  return (
    <div className={classes.root}>
      <Dialog open={activeModal} onClose={handleClose} fullWidth maxWidth="sm" scroll="paper">
        <DialogTitle>{open === "create" ? "Remover tag do contato" : "Editar — Remover tag"}</DialogTitle>
        <Stack>
          <DialogContent dividers>
            <Select
              value={selectedTag}
              style={{ width: "100%" }}
              onChange={e => setSelectedTag(e.target.value)}
              displayEmpty
              MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null }}
              renderValue={selected => {
                if (!selected) return <span style={{ color: "#999" }}>Selecione a tag a remover</span>;
                const tag = tags.find(t => t.id === selected);
                return tag ? <Chip label={tag.name} size="small" style={{ backgroundColor: tag.color, color: "#fff" }} /> : "";
              }}
            >
              <MenuItem value="" disabled>Selecione a tag a remover</MenuItem>
              {tags.map((tag, i) => (
                <MenuItem dense key={i} value={tag.id}>
                  <Chip label={tag.name} size="small" style={{ backgroundColor: tag.color, color: "#fff", marginRight: 8 }} />
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} startIcon={<CancelIcon />} style={{ color: "white", backgroundColor: "#db6565", boxShadow: "none", borderRadius: 0, fontSize: "12px" }} variant="outlined">
              {i18n.t("contactModal.buttons.cancel")}
            </Button>
            <Button startIcon={<SaveIcon />} onClick={handleSave} style={{ color: "white", backgroundColor: "#ef4444", boxShadow: "none", borderRadius: 0, fontSize: "12px" }} variant="contained">
              {open === "create" ? "Remover tag" : "Salvar"}
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};

export default FlowBuilderRemoveTagModal;
