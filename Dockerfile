FROM node:16

WORKDIR /app
COPY */ /app/


Run npm install 

COPY . .
