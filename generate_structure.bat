@echo off
:: Set the root directory
set ROOT_DIR=D:\Coolie\backend

:: Log file path
set LOG_FILE=%ROOT_DIR%\setup.log

:: Initialize log file
if exist %LOG_FILE% del %LOG_FILE%
echo Project setup started at %date% %time% > %LOG_FILE%
echo. >> %LOG_FILE%

:: Create the main directory
echo Creating main directory: %ROOT_DIR% >> %LOG_FILE%
mkdir %ROOT_DIR% 2>> %LOG_FILE%

:: Create subdirectories
for %%D in (src src\controllers src\middlewares src\models src\routes src\config src\utils) do (
    echo Creating directory: %%D >> %LOG_FILE%
    mkdir %ROOT_DIR%\%%D 2>> %LOG_FILE%
)

:: Create placeholder files
echo Creating file: src\app.js >> %LOG_FILE%
echo // Main entry point for the app > %ROOT_DIR%\src\app.js

echo Creating file: .env >> %LOG_FILE%
echo > %ROOT_DIR%\.env

echo Creating file: .gitignore >> %LOG_FILE%
echo node_modules/ > %ROOT_DIR%\.gitignore

echo Creating file: package.json >> %LOG_FILE%
echo {
    "name": "backend",
    "version": "1.0.0",
    "main": "src/app.js",
    "scripts": {
        "start": "node src/app.js",
        "dev": "nodemon src/app.js"
    },
    "dependencies": {},
    "devDependencies": {}
} > %ROOT_DIR%\package.json

echo Creating file: Dockerfile >> %LOG_FILE%
echo # Docker container setup > %ROOT_DIR%\Dockerfile

:: Log completion
echo. >> %LOG_FILE%
echo Project structure successfully created at %date% %time% >> %LOG_FILE%
echo Logs can be found in %LOG_FILE%
echo.

:: Display success message
echo Project structure has been created successfully!
echo Check the log file for details: %LOG_FILE%
pause
