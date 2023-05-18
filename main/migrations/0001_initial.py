# Generated by Django 4.2.1 on 2023-05-18 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sightings',
            fields=[
                ('sighting_id', models.AutoField(primary_key=True, serialize=False)),
                ('sighting_datetime', models.DateTimeField(auto_now_add=True)),
                ('species', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'wildlife_sightings',
                'ordering': ['-sighting_datetime'],
            },
        ),
    ]
