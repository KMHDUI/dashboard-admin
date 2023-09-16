# Use Node.js 18.16.0 as the base image
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose a port for the application (change this to match your application's port)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]