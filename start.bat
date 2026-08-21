@echo off
cd /d "%~dp0"
if exist "%USERPROFILE%\.tmp-node\node-v24.18.1-win-x64\node.exe" (
  set "PATH=%USERPROFILE%\.tmp-node\node-v24.18.1-win-x64;%PATH%"
)
if not exist "node_modules" (
  echo Installing packages...
  call npm.cmd install
)
if not exist ".env" (
  echo Copy .env.example to .env and fill in your Discord bot values, then run start.bat again.
  pause
  exit /b 1
)
node server.js
pause
