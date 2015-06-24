cd /d %~dp0
cmd /C build "%~1" "%~2"
cmd /C remove_dead_code "%~2"