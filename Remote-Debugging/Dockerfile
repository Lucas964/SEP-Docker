
FROM node:8.7.0-alpine

WORKDIR /server

COPY . /server
RUN yarn install

EXPOSE 8080
CMD [ "yarn", "start" ]