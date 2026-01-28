"""
Notes Service - Business Logic Layer

Shared service functions used by both REST and GraphQL APIs.
"""
from typing import List, Optional
from .models import Note


def get_all_notes() -> List[Note]:
    return list(Note.objects.all())


def get_note_by_id(note_id: str) -> Optional[Note]:
    try:
        return Note.objects.get(id=note_id)
    except Note.DoesNotExist:
        return None


def create_note(content: str, color: str = "#FCA5A5") -> Note:
    return Note.objects.create(content=content, color=color)


def update_note(note_id: str, content: str, color: Optional[str] = None) -> Optional[Note]:
    note = get_note_by_id(note_id)
    if not note:
        return None
    note.content = content
    if color:
        note.color = color
    note.save()
    return note


def delete_note(note_id: str) -> bool:
    note = get_note_by_id(note_id)
    if not note:
        return False
    note.delete()
    return True
