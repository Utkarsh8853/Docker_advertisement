FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=6000

EXPOSE 6000

CMD [ "npm", "start" ]