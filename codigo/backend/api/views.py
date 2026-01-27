from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, CharacterSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Character

class CharacterList(generics.ListAPIView):
    serializer_class = CharacterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Character.objects.filter(creator=self.request.user)
    
class CharacterListAll(generics.ListAPIView):
    serializer_class = CharacterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Character.objects.all()

class CharacterCreate(generics.CreateAPIView):
    serializer_class = CharacterSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class CharacterUpdate(generics.UpdateAPIView):
    serializer_class = CharacterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Character.objects.filter(creator=self.request.user)

class CharacterDelete(generics.DestroyAPIView):
    serializer_class = CharacterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Character.objects.filter(creator=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
