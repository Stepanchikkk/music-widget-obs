@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :9876 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul
timeout /t 1 /nobreak >nul
start "" "%~dp0launch.vbs"
