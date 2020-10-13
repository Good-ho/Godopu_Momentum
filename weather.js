
const COORDS = "coords";    

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coodsObj = {
        // latitude : latitude,
        // longitude : longitude
        // js 에서는 멤버변수 이름과 value 이름이 같다면 아래와 같이 표시 가능.
        latitude,
        longitude
    };

    saveCoords(coodsObj);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoord(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadCoord = localStorage.getItem(COORDS);
    if(loadCoord === null){
        askForCoord();
    } else {
        // getWeather
    }
}

function init(){
    loadCoords();
}

init();