FROM node:20-alpine

WORKDIR /app

# Install Strapi CLI globally
RUN npm install -g @strapi/strapi@latest

# Copy package files
COPY package*.json ./
COPY favicon.ico ./

# Clean install dependencies with verbose logging
RUN npm install --verbose --no-optional

# Install required dependencies for Strapi admin
RUN npm install react@18.0.0 react-dom@18.0.0 react-router-dom@5.2.0 styled-components@5.2.1 --verbose

# Install Strapi SEO plugin
RUN npm install @strapi/plugin-seo

RUN npm update --verbose

# Create uploads directory
RUN mkdir -p ./public/uploadscms.

# Copy the application
COPY . .

# Make start script executable
 RUN sed -i 's/\r$//' start.sh  && \  
     chmod +x start.sh

# Expose port
EXPOSE 1337

# Start the application in development mode
CMD ["./start.sh"]
