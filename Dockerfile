FROM node:18

# create and set the working directory
WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]