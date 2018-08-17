#!/bin/sh

# TODO do something like this: https://github.com/docker-library/redis/blob/master/4.0/docker-entrypoint.sh

NEWUID=1000
#NEWGID=100

#usermod -u ${NEWUID} www-data
#groupmod -g ${NEWGID} www-data
# find / -user 0 -exec chown -h ${NEWUID} {} \;
chown -R 1000 /var/www/bachelor
#find / -group 33 -exec chgrp -h ${NEWGID} {} \;
#usermod -g ${NEWGID} www-data

exec "$@"
