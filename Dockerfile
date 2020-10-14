FROM node:14 as dev

# RUN apt-get install -y git

WORKDIR /workspace

COPY *.json ./

RUN npm i