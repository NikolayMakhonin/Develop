@echo off
cd /d %~dp0
cmd /C jsx "%~1" "%~1" --target ES5 --no-cache-dir