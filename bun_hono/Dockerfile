# Use the official Bun image
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Copy all files and install dependencies
COPY . .
RUN bun install --frozen-lockfile

# Set environment and expose port
ENV NODE_ENV=development
EXPOSE 3001/tcp

# Run the app
USER bun
ENTRYPOINT ["bun", "run", "dev"]