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
     if(!todoTitleInput.value || !todoDescriptionInput.value) return null;
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

     const editbtn = [...document.querySelectorAll(".edit-btn")];
     editbtn.forEach((btn) => btn.addEventListener("click" , editTodo));

     const checkbtn = [...document.querySelectorAll("#todo-radio-item")];
     checkbtn.forEach((btn) => btn.addEventListener("click" , checkTodo));
     }

     function removeTodo(e) {
      const todoId = Number(e.target.dataset.todoId);
      const filteredTodo = todos.filter((t) => t.id !== todoId);
      createTodos(filteredTodo);
    }

    function editTodo() {
      const editSection = document.querySelector(".edit-section");
      const submitEditBtn = document.querySelector(".submit-edit-btn");
      editSection.style.display = "block";
      submitEditBtn.addEventListener("click" , submitEditTodo);

    }
    function submitEditTodo(e) {
      const newTitleInputEdit = document.querySelector(".newTitleInput");
      const todoId = Number(e.target.dataset.todoId);
      const todo = todos.find((t) => t.id == todoId);
      todo.title = newTitleInputEdit.value;
      createTodos(todos);
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
        type="checkbox"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-white dark:border-gray-300">
    </div>
    <div class="ms-4 flex flex-1 flex-col">

    <div style="display: none;" class="edit-section relative m-2">
    <input type="text" value=${todo.title} data-todo-id=${todo.id}
      class="newTitleInput small-input w-full block p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Type Your Title..." />
    <button type="submit" data-todo-id=${todo.id}
      class="submit-edit-btn text-white items-start justify-start absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Submit</button>
  </div>

      <label class="todo-title text-base font-bold text-slate-600" id="todo-text">${todo.title}</label>
      <span class="todo-description text-sm text-slate-500"
        id="todo-description-user">${todo.description}</span>
    </div>
    <div class="flex flex-row gap-x-4">
    <button data-todo-id=${todo.id} class="edit-btn text-slate-600 hover:text-slate-800"> Edit </button>
      <button data-todo-id=${todo.id} class="delete-btn text-red-600 hover:text-red-800"> Delete </button>

    </div>
  </li> `
  ))
}