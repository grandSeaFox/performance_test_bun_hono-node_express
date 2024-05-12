# Use the official node image
FROM node:18-alpine as builder
WORKDIR /usr/src/app

# Copy all files and install dependencies
COPY . .
RUN npm install

# Set environment and expose port
ENV NODE_ENV=development
EXPOSE 3002


ENTRYPOINT ["npm", "run", "dev"]