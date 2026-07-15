# Deploy script - Acesso VPS sem expor credenciais inline
# Este arquivo NÃO deve ser commitado (vide .gitignore)

$sshHost = "72.60.136.157"
$sshUser = "root"
$sshPassword = "5)ZhFVI/6jvQaXrB6y9#"
$deployPath = "/home/deploy/wesender"

# Função para executar comandos no VPS via SSH
function Invoke-VPS {
    param(
        [string]$Command
    )

    echo $sshPassword | ssh -o StrictHostKeyChecking=no -p 22 "$sshUser@$sshHost" $Command 2>&1
}

Write-Host "=== Iniciando Deploy ===" -ForegroundColor Cyan

# 1. Fazer pull das atualizações
Write-Host "`n[1/5] Fazendo pull do código..." -ForegroundColor Yellow
Invoke-VPS "cd $deployPath && git pull origin master"

# 2. Instalar dependências do backend
Write-Host "`n[2/5] Instalando dependências do backend..." -ForegroundColor Yellow
Invoke-VPS "cd $deployPath/backend && npm install"

# 3. Fazer build do backend
Write-Host "`n[3/5] Compilando backend..." -ForegroundColor Yellow
Invoke-VPS "cd $deployPath/backend && npm run build"

# 4. Recarregar processos do PM2
Write-Host "`n[4/5] Recarregando PM2..." -ForegroundColor Yellow
Invoke-VPS "cd $deployPath/backend && pm2 restart all --update-env"

# 5. Verificar status
Write-Host "`n[5/5] Verificando status..." -ForegroundColor Yellow
Invoke-VPS "pm2 status && echo '---' && pm2 logs --lines 20"

Write-Host "`n=== Deploy concluído! ===" -ForegroundColor Green
