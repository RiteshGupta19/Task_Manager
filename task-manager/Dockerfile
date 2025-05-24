FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port used by your dev server (Vite = 5173, React = 3000, etc.)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]



#  FROM node:20-alpine AS build

 
# WORKDIR /app

 
# COPY package*.json ./

 
# RUN npm install

 
# COPY . .

 
# RUN npm run build

 
# # FROM nginx:alpine

 
# # COPY --from=build /app/dist /usr/share/nginx/html

 
# EXPOSE 80

 

# # CMD ["nginx", "-g", "daemon off;"]
# CMD [npm run dev]
