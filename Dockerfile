FROM node:14.9.0-alpine

# adds envsubst
RUN apk add gettext

ENV ALTAS_URL localhost
ENV ATLAS_PORT 8080
ENV PATTERNPEDIA_URL localhost
ENV PATTERNPEDIA_PORT 8081
ENV NISQ_ANALYZER_URL localhost
ENV NISQ_ANALYZER_PORT 8082

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

# setup variables - uses environments/environments.ts.template file to copy correct ARG variables
RUN envsubst < src/environments/environment.ts.template > src/environments/environment.ts && npx ng build
RUN cat src/environments/environment.ts

# Deploy Angular App
FROM nginx:1.19.2-alpine
COPY --from=0 /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/dist/qc-atlas-ui /usr/share/nginx/html