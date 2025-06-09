FROM node:20-alpine

WORKDIR /app

# Install Strapi CLI globally
RUN npm install -g @strapi/strapi@latest

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Install Strapi SEO plugin
RUN npm install @strapi/plugin-seo

# Create uploads directory
RUN mkdir -p ./public/uploadscms.

# Copy the application
COPY . .

# Make start script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 1337

# Start the application in development mode
CMD ["./start.sh"]
