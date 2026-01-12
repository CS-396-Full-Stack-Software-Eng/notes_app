from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="Notes API", version="1.0.0")

# CORS middleware to allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Note(BaseModel):
    id: str
    content: str
    color: Optional[str] = "#FCA5A5"
    date: Optional[str] = None

class NoteCreate(BaseModel):
    content: str
    color: Optional[str] = "#FCA5A5"

# In-memory storage (replace with database later)
notes_db: List[Note] = []

@app.get("/")
def read_root():
    """Root endpoint"""
    return {"message": "Notes API is running", "version": "1.0.0"}

@app.get("/api/notes", response_model=List[Note])
def get_notes():
    """Retrieve all notes"""
    return notes_db

@app.get("/api/notes/{note_id}", response_model=Note)
def get_note(note_id: str):
    """Retrieve a specific note by ID"""
    for note in notes_db:
        if note.id == note_id:
            return note
    raise HTTPException(status_code=404, detail="Note not found")

@app.post("/api/notes", response_model=Note, status_code=201)
def create_note(note: NoteCreate):
    """Create a new note"""
    new_note = Note(
        id=str(datetime.now().timestamp()),
        content=note.content,
        color=note.color,
        date=datetime.now().strftime("%b %d, %Y")
    )
    notes_db.insert(0, new_note)
    return new_note

@app.put("/api/notes/{note_id}", response_model=Note)
def update_note(note_id: str, note: NoteCreate):
    """Update an existing note"""
    for idx, existing_note in enumerate(notes_db):
        if existing_note.id == note_id:
            updated_note = Note(
                id=note_id,
                content=note.content,
                color=note.color,
                date=existing_note.date
            )
            notes_db[idx] = updated_note
            return updated_note
    raise HTTPException(status_code=404, detail="Note not found")

@app.delete("/api/notes/{note_id}", status_code=204)
def delete_note(note_id: str):
    """Delete a note"""
    for idx, note in enumerate(notes_db):
        if note.id == note_id:
            notes_db.pop(idx)
            return
    raise HTTPException(status_code=404, detail="Note not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
