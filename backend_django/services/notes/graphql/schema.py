"""
Notes Service - GraphQL Schema

Defines GraphQL types, queries, and mutations for notes.
"""
import strawberry
from strawberry import auto
from typing import List, Optional

from ..models import Note
from .. import service