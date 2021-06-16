FROM node:alpine AS builder
RUN apk add --no-cache git gettext

WORKDIR /app

COPY . .

RUN npm install && npm run build --prod

FROM nginx:alpine
COPY --from=builder app/dist/* /usr/share/nginx/html

ENV QC_ATLAS_HOST_NAME localhost
ENV QC_ATLAS_PORT 6626
ENV PATTERN_ATLAS_HOST_NAME localhost
ENV PATTERN_ATLAS_PORT 1977
ENV NISQ_ANALYZER_HOST_NAME localhost
ENV NISQ_ANALYZER_PORT 5010
ENV QPROV localhost
ENV QPROV_PORT 5020
ENV PATTERN_ATLAS_UI_HOST_NAME localhost
ENV PATTERN_ATLAS_UI_PORT 1978
ENV LATEX_RENDERER_HOST_NAME localhost
ENV LATEX_RENDERER_PORT 5030
ENV CONFIG_SERVER config-server
ENV CONFIG_SERVER_PORT 2379

WORKDIR /app

ADD .docker/features.json /opt/init-config.d/features.json
ADD .docker/config-init.sh config-init.sh

RUN apk add --no-cache jq bash \
    && mkdir -p /opt/init-config.d \
    && wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/bin/wait-for-it \
    && chmod +x /usr/bin/wait-for-it \
    && chmod +x config-init.sh

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "/app/config-init.sh && envsubst < /usr/share/nginx/html/assets/env.js.template > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
