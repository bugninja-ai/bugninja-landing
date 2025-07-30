#!/bin/bash
# Easy setup and launch script for the Article Generator

echo "🚀 Setting up Article Generator..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is required but not installed."
    exit 1
fi

# Install requirements
echo "📦 Installing required packages..."
pip3 install -r requirements.txt

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️ .env file not found. Creating template..."
    cat > .env << EOL
# Strapi Configuration
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token-here

# Azure OpenAI Configuration  
AZURE_OPENAI_API_KEY=your-azure-openai-key-here
AZURE_OPENAI_ENDPOINT=your-azure-openai-endpoint-here
EOL
    echo "📝 Please edit the .env file with your actual credentials before running the app."
    echo "💡 You can find your Strapi API token in the Strapi admin panel under Settings > API Tokens"
    exit 1
fi

# Note: Images are now uploaded through the web interface, no local directory needed

echo "✅ Setup complete!"
echo "🌟 Starting Article Generator..."
echo "🔗 The app will open at http://localhost:8501"

# Run the Streamlit app
streamlit run article_generator_app.py