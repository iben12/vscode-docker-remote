FROM node:14-alpine

RUN apk add git

WORKDIR /workspace

COPY *.json ./

RUN npm i