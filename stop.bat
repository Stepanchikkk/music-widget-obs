@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :9876 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul
if %errorlevel% equ 0 (
    echo [+] Сервер остановлен
) else (
    echo [!] Сервер не был запущен
)
