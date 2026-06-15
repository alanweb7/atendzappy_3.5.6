import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function MetaAds() {
  return (
    <Box style={{ padding: 24, backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Box style={{ textAlign: "center", maxWidth: 420 }}>
        <Box style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <span style={{ fontSize: 36 }}>🚀</span>
        </Box>
        <Typography variant="h5" style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>
          Meta Ads — Em breve
        </Typography>
        <Typography style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          Em breve você poderá capturar e qualificar leads diretamente de campanhas do <strong>Facebook Ads</strong> e <strong>Instagram Ads</strong> dentro do sistema.
        </Typography>
        <Box style={{ padding: "12px 20px", backgroundColor: "#fff7ed", borderRadius: 8, border: "1px solid #fed7aa" }}>
          <Typography style={{ fontSize: 13, color: "#c2410c", fontWeight: 600 }}>⚙️ Funcionalidade em desenvolvimento</Typography>
          <Typography style={{ fontSize: 12, color: "#9a3412", marginTop: 4 }}>
            Integração com Meta Ads API, captura de leads de formulários e qualificação automática.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
