"""
Core URL Configuration - API Gateway

This acts as the central routing layer (API Gateway pattern) that
directs requests to the appropriate microservices.
"""
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response
from strawberry.django.views import GraphQLView
from services.notes.graphql.schema import schema


@api_view(['GET'])
def api_root(request):
    """
    API Gateway root endpoint.
    Returns service discovery information.
    """
    return Response({
        'message': 'Notes API Gateway',
        'version': '1.0.0',
        'services': {
            'notes_rest': '/api/notes',
            'notes_graphql': '/graphql',
        }
    })


urlpatterns = [
    # API Gateway root
    path('', api_root, name='api-root'),

    # REST API routes
    path('api/notes', include('services.notes.rest.urls')),

    # GraphQL API
    path('graphql', GraphQLView.as_view(schema=schema)),
]
