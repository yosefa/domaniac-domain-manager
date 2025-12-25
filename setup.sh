#!/bin/bash

# Domaniac Setup Script for Cloudflare Pages

echo "🚀 Setting up Domaniac Domain Manager..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler is not installed. Installing globally..."
    npm install -g wrangler
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Login to Cloudflare
echo "🔐 Please login to Cloudflare..."
wrangler login

# Create D1 database
echo "💾 Creating D1 database..."
echo "Please run: npm run db:create"
echo "Then copy the database_id and update it in wrangler.toml"
echo ""
echo "After updating wrangler.toml, run:"
echo "  npm run db:migrate:local    # For local development"
echo "  npm run db:migrate:remote   # For production"
echo ""
echo "Then start the dev server with:"
echo "  npm run pages:dev"
echo ""
echo "✅ Setup complete! Follow the instructions above to finish configuration."
