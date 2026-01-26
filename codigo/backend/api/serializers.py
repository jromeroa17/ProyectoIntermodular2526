from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Character

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class CharacterSerializer(serializers.ModelSerializer):
    creator_username = serializers.CharField(
        source="creator.username",
        read_only=True
    )

    class Meta:
        model = Character
        fields = ["id", "name", "created_at", "creator", "creator_username"]
        extra_kwargs = {"creator": {"read_only": True}}
