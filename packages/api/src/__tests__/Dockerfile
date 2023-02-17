FROM node:18.12.1

RUN mkdir -p /usr/src/
WORKDIR /usr/src/

COPY ["./packages", "./packages"]
COPY ["./package.json", "./yarn.lock", "./"]

RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --frozen-lockfile

ENV MONGO_URL_TEST=mongodb://192.168.60.20:27017/cinema_listing_test
ENV MONGO_DB_NAME=cinema_listings_test

ENTRYPOINT ["yarn", "unit-tests"]