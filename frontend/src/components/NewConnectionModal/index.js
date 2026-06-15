import React from "react";
import {
  Dialog,
  DialogContent,
  Grid,
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    borderRadius: 16,
    maxWidth: 800,
    width: "100%",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px 14px",
    borderBottom: "1px solid #f0f0f0",
  },
  titleText: {
    fontWeight: 700,
    fontSize: 20,
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  dialogContent: {
    padding: "20px 24px 28px",
    backgroundColor: "#f8fafc",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: "18px 16px 14px",
    border: "1.5px solid #e5e7eb",
    cursor: "pointer",
    transition: "all 0.18s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    position: "relative",
    minHeight: 140,
    "&:hover": {
      borderColor: "#6366f1",
      boxShadow: "0 6px 20px rgba(99,102,241,0.13)",
      transform: "translateY(-3px)",
    },
  },
  cardDisabled: {
    backgroundColor: "#fafafa",
    borderRadius: 14,
    padding: "18px 16px 14px",
    border: "1.5px dashed #e5e7eb",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    position: "relative",
    minHeight: 140,
    opacity: 0.7,
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    overflow: "hidden",
  },
  cardName: {
    fontWeight: 700,
    fontSize: 14,
    color: "#111827",
    lineHeight: 1.2,
  },
  cardDesc: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.45,
    flex: 1,
  },
  connectBtn: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 8,
    padding: "4px 14px",
    alignSelf: "flex-start",
  },
  chip: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 20,
    fontSize: 10,
    fontWeight: 700,
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
  },
  chipRecommended: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 20,
    fontSize: 10,
    fontWeight: 700,
    backgroundColor: "#dcfce7",
    color: "#15803d",
  },
}));

// ──────────────── Brand Logos (SVG inline) ────────────────

const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const EmailLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const GoogleMyBusinessLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#34A853"/>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="none" stroke="#34A853" strokeWidth="0.5"/>
    <circle cx="12" cy="9" r="2.5" fill="white"/>
    <text x="12" y="9.9" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#4285F4">G</text>
  </svg>
);

const MetaAdsLogo = () => (
  <svg viewBox="0 0 200 200" width="28" height="28">
    <defs>
      <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0064E0"/>
        <stop offset="50%" stopColor="#0064E0"/>
        <stop offset="100%" stopColor="#0082FB"/>
      </linearGradient>
    </defs>
    <path d="M30 110 Q30 65 65 65 Q90 65 105 100 Q120 65 145 65 Q175 65 175 110 Q175 155 145 155 Q120 155 105 120 Q90 155 65 155 Q30 155 30 110 Z" fill="url(#metaGrad)"/>
  </svg>
);

const GoogleAdsLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26">
    <path d="M2.259 17.744l5.998-10.39A3.993 3.993 0 0112 6c1.37 0 2.57.69 3.26 1.74l.01-.01 5.99 10.39A3.99 3.99 0 0117.99 24H6.01a3.99 3.99 0 01-3.75-6.256z" fill="#FBBC04"/>
    <circle cx="18.5" cy="6.5" r="4.5" fill="#34A853"/>
    <path d="M5.5 11a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" fill="#4285F4"/>
  </svg>
);

// ─────────────────────────────────────────────────────────

const ConnectionCard = ({ logo, name, desc, color, bgColor, onClick, disabled, recommended }) => {
  const classes = useStyles();
  return (
    <Box className={disabled ? classes.cardDisabled : classes.card} onClick={!disabled ? onClick : undefined}>
      {disabled && <Chip label="Em breve" size="small" className={classes.chip} />}
      {recommended && !disabled && <Chip label="⭐ Recomendado" size="small" className={classes.chipRecommended} />}
      <Box className={classes.logoWrap}
        style={bgColor.startsWith("linear") ? { background: bgColor } : { backgroundColor: bgColor }}>
        {logo}
      </Box>
      <Typography className={classes.cardName}>{name}</Typography>
      <Typography className={classes.cardDesc}>{desc}</Typography>
      {!disabled ? (
        <Button
          size="small"
          variant="contained"
          disableElevation
          className={classes.connectBtn}
          style={{ backgroundColor: color, color: "#fff" }}
        >
          Conectar
        </Button>
      ) : (
        <Button size="small" variant="outlined" disabled className={classes.connectBtn}
          style={{ color: "#d1d5db", borderColor: "#e5e7eb" }}>
          Em breve
        </Button>
      )}
    </Box>
  );
};

// ─────────────────────────────────────────────────────────

const NewConnectionModal = ({
  open,
  onClose,
  onWhatsApp,
  onWhatsAppOfficial,
  onEmail,
  onFacebook,
  onInstagram,
  onGoogleMyBusiness,
  planConfig,
}) => {
  const classes = useStyles();

  const go = (fn) => () => { fn(); onClose(); };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: classes.dialogPaper }}>
      <Box className={classes.dialogTitle}>
        <Box>
          <Typography className={classes.titleText}>Adicionar Conexão</Typography>
          <Typography className={classes.subtitle}>Escolha o canal que deseja integrar ao atendimento</Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><Close /></IconButton>
      </Box>

      <DialogContent className={classes.dialogContent}>
        <Typography className={classes.sectionLabel}>Canais disponíveis</Typography>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={6} md={4}>
            <ConnectionCard
              logo={<WhatsAppLogo />}
              name="WhatsApp"
              desc="Conecte via QR Code. Ideal para uso pessoal e pequenas equipes."
              color="#25D366"
              bgColor="#25D366"
              onClick={go(onWhatsApp)}
              disabled={!planConfig?.plan?.useWhatsapp}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ConnectionCard
              logo={<WhatsAppLogo />}
              name="WhatsApp Oficial"
              desc="API Oficial da Meta (Cloud API). Mais confiável para empresas."
              color="#128C7E"
              bgColor="#128C7E"
              onClick={go(onWhatsAppOfficial)}
              recommended
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ConnectionCard
              logo={<EmailLogo />}
              name="E-mail"
              desc="Receba e responda e-mails diretamente no sistema de atendimento."
              color="#4299e1"
              bgColor="#4299e1"
              onClick={go(onEmail)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ConnectionCard
              logo={<FacebookLogo />}
              name="Facebook"
              desc="Conecte sua Página para atender pelo Facebook Messenger."
              color="#1877f2"
              bgColor="#1877f2"
              onClick={go(onFacebook)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ConnectionCard
              logo={
                <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              }
              name="Instagram"
              desc="Atenda mensagens diretas do Instagram Business no sistema."
              color="#e1306c"
              bgColor="linear-gradient(45deg, #FD5949, #D6249F, #285AEB)"
              onClick={go(onInstagram)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ConnectionCard
              logo={
                <svg viewBox="0 0 48 48" width="28" height="28">
                  <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.9 33.3 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.4-7.9 19.8-18.7.1-.4.2-.9.2-1.3 0-1.3-.1-2.7-.4-4z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.4 0-13.8 4-17.7 10.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.4 26.8 36 24 36c-5.4 0-9.9-3-11.3-7.1l-6.6 5.1C9.8 40.5 16.4 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.6-2.7 4.8-5 6.3l6.2 5.2C40 36.1 44 30.4 44 24c0-1.3-.1-2.7-.4-4z"/>
                </svg>
              }
              name="Google Meu Negócio"
              desc="Gerencie avaliações, posts e métricas do seu perfil Google."
              color="#4285f4"
              bgColor="#fff"
              onClick={go(onGoogleMyBusiness)}
            />
          </Grid>

        </Grid>

        <Typography className={classes.sectionLabel} style={{ marginTop: 24 }}>Em breve</Typography>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={6} md={4}>
            <ConnectionCard
              logo={<MetaAdsLogo />}
              name="Meta Ads"
              desc="Capture e qualifique leads de campanhas do Facebook e Instagram."
              color="#0866FF"
              bgColor="#fff"
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ConnectionCard
              logo={<GoogleAdsLogo />}
              name="Google Ads"
              desc="Receba e atenda leads captados por campanhas do Google Ads."
              color="#EA4335"
              bgColor="#fff"
              disabled
            />
          </Grid>

        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewConnectionModal;
