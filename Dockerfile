FROM node:stretch-slim

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .
COPY wait-for-it.sh .
EXPOSE 3000
CMD ["npm","run", "start"]