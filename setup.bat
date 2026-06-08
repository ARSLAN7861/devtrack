@echo off
echo.
echo  ==========================================
echo   DevTrack — Setup
echo  ==========================================
echo.

:: Check if dist/index.html already exists (pre-built)
if exist "dist\index.html" (
    echo  Pre-built app found in dist\
    echo  Opening DevTrack...
    echo.
    start "" "dist\index.html"
    echo  Done. DevTrack should now be open in your browser.
    echo  If it didn't open, double-click dist\index.html manually.
    echo.
    pause
    exit /b 0
)

:: dist not present — need to build from source
echo  No pre-built app found. Building from source...
echo.

:: Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  ERROR: Node.js is not installed.
    echo.
    echo  Please install Node.js from https://nodejs.org
    echo  Choose the LTS version ^(18 or higher^).
    echo  Then run this setup.bat again.
    echo.
    pause
    exit /b 1
)

echo  Node.js found:
node --version
echo.

:: Install dependencies
echo  Installing dependencies ^(this takes ~1 minute^)...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo  ERROR: npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
)

:: Build
echo.
echo  Building app...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo  ERROR: Build failed. See errors above.
    pause
    exit /b 1
)

echo.
echo  ==========================================
echo   Build complete!
echo  ==========================================
echo.
echo  Opening DevTrack...
start "" "dist\index.html"
echo.
echo  DevTrack is now open in your default browser.
echo  If it didn't open, double-click dist\index.html manually.
echo.
pause
