from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name="todo-index"),
    path('add/', views.add_todo, name="add-todo"),
    path('delete/<todo_id>', views.delete, name="delete"),
    path('completed/<todo_id>', views.completed, name="completed")
]
