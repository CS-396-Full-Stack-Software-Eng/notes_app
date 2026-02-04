# Notes Application

A full-stack notes application built with Next.js (frontend) and multiple backend options (FastAPI, Django, Spring Boot), following Atomic Design methodology.

## Features

- Create, read, update, and delete notes
- Color-coded notes with customizable colors
- Master-detail view with inline editing
- Multiple backend options: REST API (FastAPI, Django) and GraphQL (Django, Spring Boot)
- Semantic HTML and accessible components

## Project Structure

```
w1_basic_notes/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory
│   ├── components/   # Atomic Design components
│   └── ...
├── backend/           # FastAPI backend (REST API)
│   ├── main.py
│   └── pyproject.toml
├── backend_django/    # Django backend (REST + GraphQL)
│   ├── core/
│   ├── services/
│   └── pyproject.toml
└── backend_spring/    # Spring Boot backend (GraphQL)
    ├── src/main/java/com/notes/app/
    └── pom.xml
```

## Running the Full Stack

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- Poetry (Python package manager)
- Java 17 or higher (for Spring Boot)
- Maven (for Spring Boot)

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

### Django Backend Setup

```bash
poetry install
poetry run python manage.py runserver
```

### Spring Boot Backend Setup (GraphQL)

1. Navigate to the Spring Boot backend directory:

```bash
cd backend_spring
```

2. Install dependencies and compile:

```bash
mvn clean install
```

3. Run the Spring Boot server:

```bash
mvn spring-boot:run
```

The GraphQL API will be available at:

- GraphQL endpoint: http://localhost:8000/graphql
- GraphiQL UI: http://localhost:8000/graphiql
- H2 Console: http://localhost:8000/h2-console

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

### REST API (FastAPI, Django)

- `GET /api/notes` - Get all notes
- `GET /api/notes/{id}` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

### GraphQL API (Django, Spring Boot)

Endpoint: `POST /graphql`

**Queries:**

```graphql
query {
  notes {
    id
    content
    color
    date
  }
  note(noteId: "123") {
    id
    content
    color
    date
  }
}
```

**Mutations:**

```graphql
mutation {
  createNote(input: { content: "Hello", color: "#FCA5A5" }) {
    id
  }
  updateNote(noteId: "123", input: { content: "Updated" }) {
    id
  }
  deleteNote(noteId: "123")
}
```

## Technology Stack

**Frontend:**

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Atomic Design methodology

**Backend (FastAPI):**

- FastAPI
- Pydantic
- Uvicorn
- Python 3.10+

**Backend (Django):**

- Django 4.2+
- Django REST Framework
- Strawberry GraphQL
- Python 3.10+

**Backend (Spring Boot):**

- Spring Boot 3.2
- Spring for GraphQL
- Spring Data JPA
- H2 Database
- Java 17+

## UI Design Citation

From https://dribbble.com/shots/14037848-Docket-note-Side-menu
