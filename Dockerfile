FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY server.cjs ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "node", "server.cjs" ]
