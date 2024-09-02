FROM node:lts-alpine

RUN npm install -g http-server && http-server -v
RUN npm list -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run test:e2e

RUN npm run build && ls -la /app/dist

EXPOSE 8080

CMD [ "http-server", "dist","-a", "0.0.0.0"]
