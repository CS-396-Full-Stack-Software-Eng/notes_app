"""
Notes Service Application Configuration.

This microservice handles all note-related operations:
- Create, Read, Update, Delete (CRUD) for notes
- Note persistence and retrieval
"""
from django.apps import AppConfig


class NotesServiceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'services.notes'
    verbose_name = 'Notes Microservice'

    def ready(self):
        """
        Called when the service is ready.
        Can be used for service initialization, signal registration, etc.
        """
        pass
