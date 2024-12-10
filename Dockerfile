# Use the Node.js LTS image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (Render uses PORT)
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
