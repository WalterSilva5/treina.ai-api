FROM node:16

WORKDIR /app
COPY . .

RUN apt update && apt install sed -y

RUN yarn install

RUN npx ag /app/src/modules/gateway/doc/asyncapi.yaml @asyncapi/html-template -o /app/src/modules/gateway/doc/output --force-write

RUN yarn build

# RUN yarn prisma:migrate:deploy

EXPOSE 5000

CMD yarn start
