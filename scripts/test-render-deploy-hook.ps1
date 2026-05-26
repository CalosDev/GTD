param(
  [Parameter(Mandatory = $false)]
  [string]$DeployHookUrl = $env:RENDER_DEPLOY_HOOK_URL
)

if ([string]::IsNullOrWhiteSpace($DeployHookUrl)) {
  Write-Error "Falta DeployHookUrl. Pasalo por parametro o define RENDER_DEPLOY_HOOK_URL."
  exit 1
}

try {
  $response = Invoke-WebRequest -Method Post -Uri $DeployHookUrl -TimeoutSec 20 -UseBasicParsing
  Write-Host "Deploy hook disparado."
  Write-Host ("Status: {0}" -f [int]$response.StatusCode)
  if ($response.Content) {
    Write-Host "Respuesta:"
    Write-Host $response.Content
  }
} catch {
  Write-Error ("Fallo al disparar el deploy hook: {0}" -f $_.Exception.Message)
  exit 1
}
