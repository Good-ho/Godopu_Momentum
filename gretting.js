const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const gretting = document.querySelector(".js-gretting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSummit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGretting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSummit);
}

function paintGretting(text) {
    form.classList.remove(SHOWING_CN);
    gretting.classList.add(SHOWING_CN);
    gretting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);    
    if(currentUser == null){
        // user emtpy
        askForName();
    } else {
        // use exist
        paintGretting(currentUser);
    }
}

function init(){
    loadName();
}

init();