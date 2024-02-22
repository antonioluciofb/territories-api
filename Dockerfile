FROM node:16.17.1 

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "dev" ]