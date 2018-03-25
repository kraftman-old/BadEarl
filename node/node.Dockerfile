FROM node:8.9

# Create folder to store and run the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app

RUN npm install && npm cache clean --force
RUN npm install -g mocha nodemon

EXPOSE 8080

# Reset working dir for running project commands
WORKDIR /usr/src/app
