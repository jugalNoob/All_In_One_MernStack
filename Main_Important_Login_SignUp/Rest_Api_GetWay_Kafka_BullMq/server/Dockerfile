# Stage 1: Build the application
FROM node:21 AS backend-builder

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Install dependencies
RUN npm install

# Stage 2: Create a lightweight image for production
FROM node:21-slim

# Set the working directory
WORKDIR /app

# Copy built application from the first stage
COPY --from=backend-builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]
