# Notes Application

A full-stack notes application built with Next.js (frontend) and FastAPI (backend), following Atomic Design methodology.

## Features

- Create, read, update, and delete notes
- Color-coded notes with customizable colors
- Master-detail view with inline editing
- RESTful API backend
- Semantic HTML and accessible components

## Project Structure

```
w1_basic_notes/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory
│   ├── components/   # Atomic Design components
│   └── ...
└── backend/          # FastAPI backend application
    ├── main.py       # FastAPI server
    ├── pyproject.toml # Poetry dependencies
    └── ...
```

## Running the Full Stack

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- Poetry (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Poetry (if not already installed):
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

3. Install dependencies:
```bash
poetry install
```

4. Run the FastAPI server:
```bash
poetry run uvicorn main:app --reload
```

The API will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

### Running Both

To run the full stack, you need to run both servers simultaneously in separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
poetry run uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Then open http://localhost:3000 in your browser.

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/{id}` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

## Technology Stack

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Atomic Design methodology

**Backend:**
- FastAPI
- Pydantic
- Uvicorn
- Python 3.10+

## UI Design Citation

From https://dribbble.com/shots/14037848-Docket-note-Side-menu
