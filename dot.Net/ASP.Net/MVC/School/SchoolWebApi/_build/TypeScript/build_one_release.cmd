cd /d %~dp0
cmd /C build "%~1" "%~2"
cmd /C minify "%~2"