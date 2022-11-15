FROM node:16.14-alpine
WORKDIR /app-backend

COPY . .
RUN npm install && npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
