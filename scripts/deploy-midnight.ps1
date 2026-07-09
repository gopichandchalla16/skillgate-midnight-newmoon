param(
  [ValidateSet('preview','preprod')]
  [string]$Network = 'preview'
)

Write-Host "Scaffolding a Midnight hello-world app for network: $Network" -ForegroundColor Cyan
Write-Host "Run the following commands in a fresh folder:" -ForegroundColor Yellow
Write-Host ""
Write-Host "npx create-mn-app my-midnight-app --template hello-world" -ForegroundColor Green
Write-Host "cd my-midnight-app" -ForegroundColor Green
Write-Host "npm run setup -- --network $Network" -ForegroundColor Green
Write-Host ""
Write-Host "If the CLI asks for funds, use:" -ForegroundColor Yellow
if ($Network -eq 'preview') {
  Write-Host "https://midnight-tmnight-preview.nethermind.dev/" -ForegroundColor Green
} else {
  Write-Host "https://midnight-tmnight-preprod.nethermind.dev/" -ForegroundColor Green
}
Write-Host ""
Write-Host "The deployed contract address will be written to .midnight-state.json" -ForegroundColor Cyan
