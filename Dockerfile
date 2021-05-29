FROM node:14-alpine

# Create node_modules in home dir to ensure that desired permissions 
# are stablished to default user
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Change user to node to avoid execute npm install with root user
USER node 

# Install dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

EXPOSE 7000

CMD ["npm", "start"]
