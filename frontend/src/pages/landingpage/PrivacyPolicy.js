import React, { useEffect, useState } from "react";
import api from "../../services/api";

const PrivacyPolicy = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.get("/open/privacy-policy")
      .then(({ data }) => setContent(data?.value || ""))
      .catch(() => setContent(""));
  }, []);

  if (content === null) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6ff", padding: "48px 24px" }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        background: "#fff", borderRadius: 16, padding: 40,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
      }}>
        {content
          ? <div dangerouslySetInnerHTML={{ __html: content }} />
          : <p style={{ color: "#aaa" }}>Nenhum conteúdo cadastrado.</p>
        }
      </div>
    </div>
  );
};

export default PrivacyPolicy;
