
# build stage
FROM node:14.17 as builder

WORKDIR  /app
COPY package.json yarn.lock ./

RUN yarn install
# RUN yarn install --production
COPY . .
RUN yarn build

# runtime stage
FROM node:14-alpine as runtime
# FROM gcr.io/distroless/nodejs:14
WORKDIR  /app
COPY --from=builder /app ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["yarn","start:prod"]


