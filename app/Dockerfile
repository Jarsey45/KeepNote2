FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ libc6-compat

COPY package*.json ./
RUN npm install --force

COPY . .

RUN echo "y" | npx auth secret

# Make the startup script executable
COPY startApp.sh ./
RUN chmod +x startApp.sh

EXPOSE 3000

CMD ["./startApp.sh"]
