@echo off
chcp 65001 >nul
setlocal
set PYTHONIOENCODING=utf-8
cd /d "%~dp0"

if "%~1"=="" (
  echo.
  echo   Drag and drop files onto this .bat to publish them on the portal.
  echo.
  python add_files.py --help
  echo.
  pause
  exit /b 1
)

python add_files.py %*

echo.
pause
