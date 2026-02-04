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
    def test_mutation(self) -> str:
        return "Mutation works!"
    
    @strawberry.mutation
    def create_note(self, content: str, color: str) -> NoteType:
        return service.create_note(content, color)

schema = strawberry.Schema(query=Query, mutation=Mutation)
