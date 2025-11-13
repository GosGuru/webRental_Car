# Script para generar AUTH_SECRET
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Generador de AUTH_SECRET" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Generar secret aleatorio
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)

Write-Host "Tu nuevo AUTH_SECRET:" -ForegroundColor Green
Write-Host $secret -ForegroundColor Yellow
Write-Host ""
Write-Host "Pasos a seguir:" -ForegroundColor Cyan
Write-Host "1. Copia el secret de arriba" -ForegroundColor White
Write-Host "2. Ve a Vercel > Settings > Environment Variables" -ForegroundColor White
Write-Host "3. Agrega una nueva variable:" -ForegroundColor White
Write-Host "   - Key: AUTH_SECRET" -ForegroundColor White
Write-Host "   - Value: (pega el secret)" -ForegroundColor White
Write-Host "4. Selecciona Production, Preview y Development" -ForegroundColor White
Write-Host "5. Click Save" -ForegroundColor White
Write-Host "6. Redeploy tu aplicacion" -ForegroundColor White
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan

# Copiar al clipboard si está disponible
try {
    Set-Clipboard -Value $secret
    Write-Host "✓ Secret copiado al portapapeles!" -ForegroundColor Green
} catch {
    Write-Host "! No se pudo copiar al portapapeles automaticamente" -ForegroundColor Yellow
}

Write-Host ""
