const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDo";

let toDos = [];

function loadTodo(){
    const loadTodo = localStorage.getItem(TODOS_LS);
    if(loadTodo === null) {

    } else {
        // 아래 log 출력 결과를 보면 loadTodo는 string으로 출력되고
        // parse는 object로 출력되는 것을 확인 할 수 있다.
        // console.log(loadTodo);
        const parse = JSON.parse(loadTodo);
        // console.log(parse);
        parse.forEach(function(ele){
            paintTodo(ele.text);
        })
    }
}

function saveToDos(){
    //localStorage에는 js data를 저장할 수 없다.
    // 따라서 아래와 같이 작성하고 출력해보면 localStorage에 object, object로 저장됨.
    // LocalStorage에는 only string만 저장가능.
    // localStorage.setItem(TODOS_LS, toDos);
    // 따라서 아래와 같이 json으로 저장해야함.
    // json.stringify 는 js data를 string으로 저장함.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanTodo = toDos.filter(function(todo){        
        return todo.id !== parseInt(li.id);
    });

    toDos = cleanTodo;
    saveToDos();

}

function paintTodo(text){
    // create list
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "x";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(delBtn); 
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
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