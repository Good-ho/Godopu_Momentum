const weather = document.querySelector(".js-weather");


const WEAHTER_API_KEY = "3284224d113c05984cb203fb2e55fb8f";
const COORDS = "coords";    

function getWeather(lat, lng){

    // 아래와 같이 then을 사용하여야 함 
    // 그 이유는 데이터가 완전히 전달 된 후 처리해야 하기 때문.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEAHTER_API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`;
    });
}

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
        const parseCoords = JSON.parse(loadCoord);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();