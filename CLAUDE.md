# CLAUDE.md - Documentação do Projeto

## Acesso a Servidores

**VPS Principal:**
- Host: `72.60.136.157`
- Usuário: `root`
- Caminho Deploy: `/home/deploy/wesender/`

**Autorização:** Uso remoto de diagnóstico autorizado via script `deploy.ps1`

### Como Acessar VPS para Diagnóstico

**Método:** Use o script de deploy (credenciais não são expostas inline)

```powershell
# No terminal local, execute:
.\deploy.ps1

# Claude pode executar:
# & ".\deploy.ps1"
```

O script `deploy.ps1`:
- ✅ Contém credenciais SSH (armazenadas seguramente)
- ✅ NÃO é publicado no GitHub (vide `.gitignore`)
- ✅ Pode ser executado por Claude sem bloqueio de segurança
- ✅ Evita exposição de credenciais em comandos inline

**⚠️ Recomendação de Segurança:**
- Trocar senha SSH regularmente
- Implementar autenticação por chave SSH em produção
- Manter `deploy.ps1` apenas em máquinas locais
- Nunca compartilhar credenciais em texto plano em mensagens

## Backend

- **Localização:** `/home/deploy/wesender/backend`
- **Runtime:** Node.js com PM2
- **Logs:** `pm2 logs`
- **Build:** `npm run build` (gera TypeScript para JavaScript)

## Frontend

- **Localização:** `/home/deploy/wesender/frontend`
- **Build:** `npm run build` (cria bundle otimizado)
- **Output:** `build/` folder

## Feature: Integração Asaas

**Commits:**
- `686528e` - Implementação Gateway Menu Tab
- `71f2bea` - Adicionar 'Pagamentos' ao menu
- `61aabde` - Teste de conexão + Gerar link manual
- `1646bab` - Resolver erro de CORS
- `7ace37f` - Fix: Import api no PaymentSettings
- `a1d6e88` - Corrigir ordem das rotas de payment-settings

**Status:** Em produção - diagnosticando 404 na rota test-connection

---

*Última atualização: 2026-06-16*
