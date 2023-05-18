from django.shortcuts import render
from .models import Sightings
from .serializers import SightingsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


# Create your views here.
class SightingsView(APIView):
    """_summary_
    Handles creating of new sightings, getting all sightings and searching for sightings based on a species query param
    Args:
        APIView (string | optional): species
    """

    @swagger_auto_schema(
        operation_description="Returns a list of sightings when called without query params or a list of filtered data depending on query param provided"
    )
    def get(self, request, format=None, *args, **kwargs):
        search_query = request.GET.get("species", None)
        if search_query:
            sightings = Sightings.objects.filter(species__icontains=search_query)
            serializer = SightingsSerializer(sightings, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            sightings = Sightings.objects.all()
            serializer = SightingsSerializer(sightings, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
    @swagger_auto_schema(
        request_body=SightingsSerializer,
        operation_description="Creates new Sighting"
    )
    def post(self, request, format=None, *args, **kwargs):
        sighting_serializer = SightingsSerializer(data=request.data)

        if sighting_serializer.is_valid():
            sighting_serializer.save()
            return Response(data=sighting_serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=sighting_serializer.errors, status=status.HTTP_400_BAD_REQUEST)