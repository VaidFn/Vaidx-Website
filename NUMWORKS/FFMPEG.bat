@echo off
cls

:: Définit les chemins
set INPUT=%USERPROFILE%\Desktop\input.mp4
set OUTPUT=%USERPROFILE%\Desktop\output.mjpeg

:: Exécute FFmpeg avec les options
ffmpeg -i "%INPUT%" -vf "scale=320:240,setsar=1:1,fps=15" -t 00:00:43 -vcodec mjpeg "%OUTPUT%"

echo.
echo Conversion terminée. Le fichier est sur ton bureau : output.mjpeg
pause
