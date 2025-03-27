# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your app runs on
<<<<<<< HEAD
EXPOSE 8080
=======
EXPOSE 8081
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14

# Start your backend
CMD ["node", "server.js"]
