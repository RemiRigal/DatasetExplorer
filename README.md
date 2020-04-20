# Dataset Explorer

A web tool for local dataset browsing and processing developped using the Flask + Angular stack.


## Getting Started

### Using Docker

A docker compose file is provided, you can start the tool with:
```shell script
docker-compose up -d
```

However, yYou must mount your dataset directory in the `/data` directory of the backend container. You can do so by updating the following line of the `docker-compose.yml` file:
```yaml
volumes:
  - ./data:/data # Replace '.data/' by the root path to your dataset
```
 

### From source

#### Backend (Flask)

The backend requires `Python 3.7`.
```shell script
cd backend
pip install -r requirements.txt
export DATASET_EXPLORER_ROOT=/path/to/dataset/root
python app.py
```

#### Frontend (Angular)

The frontend requires `Angular CLI v9.1.0` and `NodeJS v12.16.1`, make sure that they are installed first.
```shell script
cd frontend
npm install
ng serve
```

### Test tool

The app is available at http://127.0.0.1:4200.
