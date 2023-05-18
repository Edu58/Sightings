from django.urls import path
from .views import *

urlpatterns =[
    path("sightings", SightingsView.as_view(), name="sightings"),
    path("sightings/<species>", SightingsSearchView.as_view(), name="sightings")
]