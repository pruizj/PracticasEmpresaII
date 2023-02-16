FROM node:18.11.0 as node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn install

WORKDIR /usr/src/app/packages/api
RUN yarn install

EXPOSE 4000

RUN chmod +x /usr/src/app/packages/api/docker-entrypoint.sh
ENTRYPOINT ["/usr/src/app/packages/api/docker-entrypoint.sh"]