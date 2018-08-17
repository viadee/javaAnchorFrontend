FROM nginx:1.15-alpine

RUN mkdir -p /var/www/bachelor/web/ \
    && apk update && apk add shadow sudo
WORKDIR /var/www/bachelor
COPY docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
