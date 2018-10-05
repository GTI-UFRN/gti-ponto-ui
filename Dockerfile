# build stage
FROM node:9.11.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN  export NODE_ENV=production
RUN npm install
COPY . ./
RUN node node_modules/quasar-cli/bin/quasar-build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist/spa-mat /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]