FROM node:14.9.0-alpine

RUN apk add --no-cache git gettext

ENV ALTAS_URL localhost
ENV ATLAS_PORT 8080
ENV PATTERNPEDIA_URL localhost
ENV PATTERNPEDIA_PORT 8081
ENV NISQ_ANALYZER_URL localhost
ENV NISQ_ANALYZER_PORT 8082
ENV PATTERN_ATLAS_UI_URL localhost
ENV PATTERN_ATLAS_UI_PORT 4201

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
RUN chmod +x docker-entrypoint.sh

EXPOSE 4200

CMD ["sh", "docker-entrypoint.sh"]