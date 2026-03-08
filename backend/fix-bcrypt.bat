@echo off
echo ========================================
echo Fixing bcrypt compatibility issue
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Step 2: Uninstalling old bcrypt and passlib...
pip uninstall -y bcrypt passlib

echo.
echo Step 3: Installing compatible versions...
pip install -r requirements.txt

echo.
echo Step 4: Initializing database...
python init_db.py

echo.
echo ========================================
echo Done! If successful, you can now run:
echo   start.bat
echo ========================================
pause
