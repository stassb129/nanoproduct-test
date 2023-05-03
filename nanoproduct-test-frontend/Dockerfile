FROM node:14-alpine as build

RUN mkdir -p /app/nanoproduct-test-frontend
WORKDIR /app/nanoproduct-test-frontend


COPY package.json /app/nanoproduct-test-frontend/

RUN npm install

COPY . /app/nanoproduct-test-frontend/

CMD ["npm", "start"]