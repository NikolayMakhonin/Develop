cd /d %~dp0
cls
for /F "tokens=*" %%A in (build_files.txt) do cmd /C build_one_release %%A
pause