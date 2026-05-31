Write-Host "Starting Django backend..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\backend"
.\venv\Scripts\python manage.py runserver 8000
