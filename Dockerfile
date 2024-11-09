# Use official Node.js image as base
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

RUN echo "VITE_BACKEND_URL=http://localhost:3000" > .env


# Dynamically inject environment variables into .env file at build time
# RUN apt-get update && apt-get install -y gettext-base \
#     && envsubst < .env.frontend > .env \
#     && rm .env.frontend



# Build the frontend (this compiles the Vite project)
RUN npm run build

# Install Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

# Copy Nginx configuration file (assuming you have a custom one in your frontend folder)
COPY ./nginx/nginx.conf /etc/nginx
COPY --from=build ./app/dist /usr/share/nginx/html


# Start Nginx and serve the built frontend from Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]