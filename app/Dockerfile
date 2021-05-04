FROM node:lts-alpine

RUN npm install -g serve

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./serve.json ./dist

RUN npm run build

CMD [ "serve", "--listen 8080", "dist" ]

