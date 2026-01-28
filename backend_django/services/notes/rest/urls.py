"""
Notes Service - REST URL Configuration
"""
from django.urls import path
from . import views

app_name = 'notes_rest'

urlpatterns = [
    path('', views.notes_list, name='notes-list'),
    path('/<str:note_id>', views.note_detail, name='note-detail'),
]
