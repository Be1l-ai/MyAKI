#!/bin/bash

echo "🎉 Anniversary Page Setup 🎉"
echo "=============================="
echo ""

# Check if we're in the anniversary directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the anniversary/ directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🎨 Setup Instructions:"
    echo "===================="
    echo "1. Add your images to: assets/images/"
    echo "2. Add your GIFs to: assets/gifs/"
    echo "3. Update Spotify URL in: src/components/SpotifyPlayer.jsx"
    echo "4. Customize love letter in: src/components/LoveLetter.jsx"
    echo "5. Edit timeline data in: timeline.json"
    echo ""
    echo "🚀 To start the development server, run:"
    echo "   npm run dev"
    echo ""
    echo "📖 For detailed instructions, see SETUP_GUIDE.md"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
