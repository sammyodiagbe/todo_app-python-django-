$(document).ready(() => {
	$("#add_to_todo").on("submit", (e) => {

		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/add/",
			data: {
				todo_text : $("#todo_text").val(),
				csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
			},
			success: (e) => {
				$("#todo_text").val("");
				$.ajax({
					type: "GET",
					url: "/todos/",
					success: (data) => {
						data_text = data.data;
						elem = document.createElement("li");
						$(elem).attr("data-id", `li${data.id}`)
						anchor = document.createElement('a');
						$(anchor).text(data_text);
						spanElement = document.createElement("span");
						spanElement.classList.add("actions");
						i1 = document.createElement("a");
						i2 = document.createElement("a");
						i1.href = `javascript:deleteTodo(${data.id})`;
						i2.href = `javascript:completed(${data.id})`;
						i1.classList.add("todo-action");
						i2.classList.add("todo-action");
						$(i1).text('delete');
						$(i2).text('done');
						$(spanElement).append(i1);
						$(spanElement).append(i2);
						$(elem).append(anchor);
						$(elem).append(spanElement);
						$(".todo-list").prepend(elem);
						
					}
				})
			}
		})
	});

	deleteTodo = (todo) => {
		//make an ajax call to the url


		console.log($("data-id=li"))
		return 0
		const element = this;
		const url = `/delete/${todo}`;
		const li = `#li${todo}`;
		console.log(element);
		$.ajax({
			type : "POST",
			url: url,
			data: { csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()},
			success : (data) => {
				$(li).slideUp(500);
			}
		});
	}

	completed = (todo) => {
		const url = `/completed/${todo}`;
		const li = `#li${todo}`;
		$.ajax({
			type : "POST",
			url: url,
			data: { csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()},
			success : (data) => {
				$(li).addClass('done');
			}
		})
	}
});