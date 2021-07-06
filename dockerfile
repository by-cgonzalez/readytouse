FROM node:13.7.0-alpine3.11 as build

WORKDIR /

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src src
COPY public public
COPY webpack.config.js .
COPY .babelrc .
COPY .env .


RUN npm run build

FROM nginx:1.16.1-alpine
COPY --from=build /dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8091
CMD ["nginx", "-g", "daemon off;"]