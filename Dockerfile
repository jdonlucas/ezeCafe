FROM node:14-alpine

RUN apk update && apk add bash

# Install app dependencies
RUN mkdir /build-dir
WORKDIR /build-dir
COPY package*.json /build-dir
RUN npm install

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN ln -s /build-dir/node_modules node_modules

# Bundle app source
COPY . /usr/src/app

EXPOSE 7000

CMD [ "npm", "start" ]