@ECHO OFF
SET arg1=%1
SET arg2=%2
chdir /d %arg1%%arg2%
call git init
call git add .
call git commit -m "Initialize project"
rmdir /s /q "%arg1%%arg2%"
