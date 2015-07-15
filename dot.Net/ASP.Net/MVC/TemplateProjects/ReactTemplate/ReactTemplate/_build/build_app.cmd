@echo off
cd /d %~dp0
cmd /C js2jsx "../Scripts/app" "../Scripts/app" -d *.js utf-8
cmd /C convert_jsx "../Scripts/app"
pause