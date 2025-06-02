FROM node:17

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

EXPOSE 3000

# Build TypeScript and run with node
RUN npm run build
CMD ["npm", "start"]