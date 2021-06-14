FROM node:14-slim

# Create app directory
RUN mkdir -p /home/boilerplate
WORKDIR /home/boilerplate

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /home/boilerplate

# Install dependencies
RUN npm install
RUN npm install @angular/cli@latest -g

EXPOSE 7000 49153

CMD [ "npm", "start" ]