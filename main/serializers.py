from rest_framework import serializers
from .models import Sightings


class SightingsSerializer(serializers.ModelSerializer):
    """_summary_
    Handles converting JSON to a Sightings object and vice versa
    """
    class Meta:
        model = Sightings
        fields = "__all__"
        