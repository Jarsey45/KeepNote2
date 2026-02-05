FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache --upgrade python3 make g++ libc6-compat bash

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "y" | npx auth secret

# Make the startup script executable
COPY startApp.sh ./
RUN chmod +x /app/startApp.sh

EXPOSE 3000

CMD ["/app/startApp.sh"]

# could be better, maybe we can use a multi-stage build to reduce the image size by only copying the necessary files for production, but for now this should work fine for development and testing purposes.
#https://authjs.dev/getting-started/deployment#docker
