FROM node:10 as node

WORKDIR /front

ADD package.json package.json

RUN npm install --production --quite

COPY . .

VOLUME /front/build

CMD npm run build
