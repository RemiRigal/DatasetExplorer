# Building from source

## Backend (Flask)

The backend requires `Python 3.7`.
```bash
cd backend
pip install -r requirements.txt
export DATASET_EXPLORER_ROOT=/path/to/dataset/root
python app.py
```

## Frontend (Angular)

The frontend requires `Angular CLI v9.1.0` and `NodeJS v12.16.1`, make sure that they are installed first.
```bash
cd frontend
npm install
ng serve --host 0.0.0.0
```
