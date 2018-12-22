from django.shortcuts import render,redirect
# 
from .models import Todo
import json

# Create your views here.
def index(request):
	todos = Todo.objects.all().order_by("-id")
	context = {
		'todos' : todos
	}
	return render(request,'todo/index.html', context)

def add_todo(request):

	if request.method == "POST":
		todo_t = request.POST['todo_text']
		todo = Todo(todo_text=todo_t)
		todo.save()
	#return redirect('add-todo')
	return redirect('todo-index');

def delete(self, todo_id):
	response_data = {}
	todo_to_delete = Todo.objects.get(pk=todo_id)
	todo_to_delete.delete()

	return redirect('todo-index')


def completed(self, todo_id):
	response_data = {}
	todo_completed = Todo.objects.get(pk=todo_id)
	todo_completed.todo_is_done = True
	todo_completed.save()

	return redirect('todo-index')