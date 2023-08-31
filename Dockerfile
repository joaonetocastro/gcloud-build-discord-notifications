FROM node:18.17.1-alpine
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn
COPY tsconfig.json ./
COPY src/* ./src/
CMD ["yarn", "serve"]