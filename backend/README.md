# Notes API Backend

FastAPI backend for the Notes application.

## Setup

1. Install Poetry (if not already installed):
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. Install dependencies:
```bash
poetry install
```

3. Create `.env` file (optional):
```bash
cp .env.example .env
```

## Running the Server

```bash
# Development mode with auto-reload
poetry run uvicorn main:app --reload

# Or run directly
poetry run python main.py
```

The API will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/{id}` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

## Project Structure

```
backend/
├── main.py          # FastAPI application
├── pyproject.toml   # Poetry dependencies and configuration
├── .env.example     # Environment variables template
└── README.md        # This file
```
