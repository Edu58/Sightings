from django.db import models

# Create your models here.
class Sightings(models.Model):
    sighting_id = models.AutoField(primary_key=True)
    sighting_datetime = models.DateTimeField(auto_now_add=True)
    species = models.CharField(max_length=255, null=True, blank=False)

    class Meta:
        db_table = "wildlife_sightings"
        ordering = ["-sighting_datetime"]

    def __str__(self) -> str:
        return self.sighting_id