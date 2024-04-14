FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 8000

CMD ["node","bin/www"]