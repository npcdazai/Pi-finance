# Step 1: Use Node.js 18 image to build the app
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project directory
COPY . .

# Step 6: Build the app for production using Vite
RUN npm run build

# Step 7: Use Nginx to serve the static files
FROM nginx:stable-alpine

# Step 8: Copy the built files (dist folder) to Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the port Nginx will use
EXPOSE 80

# Step 10: Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
