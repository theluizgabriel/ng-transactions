FROM node:16.14-alpine
WORKDIR /app-backend

COPY . .
RUN npm i && npm run build

EXPOSE 3002

