@echo off
REM smartSave.bat - Windows Command Prompt wrapper for the interactive smartSave utility
REM Options: 3) Backup, 5) Backup with Comment
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0smartSave.ps1"
if errorlevel 1 exit /b %errorlevel%
endlocal
