FROM node:18

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

COPY ./src ./src
COPY ./data ./data

CMD [ "node", "src/app.js" ]
