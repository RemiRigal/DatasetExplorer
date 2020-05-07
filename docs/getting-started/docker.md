# Using Docker and Docker-Compose

A docker compose file is provided, you can start the tool with:
```bash
docker-compose up -d
```

However, you must mount your dataset directory in the `/data` directory of the backend container. You can do so by updating the following line of the `docker-compose.yml` file:
```yaml
volumes:
  - ./data:/data # Replace '.data/' by the root path to your dataset
```

!!! note
    When using docker, custom tools must be mounted under `/plugins`.  
    Extra Python dependencies may be specified with a `requirements.txt` file mounted at `/plugins/requirements.txt`.
    Those dependencies will be installed at runtime before starting the Flask server.
