"""
Notes Service - Data Models

Defines the Note entity for the notes microservice.
"""
from django.db import models
from datetime import datetime


class Note(models.Model):
    """
    Note model representing a user's note.
    """
    # Using CharField for ID to maintain compatibility with frontend
    # that expects string-based timestamp IDs
    id = models.CharField(max_length=50, primary_key=True)
    content = models.TextField()
    color = models.CharField(max_length=7, default='#FCA5A5')
    date = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'

    def __str__(self):
        return f"Note {self.id}: {self.content[:50]}..."

    def save(self, *args, **kwargs):
        """Override save to auto-generate ID and date if not provided."""
        if not self.id:
            self.id = str(datetime.now().timestamp())
        if not self.date:
            self.date = datetime.now().strftime("%b %d, %Y")
        super().save(*args, **kwargs)
