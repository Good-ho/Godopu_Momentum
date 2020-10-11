const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDo";

function loadTodo(){
    const toDo = localStorage.getItem(TODOS_LS);
    if(toDo === null) {

    } else {

    }
}

function paintTodo(text){
    // create list
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "x";
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
}

function handleSummit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}

function init(){
    loadTodo();
    toDoForm.addEventListener("submit", handleSummit);
}

init();