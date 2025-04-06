@echo off
echo Running API tests...
powershell -Command "& {
    try {
        Invoke-RestMethod -Uri 'http://localhost:3000/add-product' `
        -Method Post `
        -Headers @{ 'Authorization'='Bearer YOUR_FIREBASE_ID_TOKEN' } `
        -ContentType 'application/json'
    } catch {
        Write-Host 'Error: ' $_.Exception.Message
    }
}"
pause
