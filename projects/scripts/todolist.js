const todoList = [];

renderTodoList();

function renderTodoList() {
  const altaPrioridad = document.querySelector(".alta-prioridad");
  const mediaPrioridad = document.querySelector(".media-prioridad");
  const bajaPrioridad = document.querySelector(".baja-prioridad");

  altaPrioridad.innerHTML = "";
  mediaPrioridad.innerHTML = "";
  bajaPrioridad.innerHTML = "";

  todoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  todoList.forEach((todoObject) => {
    const { name, dueDate, priority } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;

    const todoElement = document.createElement("div");
    todoElement.innerHTML = html;

    if (priority === "alta") {
      altaPrioridad.appendChild(todoElement);
    } else if (priority === "media") {
      mediaPrioridad.appendChild(todoElement);
    } else {
      bajaPrioridad.appendChild(todoElement);
    }
  });

  document.querySelectorAll(".js-delete-todo-button").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
}

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  const prioritySelectElement = document.querySelector(".js-priority-select");
  const priority = prioritySelectElement.value;

  todoList.push({
    name, dueDate,
    priority,
  });

  inputElement.value = "";
  dateInputElement.value = "";

  renderTodoList();
}