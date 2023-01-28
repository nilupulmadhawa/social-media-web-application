FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm build

CMD ["node", "dist/app.js"]

EXPOSE 3001