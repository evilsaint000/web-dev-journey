const todoform = document.querySelector('.todo-form');
const todoinput = document.querySelector('.todo-input');
const todoListUL = document.querySelector('.todo-list');

let allTodos = [];
todoform.addEventListener(SubmitEvent, function (e){
    e.preventDefault();
    addTodo();
})

function addTodo() {
    const todoText = todoinput.value.trim();
    if(todoText.length >0){
        allTodos.push(todoText);
        createTodoItem(todoText);
        todoinput.value = '';


    }
}

function updateTodoList(){
    todoListUL.innerHTML = '';
    allTodos.forEach(todo,todoIndex) =>{
        todoItem = createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem);
    }
}

function createTodoItem(todo, todoIndex){
    const todoId = 'todo-'+todoIndex;
    const todoLI = document.createElement('li');
    todoLI.className = 'todo';
    todoLI.innerHTML= '
        <input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                    <svg fill="var(--secondary-color)"      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

                </label>
                <label for="${todoId}" class="todo-text"> 
                    ${todo}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    '
    
    return todoLI;
}
