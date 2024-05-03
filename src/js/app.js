const todos = [];
// selecting:
const todoTitleInput = document.querySelector("#todo-title");
const todoDescriptionInput = document.querySelector("#todo-description");
const todoForm = document.querySelector(".todo-form");
const completedTodosContainer = document.querySelector(".todo-list-completed");
const uncompletedTodosContainer = document.querySelector(".todo-list-uncompleted");
todoForm.addEventListener("submit" , addNewTodo);

     function addNewTodo(e) {
     e.preventDefault();
     if(!todoTitleInput.value , !todoDescriptionInput.value) return null;
     const todo = {
          id: Date.now(),
          title: todoTitleInput.value,
          description: todoDescriptionInput.value,
          isComplete: false,
     };
     todos.push(todo);
     createTodos(todos);
     todoTitleInput.value = "";
     todoDescriptionInput.value = "";
     }
     
     function createTodos(todos) {
const newTodos = todos.filter(todo => todo.isComplete === true)
const newTodosUnCompleted = todos.filter(todo => todo.isComplete === false)
showCompletedTodos(newTodos);
showUnCompletedTodos(newTodosUnCompleted);

     todoTitleInput.value = "";

     const removebtn = [...document.querySelectorAll(".delete-btn")];
     removebtn.forEach((btn) => btn.addEventListener("click" , removeTodo));

     const checkbtn = [...document.querySelectorAll("#todo-radio-item")];
     checkbtn.forEach((btn) => btn.addEventListener("click" , checkTodo));
     }

     function removeTodo(e) {
      const todoId = Number(e.target.dataset.todoId);
      const filteredTodo = todos.filter((t) => t.id !== todoId);
      createTodos(filteredTodo);
    }
    function checkTodo(e) {
      const todoId = Number(e.target.dataset.todoId);
      const todo = todos.find((t) => t.id == todoId);
      todo.isComplete = !todo.isComplete;
      createTodos(todos);
    }

const showCompletedTodos = (todos) => {
  return completedTodosContainer.innerHTML = todos.map(todo => (
    `
    <li class="todo flex justify-center items-center p-2 border border-slate-400 rounded-md mb-2 transition-all"
    id="todo-item">
    <div class="flex items-center">
      <input data-todo-id=${todo.id} id="todo-radio-item" aria-describedby="helper-checkbox-text"
        type="checkbox" value="" checked
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-white dark:border-gray-300">
    </div>
    <div class="ms-4 flex flex-1 flex-col">
      <label class="text-base font-bold text-slate-600 line-through" id="todo-text">${todo.title}</label>
      <span class="text-sm text-slate-500 line-through	" id="todo-description-user">${todo.description}</span>
    </div>
    <div class="flex flex-row gap-x-4">
      <button data-todo-id=${todo.id} class="delete-btn text-red-600 hover:text-red-800"> Delete </button>
    </div>
  </li>
    `
  ))
}

const showUnCompletedTodos = (todos) => {
  return uncompletedTodosContainer.innerHTML = todos.map(todo => (
    `
    <li class="todo flex justify-center items-center hover:bg-gray-200 p-2 rounded-md mb-2 transition-all"
    id="todo-item">
    <div class="flex items-center">
      <input data-todo-id=${todo.id} id="todo-radio-item" aria-describedby="helper-checkbox-text"
        type="checkbox" value=""
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-white dark:border-gray-300">
    </div>
    <div class="ms-4 flex flex-1 flex-col">
      <label class="todo-title text-base font-bold text-slate-600" id="todo-text">${todo.title}</label>
      <span class="todo-description text-sm text-slate-500"
        id="todo-description-user">${todo.description}</span>
    </div>
    <div class="flex flex-row gap-x-4">
      <button data-todo-id=${todo.id} class="delete-btn text-red-600 hover:text-red-800"> Delete </button>
    </div>
  </li>`
  ))
}