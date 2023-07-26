FROM debian:buster

RUN apt-get update && \
    apt-get install -y postgresql postgresql-contrib

RUN mkdir -p /var/lib/postgresql/data && \
    chown 777 /var/lib/postgresql/data

EXPOSE 5432

# Copy the PostgreSQL entrypoint script (optional but recommended)
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use the PostgreSQL entrypoint script to start the server
ENTRYPOINT ["/entrypoint.sh"]

# Start PostgreSQL in the background when the container starts
CMD ["postgres", "-D", "/var/lib/postgresql/data", "-c", "config_file=/etc/postgresql/postgresql.conf"]