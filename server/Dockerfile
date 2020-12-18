# FROM tiangolo/node-frontend:10 AS build
# WORKDIR /app
# COPY package*.json yarn.lock ./
# RUN npm install
# COPY ./ /app/
# RUN npm run build

# FROM nginx:1.19-alpine AS prod
# COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

### Backend server setup

# FROM node:12.18.3-alpine AS server
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . ./
# RUN npm audit fix
# CMD ["node", "server.js"]

### The Dockerfile for the server.

FROM node:12.18.3-alpine AS backend
WORKDIR /usr/src/app
COPY package.json server.js wait-for.sh ./
RUN npm install && npm audit fix && npm install -g nodemon
CMD ["nodemon", "server.js"]