import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Tabs,
  Tab,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import SaveIcon from "@material-ui/icons/Save";
import MapIcon from "@material-ui/icons/Map";

import TabPanel from "../../components/TabPanel";
import SchedulesForm from "../../components/SchedulesForm";
import Options from "../../components/Settings/Options";
import { toast } from "react-toastify";

import useCompanies from "../../hooks/useCompanies";
import { AuthContext } from "../../context/Auth/AuthContext";

import useCompanySettings from "../../hooks/useSettings/companySettings";
import useSettings from "../../hooks/useSettings";
import ForbiddenPage from "../../components/ForbiddenPage/index.js";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    width: "100%",
    margin: 0,
    background: "#f8fafc",
    minHeight: "100vh",
  },
  pageHeader: {
    marginBottom: theme.spacing(3),
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#1a1a2e",
    marginBottom: theme.spacing(0.5),
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
  },
  tabsWrapper: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    marginBottom: theme.spacing(3),
  },
  tabsRoot: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    paddingLeft: theme.spacing(2),
    "& .MuiTabs-indicator": {
      backgroundColor: "#3b82f6",
      height: 3,
      borderRadius: 2,
    },
  },
  tab: {
    textTransform: "none",
    fontWeight: 500,
    fontSize: "14px",
    minHeight: 48,
    color: "#6b7280",
    "&.Mui-selected": {
      color: "#3b82f6",
      fontWeight: 600,
    },
  },
  tabContent: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(4),
  },
  integrationCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  integrationHeader: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
  integrationTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#1a1a2e",
  },
  integrationSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: theme.spacing(2),
  },
  saveBtn: {
    marginTop: theme.spacing(2),
    textTransform: "none",
    fontWeight: 600,
  },
}));

const SettingsCustom = () => {
  const classes = useStyles();
  const [tab, setTab] = useState("options");
  const [schedules, setSchedules] = useState([]);
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [settings, setSettings] = useState({});
  const [oldSettings, setOldSettings] = useState({});
  const [schedulesEnabled, setSchedulesEnabled] = useState(false);

  // Google Places API key
  const [googlePlacesKey, setGooglePlacesKey] = useState("");
  const [showGoogleKey, setShowGoogleKey] = useState(false);
  const [savingGoogleKey, setSavingGoogleKey] = useState(false);

  const { find, updateSchedules } = useCompanies();
  const { getAll: getAllSettings } = useCompanySettings();
  const { getAll: getAllSettingsOld } = useSettings();
  const { user, socket } = useContext(AuthContext);

  useEffect(() => {
    async function findData() {
      if (!user?.companyId) return;
      setLoading(true);
      try {
        const companyId = user.companyId;
        const company = await find(companyId);
        const settingList = await getAllSettings(companyId);
        const settingListOld = await getAllSettingsOld();

        setCompany(company);
        setSchedules(company.schedules);
        setSettings(settingList);
        setOldSettings(settingListOld);
        setSchedulesEnabled(settingList.scheduleType === "company");
        setCurrentUser(user);

        // Carrega a chave do Google Places
        try {
          const { data } = await api.get("/settings/googlePlacesApiKey");
          if (data?.value) setGooglePlacesKey(data.value);
        } catch {}
      } catch (e) {
        toast.error(e);
      }
      setLoading(false);
    }
    findData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.companyId]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmitSchedules = async (data) => {
    setLoading(true);
    try {
      setSchedules(data);
      await updateSchedules({ id: company.id, schedules: data });
      toast.success("Horários atualizados com sucesso.");
    } catch (e) {
      toast.error(e);
    }
    setLoading(false);
  };

  const handleSaveGooglePlacesKey = async () => {
    setSavingGoogleKey(true);
    try {
      await api.put("/settings/googlePlacesApiKey", { value: googlePlacesKey });
      toast.success("Chave salva com sucesso.");
    } catch (e) {
      toast.error("Erro ao salvar a chave.");
    }
    setSavingGoogleKey(false);
  };

  if (user.profile === "user") {
    return <ForbiddenPage />;
  }

  const isAdmin = user.profile === "admin" || user.super;

  return (
    <div className={classes.container}>
      <div className={classes.pageHeader}>
        <Typography className={classes.pageTitle}>Ajustes</Typography>
        <Typography className={classes.pageSubtitle}>
          Gerencie as configurações do sistema
        </Typography>
      </div>

      <Paper className={classes.tabsWrapper} elevation={0}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabsRoot}
        >
          <Tab label="Opções" value="options" className={classes.tab} />
          <Tab label="Horários" value="schedules" className={classes.tab} />
          {isAdmin && (
            <Tab label="Integrações" value="integrations" className={classes.tab} />
          )}
        </Tabs>

        <TabPanel value={tab} name="options">
          <div className={classes.tabContent}>
            <Options
              settings={settings}
              oldSettings={oldSettings}
              user={currentUser}
              scheduleTypeChanged={() => {}}
            />
          </div>
        </TabPanel>

        <TabPanel value={tab} name="schedules">
          <div className={classes.tabContent}>
            <SchedulesForm
              loading={loading}
              onSubmit={handleSubmitSchedules}
              initialValues={schedules}
              schedulesEnabled={schedulesEnabled}
            />
          </div>
        </TabPanel>

        {isAdmin && (
          <TabPanel value={tab} name="integrations">
            <div className={classes.tabContent}>
              <div className={classes.integrationCard}>
                <div className={classes.integrationHeader}>
                  <MapIcon style={{ color: "#4285F4", fontSize: 22 }} />
                  <Typography className={classes.integrationTitle}>
                    Google Places API
                  </Typography>
                </div>
                <Typography className={classes.integrationSubtitle}>
                  Chave usada para extração de leads via Google Maps. Sem ela o sistema
                  usa scraping via Puppeteer (mais lento). A API do Google oferece
                  $200/mês de crédito gratuito (≈ 6.000 buscas).
                </Typography>
                <TextField
                  label="GOOGLE_PLACES_API_KEY"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={googlePlacesKey}
                  onChange={(e) => setGooglePlacesKey(e.target.value)}
                  type={showGoogleKey ? "text" : "password"}
                  placeholder="AIza..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowGoogleKey((v) => !v)}
                        >
                          {showGoogleKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  className={classes.saveBtn}
                  onClick={handleSaveGooglePlacesKey}
                  disabled={savingGoogleKey}
                >
                  {savingGoogleKey ? "Salvando..." : "Salvar chave"}
                </Button>
              </div>
            </div>
          </TabPanel>
        )}
      </Paper>
    </div>
  );
};

export default SettingsCustom;
