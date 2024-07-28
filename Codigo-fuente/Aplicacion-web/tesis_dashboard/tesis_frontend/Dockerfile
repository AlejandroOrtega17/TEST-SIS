FROM node:lts-alpine as build-stage

RUN npm install -g http-server

WORKDIR /app

ARG VITE_BACKEND_URL

ARG VITE_BASE

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

ENV VITE_BASE=$VITE_BASE

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]