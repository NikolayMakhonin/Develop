cd /d %~dp0
tsc --out "%~2" --sourceMap --sourceRoot "./" -t ES5 "%~1"