"""
Notes Service - REST API Views

Implements the REST API endpoints for the notes microservice.
"""
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import NoteSerializer, NoteCreateSerializer, NoteUpdateSerializer
from .. import service


@api_view(['GET', 'POST'])
def notes_list(request):
    if request.method == 'GET':
        notes = service.get_all_notes()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NoteCreateSerializer(data=request.data)
        if serializer.is_valid():
            note = service.create_note(
                content=serializer.validated_data['content'],
                color=serializer.validated_data.get('color', '#FCA5A5')
            )
            return Response(NoteSerializer(note).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def note_detail(request, note_id):
    if request.method == 'GET':
        note = service.get_note_by_id(note_id)
        if not note:
            return Response({'detail': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(NoteSerializer(note).data)

    elif request.method == 'PUT':
        serializer = NoteUpdateSerializer(data=request.data)
        if serializer.is_valid():
            note = service.update_note(
                note_id=note_id,
                content=serializer.validated_data['content'],
                color=serializer.validated_data.get('color')
            )
            if not note:
                return Response({'detail': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
            return Response(NoteSerializer(note).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if not service.delete_note(note_id):
            return Response({'detail': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
