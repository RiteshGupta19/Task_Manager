# Use the official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Copy environment file (optional – only if you want to include it inside the image)
# COPY .env ./

# Expose the app port (optional, just for documentation)
EXPOSE 5001

# Use nodemon for development or node for production
CMD ["node", "server.js"]
