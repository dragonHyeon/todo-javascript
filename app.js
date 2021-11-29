const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();

    // 새로운 항목 감싸는 div 생성
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // 새로 추가된 항목 내용
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    // checked 버튼
    const checkedButton = document.createElement('button');
    checkedButton.classList.add('checked-btn');
    checkedButton.innerHTML = '<i class="fab fa-app-store-ios"></i>'
    // delete 버튼
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fab fa-apple-pay"></i>'

    // div 에 각 요소들 넣어주기
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(checkedButton);
    todoDiv.appendChild(deleteButton);

    // todo-list 에 위에서 만든 div 넣어주기
    todoList.appendChild(todoDiv)

    // todo 추가한 항목 local storage 에 저장해주기
    saveLocalTodos(todoInput.value);

    todoInput.value = ""
}



function deleteCheck(event) {
    // 클릭한 버튼
    const item = event.target
    // 클릭한 버튼의 항목. 즉 todo
    const todo = item.parentElement

    if (item.classList[0] === 'delete-btn') {
        todo.classList.toggle('fall')
        removeLocalTodos(todo.childNodes[0].innerText)
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    }

    if (item.classList[0] === 'checked-btn') {
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos)

    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex'
                }
                break;
        }
    })

}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(todo => {
        // 새로운 항목 감싸는 div 생성
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // 새로 추가된 항목 내용
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo
        // checked 버튼
        const checkedButton = document.createElement('button');
        checkedButton.classList.add('checked-btn');
        checkedButton.innerHTML = '<i class="fab fa-app-store-ios"></i>'
        // delete 버튼
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fab fa-apple-pay"></i>'

        // div 에 각 요소들 넣어주기
        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(checkedButton);
        todoDiv.appendChild(deleteButton);

        // todo-list 에 위에서 만든 div 넣어주기
        todoList.appendChild(todoDiv)

        todoInput.value = ""

    })

}

function removeLocalTodos(todo) {
    let todos

    // local storage 에 있는 항목 불러오기
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    // 항목 제거 후 local storage 갱신
    todos.splice(todos.indexOf(todo), 1)
    localStorage.setItem('todos', JSON.stringify(todos))

}