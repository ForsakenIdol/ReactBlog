### The Dockerfile for the frontend.

FROM node:12.18.3-alpine AS frontend
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN npm install
COPY . ./