#!/bin/sh

# TODO do something like this: https://github.com/docker-library/redis/blob/master/4.0/docker-entrypoint.sh

NEWUID=1000
#NEWGID=100

usermod -u ${NEWUID} nginx
#groupmod -g ${NEWGID} www-data
find / -user 100 -exec chown -h ${NEWUID} {} \;
#find / -group 33 -exec chgrp -h ${NEWGID} {} \;
#usermod -g ${NEWGID} www-data

exec "$@"
