# Use Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Ensure uploads folder exists
RUN mkdir -p ./uploads

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "start"]
