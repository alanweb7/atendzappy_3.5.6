import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function GoogleAds() {
  return (
    <Box style={{ padding: 24, backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Box style={{ textAlign: "center", maxWidth: 420 }}>
        <Box style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#fef9c3", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <span style={{ fontSize: 36 }}>🚀</span>
        </Box>
        <Typography variant="h5" style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>
          Google Ads — Em breve
        </Typography>
        <Typography style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          Em breve você poderá capturar leads de campanhas do <strong>Google Ads</strong> e atendê-los diretamente no sistema de forma automática.
        </Typography>
        <Box style={{ padding: "12px 20px", backgroundColor: "#fef9c3", borderRadius: 8, border: "1px solid #fde047" }}>
          <Typography style={{ fontSize: 13, color: "#854d0e", fontWeight: 600 }}>⚙️ Funcionalidade em desenvolvimento</Typography>
          <Typography style={{ fontSize: 12, color: "#713f12", marginTop: 4 }}>
            Integração com Google Ads API, captura de leads e distribuição automática para atendentes.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
