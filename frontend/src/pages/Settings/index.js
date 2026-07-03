import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
} from "@material-ui/core";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { AuthContext } from "../../context/Auth/AuthContext";
import ForbiddenPage from "../../components/ForbiddenPage";

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
  },
  tabsRoot: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    paddingLeft: theme.spacing(2),
  },
  tab: {
    textTransform: "none",
    fontWeight: 600,
    fontSize: "14px",
    minWidth: 120,
    color: "#6b7280",
    "&.Mui-selected": {
      color: theme.palette.primary.main,
    },
  },
  tabPanel: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(4),
    minHeight: 320,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(6),
    color: "#9ca3af",
    gap: theme.spacing(1),
  },
  emptyIcon: {
    fontSize: 48,
    color: "#d1d5db",
    marginBottom: theme.spacing(1),
  },
  emptyText: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#6b7280",
  },
  emptySubtext: {
    fontSize: "13px",
    color: "#9ca3af",
  },
}));

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function EmptyTab({ label }) {
  const classes = useStyles();
  return (
    <div className={classes.emptyState}>
      <TuneIcon className={classes.emptyIcon} />
      <Typography className={classes.emptyText}>
        {label}
      </Typography>
      <Typography className={classes.emptySubtext}>
        Em breve as configurações estarão disponíveis aqui.
      </Typography>
    </div>
  );
}

const TABS = [
  { label: "Opções", icon: <SettingsOutlinedIcon style={{ fontSize: 16 }} /> },
  { label: "Horários", icon: <AccessTimeIcon style={{ fontSize: 16 }} /> },
];

const Settings = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState(0);

  if (user.profile === "user") {
    return <ForbiddenPage />;
  }

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
          onChange={(_, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabsRoot}
        >
          {TABS.map((t, i) => (
            <Tab
              key={i}
              label={t.label}
              icon={t.icon}
              className={classes.tab}
            />
          ))}
        </Tabs>

        {TABS.map((t, i) => (
          <TabPanel key={i} value={tab} index={i}>
            <div className={classes.tabPanel}>
              <EmptyTab label={t.label} />
            </div>
          </TabPanel>
        ))}
      </Paper>
    </div>
  );
};

export default Settings;
