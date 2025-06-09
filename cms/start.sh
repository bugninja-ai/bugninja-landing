#!/bin/sh

# Install required dependencies for Strapi admin
npm install react@18.0.0 react-dom@18.0.0 react-router-dom@5.2.0 styled-components@5.2.1

# Install Strapi SEO plugin
npm install @strapi/plugin-seo

# Start Strapi in development mode with auto-yes for any prompts
yes | npm run develop 