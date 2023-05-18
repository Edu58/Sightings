from rest_framework import serializers
from .models import Sightings


class SightingsSerializer(serializers.ModelSerializer):
    """_summary_
    Handles converting JSON to a Sightings object and vice versa
    """
    sighting_datetime = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", read_only=True)
    class Meta:
        model = Sightings
        fields = "__all__"
