FROM node:16.19-alpine

WORKDIR /frontend

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]