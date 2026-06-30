FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies (ignoring the large payload/next dependencies to keep it light)
RUN npm install express cors

# Copy all other project files
COPY . .

# Build the static site (generates the site/ folder)
RUN node build.cjs

# Expose the port
EXPOSE 3000

# Start the Express server
CMD ["node", "server.js"]
