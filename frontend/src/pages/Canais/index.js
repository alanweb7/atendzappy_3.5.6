import React, { useState, useCallback, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { add, format, parseISO } from "date-fns";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import {
  Button,
  Tooltip,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import {
  Edit,
  SignalCellularConnectedNoInternet2Bar,
  SignalCellularConnectedNoInternet0Bar,
  SignalCellular4Bar,
  CropFree,
  DeleteOutline,
  Facebook,
  Instagram,
  WhatsApp,
  Search as SearchIcon,
  Link as LinkIcon,
  Message as MessengerIcon,
} from "@material-ui/icons";

import api from "../../services/api";
import WhatsAppModal from "../../components/WhatsAppModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import QrcodeModal from "../../components/QrcodeModal";
import { i18n } from "../../translate/i18n";
import { WhatsAppsContext } from "../../context/WhatsApp/WhatsAppsContext";
import toastError from "../../errors/toastError";
import formatSerializedId from "../../utils/formatSerializedId";
import { AuthContext } from "../../context/Auth/AuthContext";
import usePlans from "../../hooks/usePlans";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ForbiddenPage from "../../components/ForbiddenPage";
import { Can } from "../../components/Can";
import moment from "moment";
import QrCodeIcon from "@mui/icons-material/QrCode";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddIcon from "@material-ui/icons/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import RepeatIcon from "@mui/icons-material/Repeat";
import PowerIcon from "@mui/icons-material/Power";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ChannelModal from "../../HubEcosystem/components/ChannelModal";
import notificame_logo from "../../assets/notificame_logo.png";
import FacebookInstagramModal from "../../components/FacebookInstagramModal";
import NewConnectionModal from "../../components/NewConnectionModal";
import GoogleMyBusinessModal from "../../components/GoogleMyBusinessModal";
import WhatsappWidgetModal from "../../components/WhatsappWidgetModal";
import WebIcon from "@material-ui/icons/Web";
import MailIcon from "@material-ui/icons/Mail";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SyncIcon from "@material-ui/icons/Sync";
import EmailAccountModal from "../../components/EmailAccountModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    ...theme.scrollbarStyles
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f5f5f5",
    flexWrap: "wrap",
    gap: 12
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: "#e8f5e9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: 28,
      color: "#43a047"
    }
  },
  headerTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1a1a1a"
  },
  headerSubtitle: {
    fontSize: "0.85rem",
    color: "#666",
    marginTop: 4
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap"
  },
  addButton: {
    width: 48,
    height: 48,
    minWidth: 48,
    borderRadius: "50%",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 0,
    "&:hover": {
      backgroundColor: "#333",
      transform: "scale(1.05)"
    },
    transition: "all 0.2s ease"
  },
  ghostButton: {
    borderRadius: 999,
    border: "1px solid #d0d0d0",
    color: "#333",
    padding: "8px 16px",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.8rem",
    "&:hover": {
      borderColor: "#1a1a1a",
      color: "#1a1a1a",
      backgroundColor: "transparent"
    }
  },
  searchField: {
    minWidth: 200,
    "& .MuiInputBase-root": {
      backgroundColor: "#fff",
      borderRadius: 8,
      border: "1px solid #e0e0e0",
      padding: "4px 12px",
      fontSize: "0.875rem",
      "&:hover": {
        borderColor: "#e0e0e0"
      },
      "&.Mui-focused": {
        borderColor: "#e0e0e0"
      },
      "&::before, &::after": {
        display: "none"
      }
    },
    "& .MuiInputBase-input": {
      padding: "6px 0",
      "&::placeholder": {
        color: "#9e9e9e",
        opacity: 1
      }
    }
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "20px 24px",
    gap: 16,
    minHeight: 0
  },
  listWrapper: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingBottom: 20
  },
  tableWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  tableHead: {
    backgroundColor: "var(--sidebar-color, #1e293b)",
    "& th": {
      color: "#cbd5e1",
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
    "& tr:hover": {
      backgroundColor: "#f8fafc",
    },
  },
  card: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: "18px 20px",
    boxShadow: "0 12px 24px rgba(15,23,42,0.08)",
    gap: 16,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 20px 32px rgba(15,23,42,0.12)"
    }
  },
  channelIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: 28
    }
  },
  cardInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    fontSize: "0.85rem",
    color: "#555"
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: "0.75rem",
    fontWeight: 600
  },
  statusConnected: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32"
  },
  statusDisconnected: {
    backgroundColor: "#ffebee",
    color: "#c62828"
  },
  statusOpening: {
    backgroundColor: "#fff3e0",
    color: "#ef6c00"
  },
  statusQrcode: {
    backgroundColor: "#e3f2fd",
    color: "#1565c0"
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap"
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12
  },
  editButton: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    "&:hover": {
      backgroundColor: "#bbdefb"
    }
  },
  deleteButton: {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    "&:hover": {
      backgroundColor: "#ffcdd2"
    }
  },
  qrButton: {
    backgroundColor: "#e8f5e9",
    color: "#43a047",
    "&:hover": {
      backgroundColor: "#c8e6c9"
    }
  },
  loadingBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "40px 0",
    justifyContent: "center"
  },
  emptyState: {
    borderRadius: 16,
    backgroundColor: "#fff",
    textAlign: "center",
    padding: "60px 20px",
    color: "#999",
    "& svg": {
      fontSize: 48,
      marginBottom: 12,
      color: "#d9d9d9"
    }
  },
  importCard: {
    backgroundColor: "#fff3e0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 16
  },
  customTableCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(14),
    border: "1px solid #dadde9",
    maxWidth: 450,
  },
  tooltipPopper: {
    textAlign: "center",
  },
  buttonProgress: {
    color: green[500],
  },
}));

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const CustomToolTip = ({ title, content, children }) => {
  const classes = useStyles();

  return (
    <Tooltip
      arrow
      classes={{
        tooltip: classes.tooltip,
        popper: classes.tooltipPopper,
      }}
      title={
        <React.Fragment>
          <Typography gutterBottom color="inherit">
            {title}
          </Typography>
          {content && <Typography>{content}</Typography>}
        </React.Fragment>
      }
    >
      {children}
    </Tooltip>
  );
};

const IconChannel = (channel) => {
  switch (channel) {
    case "facebook":
      return <Facebook style={{ color: "#3b5998" }} />;
    case "instagram":
      return <Instagram style={{ color: "#e1306c" }} />;
    case "whatsapp":
      return <WhatsApp style={{ color: "#25d366" }} />;
    case "whatsapp_official":
      return <WhatsApp style={{ color: "#128C7E" }} />;
    default:
      return "error";
  }
};

const Connections = () => {
  const classes = useStyles();

  const { whatsApps, loading, reload: reloadWhatsApps } = useContext(WhatsAppsContext);
  const { user, socket, handleLogout } = useContext(AuthContext);
  const [emailAccounts, setEmailAccounts] = useState([]);
  const [selectedEmailAccount, setSelectedEmailAccount] = useState(null);
  const [editEmailModalOpen, setEditEmailModalOpen] = useState(false);

  useEffect(() => {
    api.get("/email-accounts").then(({ data }) => setEmailAccounts(data)).catch(() => {});
  }, []);

  // Socket para atualização em tempo real das email accounts
  useEffect(() => {
    if (!socket || !user?.companyId) return;
    const channel = `company-${user.companyId}-emailAccount`;
    const handler = (data) => {
      if (data.action === "create") {
        setEmailAccounts(prev => [data.account, ...prev]);
      } else if (data.action === "update") {
        setEmailAccounts(prev => prev.map(a => a.id === data.account.id ? { ...a, ...data.account } : a));
      } else if (data.action === "delete") {
        setEmailAccounts(prev => prev.filter(a => a.id !== data.account.id));
      }
    };
    socket.on(channel, handler);
    return () => socket.off(channel, handler);
  }, [socket, user?.companyId]);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [statusImport, setStatusImport] = useState([]);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedWhatsApp, setSelectedWhatsApp] = useState(null);
  const [modalChannel, setModalChannel] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [hubChannelModalOpen, setHubChannelModalOpen] = useState(false);
  const [newConnModalOpen, setNewConnModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [fbModalOpen, setFbModalOpen] = useState(false);
  const [igModalOpen, setIgModalOpen] = useState(false);
  const [gmbModalOpen, setGmbModalOpen] = useState(false);
  const [widgetModalOpen, setWidgetModalOpen] = useState(false);
  const [widgetWhatsApp, setWidgetWhatsApp] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const history = useHistory();
  const confirmationModalInitialState = {
    action: "",
    title: "",
    message: "",
    whatsAppId: "",
    channel: "",
    open: false,
  };
  const [confirmModalInfo, setConfirmModalInfo] = useState(
    confirmationModalInitialState
  );
  const [planConfig, setPlanConfig] = useState(false);

  const handleSearch = (event) => {
    setSearchParam(event.target.value.toLowerCase());
  };

  const filteredConnections = whatsApps.filter((conn) =>
    conn.name.toLowerCase().includes(searchParam)
  );

  const companyId = user.companyId;

  const { getPlanCompany } = usePlans();

  useEffect(() => {
    async function fetchData() {
      const planConfigs = await getPlanCompany(undefined, companyId);
      setPlanConfig(planConfigs);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var before = user.company ? moment(moment().format()).isBefore(user.company.dueDate) : true;

  // Se a empresa estiver ativa, permite acesso mesmo com fatura vencida
  if (before !== true && user.company && !user.company.status) {
    handleLogout();
  }

  const responseFacebook = (response) => {
    if (response.status !== "unknown") {
      const { accessToken, id } = response;

      api
        .post("/facebook", {
          facebookUserId: id,
          facebookUserToken: accessToken,
        })
        .then((response) => {
          toast.success(i18n.t("connections.facebook.success"));
        })
        .catch((error) => {
          toastError(error);
        });
    }
  };

  const responseInstagram = (response) => {
    if (response.status !== "unknown") {
      const { accessToken, id } = response;

      api
        .post("/facebook", {
          addInstagram: true,
          facebookUserId: id,
          facebookUserToken: accessToken,
        })
        .then((response) => {
          toast.success(i18n.t("connections.facebook.success"));
        })
        .catch((error) => {
          toastError(error);
        });
    }
  };

  useEffect(() => {
    const channel = `importMessages-${user.companyId}`;

    const handler = (data) => {
      if (data.action === "refresh") {
        setStatusImport([]);
        // O WhatsAppsContext já atualiza automaticamente via socket
      }
      if (data.action === "update") {
        setStatusImport(data.status);
      }
    };

    socket.on(channel, handler);

    return () => {
      socket.off(channel, handler);
    };
  }, [socket, user.companyId, whatsApps]);

  const handleStartWhatsAppSession = async (whatsAppId) => {
    try {
      await api.post(`/whatsappsession/${whatsAppId}`);
    } catch (err) {
      toastError(err);
    }
  };

  const handleRequestNewQrCode = async (whatsAppId) => {
    try {
      await api.put(`/whatsappsession/${whatsAppId}`);
    } catch (err) {
      toastError(err);
    }
  };

  const handleOpenWhatsAppModal = () => {
    setSelectedWhatsApp(null);
    setModalChannel("whatsapp");
    setWhatsAppModalOpen(true);
  };

  const handleOpenWhatsAppOfficialModal = () => {
    console.log("Abrindo modal WhatsApp Oficial");
    setSelectedWhatsApp(null);
    setModalChannel("whatsapp_official");
    setWhatsAppModalOpen(true);
  };

  const handleCloseWhatsAppModal = useCallback(() => {
    setWhatsAppModalOpen(false);
    setSelectedWhatsApp(null);
    setModalChannel(null);
  }, [setSelectedWhatsApp, setWhatsAppModalOpen]);

  const handleOpenQrModal = (whatsApp) => {
    setSelectedWhatsApp(whatsApp);
    setQrModalOpen(true);
  };

  const handleCloseQrModal = useCallback(() => {
    setSelectedWhatsApp(null);
    setQrModalOpen(false);
  }, [setQrModalOpen, setSelectedWhatsApp]);

  const handleEditConnection = (whatsApp) => {
    setSelectedWhatsApp(whatsApp);
    setModalChannel(whatsApp.channel);
    
    // Abrir modal específico baseado no canal
    if (whatsApp.channel === "facebook") {
      setFbModalOpen(true);
    } else if (whatsApp.channel === "instagram") {
      setIgModalOpen(true);
    } else {
      setWhatsAppModalOpen(true);
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOpenConfirmationModal = (action, whatsAppId, channel) => {
    if (action === "disconnect") {
      setConfirmModalInfo({
        action: action,
        title: i18n.t("connections.confirmationModal.disconnectTitle"),
        message: i18n.t("connections.confirmationModal.disconnectMessage"),
        whatsAppId: whatsAppId,
        channel: channel,
      });
    }

    if (action === "delete") {
      setConfirmModalInfo({
        action: action,
        title: i18n.t("connections.confirmationModal.deleteTitle"),
        message: i18n.t("connections.confirmationModal.deleteMessage"),
        whatsAppId: whatsAppId,
        channel: channel,
      });
    }
    if (action === "closedImported") {
      setConfirmModalInfo({
        action: action,
        title: i18n.t("connections.confirmationModal.closedImportedTitle"),
        message: i18n.t("connections.confirmationModal.closedImportedMessage"),
        whatsAppId: whatsAppId,
        channel: "",
      });
    }
    setConfirmModalOpen(true);
  };

  const handleSubmitConfirmationModal = async () => {
    if (confirmModalInfo.action === "disconnect") {
      try {
        if (confirmModalInfo.channel === "whatsapp") {
          await api.delete(`/whatsappsession/${confirmModalInfo.whatsAppId}`);
        } else {
          await api.put(`/whatsapp/${confirmModalInfo.whatsAppId}`, {
            status: "DISCONNECTED",
          });
        }
        toast.success('Conexão desconectada com sucesso!');
      } catch (err) {
        toastError(err);
      }
    }

    if (confirmModalInfo.action === "delete") {
      try {
        const endpoint = confirmModalInfo.channel === "whatsapp_official" ? `/whatsapp-official/${confirmModalInfo.whatsAppId}` : `/whatsapp/${confirmModalInfo.whatsAppId}`;
        await api.delete(endpoint);
        toast.success(i18n.t("connections.toasts.deleted"));
      } catch (err) {
        toastError(err);
      }
    }
    if (confirmModalInfo.action === "closedImported") {
      try {
        await api.post(`/closedimported/${confirmModalInfo.whatsAppId}`);
        toast.success(i18n.t("connections.toasts.closedimported"));
      } catch (err) {
        toastError(err);
      }
    }

    setConfirmModalInfo(confirmationModalInitialState);
    setConfirmModalOpen(false);
  };

  const renderImportButton = (whatsApp) => {
    if (whatsApp?.statusImportMessages === "renderButtonCloseTickets") {
      return (
        <Button
          style={{ marginLeft: 12 }}
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => {
            handleOpenConfirmationModal("closedImported", whatsApp.id, whatsApp.channel);
          }}
        >
          {i18n.t("connections.buttons.closedImported")}
        </Button>
      );
    }

    if (whatsApp?.importOldMessages) {
      let isTimeStamp = !isNaN(
        new Date(Math.floor(whatsApp?.statusImportMessages)).getTime()
      );

      if (isTimeStamp) {
        const ultimoStatus = new Date(
          Math.floor(whatsApp?.statusImportMessages)
        ).getTime();
        const dataLimite = +add(ultimoStatus, { seconds: +35 }).getTime();
        if (dataLimite > new Date().getTime()) {
          return (
            <>
              <Button
                disabled
                style={{ marginLeft: 12 }}
                size="small"
                endIcon={
                  <CircularProgress
                    size={12}
                    className={classes.buttonProgress}
                  />
                }
                variant="outlined"
                color="primary"
              >
                {i18n.t("connections.buttons.preparing")}
              </Button>
            </>
          );
        }
      }
    }
  };

  const renderActionButtons = (whatsApp) => {
    return (
      <>
        {whatsApp.status === "qrcode" && whatsApp.channel === "whatsapp" && (
          <Can
            role={
              user.profile === "user" && user.allowConnections === "enabled"
                ? "admin"
                : user.profile
            }
            perform="connections-page:addConnection"
            yes={() => (
              <Button
                startIcon={<QrCodeIcon />}
                size="small"
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#437db5",
                  boxShadow: "none",
                  borderRadius: "5px",
                }}
                onClick={() => handleOpenQrModal(whatsApp)}
              >
                {i18n.t("connections.buttons.qrcode")}
              </Button>
            )}
          />
        )}
        {whatsApp.status === "DISCONNECTED" && whatsApp.channel === "whatsapp" && (
          <Can
            role={
              user.profile === "user" && user.allowConnections === "enabled"
                ? "admin"
                : user.profile
            }
            perform="connections-page:addConnection"
            yes={() => (
              <>
                <Button
                  startIcon={<RepeatIcon />}
                  size="small"
                  variant="outlined"
                  style={{
                    color: "white",
                    backgroundColor: "#4ec24e",
                    boxShadow: "none",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleStartWhatsAppSession(whatsApp.id)}
                >
                  {i18n.t("connections.buttons.tryAgain")}
                </Button>{" "}
                <Button
                  startIcon={<AddIcon />}
                  size="small"
                  variant="outlined"
                  style={{
                    color: "white",
                    backgroundColor: "#8A2BE2",
                    boxShadow: "none",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleRequestNewQrCode(whatsApp.id)}
                >
                  {i18n.t("connections.buttons.newQr")}
                </Button>
              </>
            )}
          />
        )}
        {whatsApp.channel === "whatsapp_official" && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<SyncIcon style={{ fontSize: 14 }} />}
            style={{ borderColor: "#128C7E", color: "#128C7E", fontSize: 11, padding: "2px 8px" }}
            onClick={async () => {
              try {
                const { data } = await api.get(`/whatsapp-official/${whatsApp.id}/check-status`);
                toast.info(`Status: ${data.status === "CONNECTED" ? "Conectado ✓" : `Desconectado — ${data.reason || ""}`}`);
              } catch {
                toast.error("Erro ao verificar status");
              }
            }}
          >
            Verificar
          </Button>
        )}
        {whatsApp.status === "DISCONNECTED" && whatsApp.channel === "whatsapp_official" && (
          <Can
            role={
              user.profile === "user" && user.allowConnections === "enabled"
                ? "admin"
                : user.profile
            }
            perform="connections-page:addConnection"
            yes={() => (
              <Button
                startIcon={<PowerIcon />}
                size="small"
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#128C7E",
                  boxShadow: "none",
                  borderRadius: "5px",
                }}
                onClick={() => handleStartWhatsAppSession(whatsApp.id)}
              >
                Conectar
              </Button>
            )}
          />
        )}
        {(whatsApp.status === "CONNECTED" ||
          whatsApp.status === "PAIRING" ||
          whatsApp.status === "TIMEOUT") && (
          <Can
            role={user.profile}
            perform="connections-page:addConnection"
            yes={() => (
              <>
                <Button
                  startIcon={<LogoutIcon />}
                  size="small"
                  variant="outlined"
                  style={{
                    color: "white",
                    backgroundColor: "#db6565",
                    boxShadow: "none",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    handleOpenConfirmationModal(
                      "disconnect",
                      whatsApp.id,
                      whatsApp.channel
                    );
                  }}
                >
                  {i18n.t("connections.buttons.disconnect")}
                </Button>

                {renderImportButton(whatsApp)}
              </>
            )}
          />
        )}
        {whatsApp.status === "OPENING" && (
          <Button size="small" variant="outlined" disabled color="default">
            {i18n.t("connections.buttons.connecting")}
          </Button>
        )}
      </>
    );
  };

  const renderStatusToolTips = (whatsApp) => {
    return (
      <div className={classes.customTableCell}>
        {whatsApp.status === "DISCONNECTED" && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.disconnected.title")}
            content={i18n.t("connections.toolTips.disconnected.content")}
          >
            <SignalCellularConnectedNoInternet0Bar color="secondary" />
          </CustomToolTip>
        )}
        {whatsApp.status === "OPENING" && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        {whatsApp.status === "qrcode" && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.qrcode.title")}
            content={i18n.t("connections.toolTips.qrcode.content")}
          >
            <CropFree style={{ color: "#4ec24e" }} />
          </CustomToolTip>
        )}
        {whatsApp.status === "CONNECTED" && (
          <CustomToolTip title={i18n.t("connections.toolTips.connected.title")}>
            <SignalCellular4Bar style={{ color: green[500] }} />
          </CustomToolTip>
        )}
        {(whatsApp.status === "TIMEOUT" || whatsApp.status === "PAIRING") && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.timeout.title")}
            content={i18n.t("connections.toolTips.timeout.content")}
          >
            <SignalCellularConnectedNoInternet2Bar color="secondary" />
          </CustomToolTip>
        )}
      </div>
    );
  };

  const restartWhatsapps = async () => {
    try {
      await api.post(`/whatsapp-restart/`);
      toast.success(i18n.t("connections.waitConnection"));
    } catch (err) {
      toastError(err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "CONNECTED":
        return { class: classes.statusConnected, label: "Conectado" };
      case "DISCONNECTED":
        return { class: classes.statusDisconnected, label: "Desconectado" };
      case "OPENING":
        return { class: classes.statusOpening, label: "Conectando..." };
      case "qrcode":
        return { class: classes.statusQrcode, label: "QR Code" };
      case "TIMEOUT":
      case "PAIRING":
        return { class: classes.statusOpening, label: "Timeout" };
      default:
        return { class: classes.statusDisconnected, label: status };
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "facebook":
        return <MessengerIcon style={{ color: "#3b5998", fontSize: 28 }} />;
      case "instagram":
        return <Instagram style={{ color: "#e1306c", fontSize: 28 }} />;
      case "whatsapp_official":
        return <WhatsApp style={{ color: "#128C7E", fontSize: 28 }} />;
      case "whatsapp":
      default:
        return <WhatsApp style={{ color: "#25d366", fontSize: 28 }} />;
    }
  };

  const getChannelBg = (channel) => {
    switch (channel) {
      case "facebook":
        return "#e7f3ff";
      case "instagram":
        return "#fce4ec";
      case "whatsapp_official":
        return "#e6f7f2";
      case "whatsapp":
      default:
        return "#e8f5e9";
    }
  };

  if (user.profile === "user" && user.allowConnections === "disabled") {
    return <ForbiddenPage />;
  }

  return (
    <Box className={classes.root}>
      <ConfirmationModal
        title={confirmModalInfo.title}
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => { handleSubmitConfirmationModal(); setTimeout(reloadWhatsApps, 500); }}
      >
        {confirmModalInfo.message}
      </ConfirmationModal>
      {qrModalOpen && (
        <QrcodeModal
          open={qrModalOpen}
          onClose={handleCloseQrModal}
          whatsAppId={!whatsAppModalOpen && selectedWhatsApp?.id}
        />
      )}
      <WhatsAppModal
        open={whatsAppModalOpen}
        onClose={() => { handleCloseWhatsAppModal(); setTimeout(reloadWhatsApps, 300); }}
        whatsAppId={!qrModalOpen && selectedWhatsApp?.id}
        channel={modalChannel}
      />
      <NewConnectionModal
        open={newConnModalOpen}
        onClose={() => setNewConnModalOpen(false)}
        planConfig={planConfig}
        onWhatsApp={() => { handleOpenWhatsAppModal(); }}
        onWhatsAppOfficial={() => { handleOpenWhatsAppOfficialModal(); }}
        onEmail={() => setEmailModalOpen(true)}
        onFacebook={() => setFbModalOpen(true)}
        onInstagram={() => setIgModalOpen(true)}
        onGoogleMyBusiness={() => { setGmbModalOpen(true); }}
      />
      <GoogleMyBusinessModal
        open={gmbModalOpen}
        onClose={() => setGmbModalOpen(false)}
      />
      <FacebookInstagramModal
        open={fbModalOpen}
        onClose={() => { setFbModalOpen(false); setSelectedWhatsApp(null); }}
        type="facebook"
      />
      <FacebookInstagramModal
        open={igModalOpen}
        onClose={() => { setIgModalOpen(false); setSelectedWhatsApp(null); }}
        type="instagram"
      />
      <ChannelModal
        open={hubChannelModalOpen}
        onClose={() => setHubChannelModalOpen(false)}
      />
      <EmailAccountModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSave={() => { setEmailModalOpen(false); api.get("/email-accounts").then(({ data }) => setEmailAccounts(data)).catch(() => {}); }}
      />
      <WhatsappWidgetModal
        open={widgetModalOpen}
        onClose={() => { setWidgetModalOpen(false); setWidgetWhatsApp(null); }}
        whatsapp={widgetWhatsApp}
      />

      <Box className={classes.header}>
        <Box className={classes.headerLeft}>
          <Box className={classes.headerIcon}>
            <LinkIcon />
          </Box>
          <Box>
            <Typography className={classes.headerTitle}>
              Conexões
            </Typography>
            <Typography className={classes.headerSubtitle}>
              {whatsApps.length} conexões configuradas
            </Typography>
          </Box>
        </Box>
        <Box className={classes.headerActions}>
          <TextField
            className={classes.searchField}
            placeholder="Pesquisar..."
            type="search"
            value={searchParam}
            onChange={handleSearch}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#9e9e9e", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            className={classes.ghostButton}
            startIcon={<RestartAltIcon style={{ fontSize: 18 }} />}
            onClick={restartWhatsapps}
          >
            Reiniciar
          </Button>
          <Can
            role={user.profile}
            perform="connections-page:addConnection"
            yes={() => (
              <IconButton
                className={classes.addButton}
                onClick={() => setNewConnModalOpen(true)}
              >
                <AddIcon />
              </IconButton>
            )}
          />
        </Box>
      </Box>

      <Box className={classes.content}>
        {statusImport?.all && (
          <Box className={classes.importCard}>
            <CircularProgress size={24} />
            <Box>
              <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                {statusImport?.this === -1 ? i18n.t("connections.buttons.preparing") : i18n.t("connections.buttons.importing")}
              </Typography>
              {statusImport?.this !== -1 && (
                <Typography variant="body2" color="textSecondary">
                  {`${i18n.t("connections.typography.processed")} ${statusImport?.this} ${i18n.t("connections.typography.in")} ${statusImport?.all}`}
                </Typography>
              )}
            </Box>
            {statusImport?.this !== -1 && (
              <CircularProgressWithLabel value={(statusImport?.this / statusImport?.all) * 100} />
            )}
          </Box>
        )}

        <Box className={classes.listWrapper}>
          {loading ? (
            <Box className={classes.loadingBox}>
              <CircularProgress size={24} />
              <Typography variant="body2">Carregando conexões...</Typography>
            </Box>
          ) : (filteredConnections.length === 0 && emailAccounts.length === 0) ? (
            <Box className={classes.emptyState}>
              <LinkIcon />
              <Typography>Nenhuma conexão encontrada</Typography>
            </Box>
          ) : (
            <Box className={classes.tableWrapper}>
              <Table size="small">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell style={{ width: 56 }}>Canal</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Info</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {/* Linhas de Email */}
                  {emailAccounts.map((account) => (
                    <TableRow key={`email-${account.id}`} hover style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <TableCell>
                        <Box style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: "#ebf8ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <MailIcon style={{ color: "#4299e1", fontSize: 20 }} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Typography style={{ fontWeight: 600, fontSize: "0.875rem", color: "#334155" }}>{account.name}</Typography>
                          {account.isDefault && <Chip size="small" label="Padrão" style={{ fontSize: "0.65rem", height: 18, backgroundColor: "#4299e1", color: "#fff" }} />}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: "0.8rem", color: "#64748b" }}>{account.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600, backgroundColor: account.status === "CONNECTED" ? "#e8f5e9" : "#ffebee", color: account.status === "CONNECTED" ? "#388e3c" : "#d32f2f" }}>
                          {account.status === "CONNECTED" ? "Conectado" : "Desconectado"}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                          <Tooltip title={account.status === "CONNECTED" ? "Desconectar" : "Conectar"}>
                            <IconButton size="small" style={{ color: account.status === "CONNECTED" ? "#f59e0b" : "#10b981" }}
                              onClick={async () => {
                                try {
                                  const { data } = await api.put(`/email-accounts/${account.id}/toggle`);
                                  setEmailAccounts(prev => prev.map(a => a.id === account.id ? { ...a, status: data.status } : a));
                                } catch (e) { toast.error(e?.response?.data?.error || "Erro"); }
                              }}>
                              <PowerSettingsNewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <IconButton size="small" style={{ color: "#3b82f6" }} onClick={() => { setSelectedEmailAccount(account); setEditEmailModalOpen(true); }}>
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton size="small" style={{ color: "#ef4444" }} onClick={async () => {
                              if (window.confirm(`Excluir "${account.name}"?`)) {
                                await api.delete(`/email-accounts/${account.id}`);
                                setEmailAccounts(prev => prev.filter(a => a.id !== account.id));
                              }
                            }}>
                              <DeleteOutline fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Linhas de WhatsApp/outros */}
                  {filteredConnections.map((whatsApp) => {
                    const statusInfo = getStatusBadge(whatsApp.status);
                    return (
                      <TableRow key={whatsApp.id} hover style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <TableCell>
                          <Box style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: getChannelBg(whatsApp.channel), display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {getChannelIcon(whatsApp.channel)}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                            <Typography style={{ fontWeight: 600, fontSize: "0.875rem", color: "#334155" }}>{whatsApp.name}</Typography>
                            {whatsApp.channel === "facebook" && <Chip size="small" label="Facebook" style={{ fontSize: "0.65rem", height: 18, backgroundColor: "#e8f0fe", color: "#1877f2" }} />}
                            {whatsApp.channel === "instagram" && <Chip size="small" label="Instagram" style={{ fontSize: "0.65rem", height: 18, backgroundColor: "#fce4ec", color: "#e1306c" }} />}
                            {whatsApp.channel === "whatsapp_official" && <Chip size="small" label="Oficial" style={{ fontSize: "0.65rem", height: 18, backgroundColor: "#e8f5e9", color: "#128C7E" }} />}
                            {whatsApp.isDefault && <Chip size="small" label="Padrão" style={{ fontSize: "0.65rem", height: 18, backgroundColor: "#f0fdf4", color: green[600] }} />}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: "0.8rem", color: "#64748b" }}>
                            {whatsApp.channel === "whatsapp" && whatsApp.number ? formatSerializedId(whatsApp.number) : ""}
                            {" "}{format(parseISO(whatsApp.updatedAt), "dd/MM/yy HH:mm")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <span className={`${classes.statusBadge} ${statusInfo.class}`}>
                            {renderStatusToolTips(whatsApp)}
                            {statusInfo.label}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                            {renderActionButtons(whatsApp)}
                            <Can
                              role={user.profile}
                              perform="connections-page:addConnection"
                              yes={() => (
                                <>
                                  {whatsApp.channel === "whatsapp" && (
                                    <Tooltip title="Widget para site">
                                      <IconButton size="small" onClick={() => { setWidgetWhatsApp(whatsApp); setWidgetModalOpen(true); }}>
                                        <WebIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  <Tooltip title="Editar">
                                    <IconButton size="small" style={{ color: "#3b82f6" }} onClick={() => handleEditConnection(whatsApp)}>
                                      <Edit fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Excluir">
                                    <IconButton size="small" style={{ color: "#ef4444" }} onClick={() => handleOpenConfirmationModal("delete", whatsApp.id, whatsApp.channel)}>
                                      <DeleteOutline fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          )}
        </Box>

      <EmailAccountModal
        open={editEmailModalOpen}
        onClose={() => { setEditEmailModalOpen(false); setSelectedEmailAccount(null); }}
        account={selectedEmailAccount}
        onSave={() => {
          setEditEmailModalOpen(false);
          setSelectedEmailAccount(null);
          api.get("/email-accounts").then(({ data }) => setEmailAccounts(data)).catch(() => {});
        }}
      />
      </Box>
    </Box>
  );
};

export default Connections;
