FROM node:20-bookworm-slim

LABEL maintainer="Gaurav Singh <gauravsinghgzp83@gmail.com>"

WORKDIR /app

COPY . .

RUN npm ci --location=project

RUN npm run build

CMD ["npm", "start", "bootstrap"]
