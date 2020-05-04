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
