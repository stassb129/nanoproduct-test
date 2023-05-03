# Используем Node.js как базовый образ
FROM node:14-alpine

RUN mkdir -p /app/nanoproduct-test-backend
WORKDIR /app/nanoproduct-test-backend


COPY package.json /app/nanoproduct-test-backend/

RUN npm install

COPY . /app/nanoproduct-test-backend/

CMD ["npm", "run", "start:dev"]