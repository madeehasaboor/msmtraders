@echo off
echo Fixing image paths in car care.html...
powershell -Command "(Get-Content 'car care.html') -replace 'products/', '' | Set-Content 'car care.html'"
echo Image paths fixed successfully!
pause
