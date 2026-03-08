#!/bin/bash

echo "========================================"
echo "Fixing bcrypt compatibility issue"
echo "========================================"
echo ""

cd "$(dirname "$0")"

echo "Step 1: Activating virtual environment..."
source venv/Scripts/activate

echo ""
echo "Step 2: Uninstalling old bcrypt and passlib..."
pip uninstall -y bcrypt passlib

echo ""
echo "Step 3: Installing compatible versions..."
pip install -r requirements.txt

echo ""
echo "Step 4: Initializing database..."
python init_db.py

echo ""
echo "========================================"
echo "Done! If successful, you can now run:"
echo "  ./start.bat"
echo "========================================"
