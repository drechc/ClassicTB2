set PATH="C:\Program Files\7-Zip";%PATH%

REM Create classic.jar chrome file for theme
del "ClassicTB2\chrome\classic.jar"
7z a -tzip "ClassicTB2\chrome\classic.jar" ".\ClassicTB2\chrome\*"

REM Create theme xpi file. Exlude chrome directories, and add classic.jar instead
del classic_tb2-x.x.x-tb.xpi
del ClassicTB2.xpi
7z a -tzip ClassicTB2.xpi ".\ClassicTB2\*"  -x!"chrome\*"
cd ClassicTB2
7z a -tzip ..\ClassicTB2.xpi "chrome\classic.jar"
cd ..

move ClassicTB2.xpi classic_tb2-x.x.x-tb.xpi

REM Skip adding the extensions file, as it isn't supported anymore
goto CLEANUP

REM Create extensions xpi file
del ClassicTB2opt.xpi
7z a -tzip ClassicTB2opt.xpi ".\ClassicTB2opt\*"

REM Create combined xpi file
del classic_tb2-x.x.x-tb.xpi
7z a -tzip classic_tb2-x.x.x-tb.xpi ClassicTB2.xpi ClassicTB2opt.xpi install.rdf

:CLEANUP
REM Clean up temp files
del ClassicTB2.xpi
del ClassicTB2opt.xpi
del "ClassicTB2\chrome\classic.jar"

pause
