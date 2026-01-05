from django.db import models
from django.contrib.auth.models import User

class Character(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="character")

    def __str__(self):
        return self.name

