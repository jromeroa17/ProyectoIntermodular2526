from django.urls import path
from . import views

urlpatterns = [
    path("character/", views.CharacterList.as_view(), name="character-list"),
    path("character/delete/<int:pk>/", views.CharacterDelete.as_view(), name="delete-character"),
    path("character/create/", views.CharacterCreate.as_view(), name="create-character"),
    path("character/update/<int:pk>/", views.CharacterUpdate.as_view(), name="update-character"),
    path("character/list-all/", views.CharacterListAll.as_view(), name="character-list-all")
]