FROM mongo:8.0.0

COPY /auth/db-auth-keyfile.txt /data

RUN chmod 400 /data/db-auth-keyfile.txt

RUN chown 999:999 /data/db-auth-keyfile.txt