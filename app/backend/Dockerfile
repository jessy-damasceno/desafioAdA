FROM node:16.14-slim

WORKDIR /app-backend

EXPOSE 3001

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]