FROM node:alpine AS builder
RUN apk add --no-cache git gettext

ENV QC_ATLAS_HOST_NAME localhost
ENV QC_ATLAS_PORT 8080
ENV PATTERN_ATLAS_HOST_NAME localhost
ENV PATTERN_ATLAS_PORT 8081
ENV NISQ_ANALYZER_HOST_NAME localhost
ENV NISQ_ANALYZER_PORT 8082
ENV PATTERN_ATLAS_UI_HOST_NAME localhost
ENV PATTERN_ATLAS_UI_PORT 4201
ENV LATEX_RENDERER_HOST_NAME localhost
ENV LATEX_RENDERER_PORT 8083

WORKDIR /app

COPY . .

RUN npm install && npm run build --prod

FROM nginx:alpine
COPY --from=builder app/dist/* /usr/share/nginx/html

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.js.template > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
