@echo off
echo Starting Healthcare Document Management System...
echo.

echo Starting Backend...
start cmd /k "cd backend && call start.bat"

timeout /t 3 /nobreak > nul

echo Starting Frontend...
start cmd /k "npm run dev"

echo.
echo Services starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
