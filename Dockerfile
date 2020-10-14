FROM node:14-alpine as dev

RUN apk add git

WORKDIR /workspace

COPY *.json ./

RUN npm i