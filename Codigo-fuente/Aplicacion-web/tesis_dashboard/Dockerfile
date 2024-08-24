FROM node:lts-alpine as build-stage
WORKDIR /app

ARG VITE_BACKEND_URL
ARG VITE_BASE
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_BASE=$VITE_BASE

COPY tesis_frontend/package*.json ./
RUN npm install
COPY tesis_frontend/ .
RUN npm run build


FROM node:20-alpine as integration-stage
WORKDIR /app

COPY tesis_dashboard/package*.json ./
RUN npm install --omit=dev
COPY tesis_dashboard/ .

COPY --from=build-stage /app/dist ./front
CMD node seed/seeder.js -i && \
node index.js
