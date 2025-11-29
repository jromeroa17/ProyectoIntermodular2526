from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField

class User(models.Model):
    id = ObjectIdAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=200)

    class Meta:
        db_table = "users"
        managed = False
