@echo off
echo Cleaning Node Modules and Cache...

REM Delete node_modules folder
rmdir /s /q node_modules

REM Delete package-lock.json
del package-lock.json

REM Clear npm cache
npm cache clean --force

REM Reinstall dependencies
echo Installing dependencies...
npm install

REM Check Tailwind installation
echo Checking Tailwind installation...
npm list tailwindcss

REM If Tailwind is missing, install it
echo Installing Tailwind CSS...
npm install -D tailwindcss

REM Verify Tailwind installation
echo Verifying Tailwind CSS...
npx tailwindcss -v

echo Done! Restart your terminal if needed.
pause
