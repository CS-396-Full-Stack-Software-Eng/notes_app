"""
Notes Service - GraphQL Schema

Defines GraphQL types, queries, and mutations for notes.
"""
import strawberry
from strawberry import auto
from typing import List, Optional

from ..models import Note
from .. import service


@strawberry.django.type(Note)
class NoteType:
    id: auto
    content: auto
    color: auto
    date: auto


@strawberry.input
class NoteInput:
    content: str
    color: Optional[str] = "#FCA5A5"


@strawberry.type
class Query:
    @strawberry.field
    def notes(self) -> List[NoteType]:
        return service.get_all_notes()

    @strawberry.field
    def note(self, note_id: str) -> Optional[NoteType]:
        return service.get_note_by_id(note_id)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_note(self, input: NoteInput) -> NoteType:
        return service.create_note(
            content=input.content,
            color=input.color or "#FCA5A5"
        )

    @strawberry.mutation
    def update_note(self, note_id: str, input: NoteInput) -> Optional[NoteType]:
        return service.update_note(
            note_id=note_id,
            content=input.content,
            color=input.color
        )

    @strawberry.mutation
    def delete_note(self, note_id: str) -> bool:
        return service.delete_note(note_id)


schema = strawberry.Schema(query=Query, mutation=Mutation)
