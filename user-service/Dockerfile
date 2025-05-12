 # FROM node:20-alpine

 # WORKDIR /app

 # COPY package*.json ./

 # RUN npm install

 # COPY . .

 # EXPOSE 5000

 # CMD ["node", "server.js"]

 FROM node:18

# Create app directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose the port (matches the one in .env)
EXPOSE 5000

# Set environment variables file for production
# (Optional, usually managed by ECS or Docker Compose)
# ENV PORT=5000

# Start the server
CMD ["node", "server.js"]
