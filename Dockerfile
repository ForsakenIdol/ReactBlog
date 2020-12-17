### Development and production flows for the frontend React app.
### FOR THE BUILD STAGE: https://hub.docker.com/r/tiangolo/node-frontend

### The dev stage is able to track changes in local files!!!

FROM node:12.18.3 AS dev
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN npm install
COPY . ./
CMD ["npm", "start"]

FROM tiangolo/node-frontend:10 as build
WORKDIR /app
COPY package*.json yarn.lock ./
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]