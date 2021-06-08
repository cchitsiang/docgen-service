FROM node:14-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package* ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production


FROM node:14-alpine as release

WORKDIR /app

# Install LibreOffice
RUN \
    apk update && \
    apk add --no-cache --virtual=build-deps && \
    apk add --no-cache libreoffice libreoffice-base openjdk8-jre-base && \
    apk add --no-cache ttf-dejavu && \
    apk del --purge build-deps && \
    rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:prod"]
