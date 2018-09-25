# build stage
FROM node:9.11.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN  npm install -g quasar-cli @vue/cli @vue/cli-init && npm install
COPY . .
RUN quasar build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist/spa-mat /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]