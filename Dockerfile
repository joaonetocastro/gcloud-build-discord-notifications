FROM node:lts-alpine
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn
COPY src/* tsconfig.json ./
RUN yarn build