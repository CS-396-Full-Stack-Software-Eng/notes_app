"""
Notes Service - REST Serializers

Handles data serialization/deserialization for the REST API.
"""
from rest_framework import serializers
from ..models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'content', 'color', 'date']
        read_only_fields = ['id', 'date']


class NoteCreateSerializer(serializers.Serializer):
    content = serializers.CharField(required=True, allow_blank=False)
    color = serializers.CharField(required=False, default='#FCA5A5', max_length=7)

    def validate_color(self, value):
        if not value.startswith('#') or len(value) != 7:
            raise serializers.ValidationError("Color must be a valid hex color (e.g., #FCA5A5)")
        return value


class NoteUpdateSerializer(serializers.Serializer):
    content = serializers.CharField(required=True, allow_blank=False)
    color = serializers.CharField(required=False, default='#FCA5A5', max_length=7)

    def validate_color(self, value):
        if not value.startswith('#') or len(value) != 7:
            raise serializers.ValidationError("Color must be a valid hex color (e.g., #FCA5A5)")
        return value
