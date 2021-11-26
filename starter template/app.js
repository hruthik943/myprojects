
// api key : 82005d27a116c2880c8f0fcb866998a0

//select elements

const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")
const notoficationElement = document.querySelector(".notification")

//app data

const weather ={};

weather.temperature={
    unit: "celcius"
}
//app constants
const KELVIN=273;
//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

//geolocation
navigator.geolocation.getCurrentPosition(position=>{
    let lat=position.coords.latitude;
    let long=position.coords.longitude;
    getWeather(lat,long);
})

function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(response=>{
            let data=response.json();
            return data;
        })
        .then(data=>{
            //console.log(data);
            weather.temperature.value=Math.floor(data.main.temp-KELVIN);
            weather.description=data.weather[0].description;
            weather.iconId=data.weather[0].icon;
            weather.city=data.name;
            weather.country=data.sys.country;
        })
        .then(function(){
            displayWeather();
        })
}
//display weather

function displayWeather(){
    console.log(weather);
    iconElement.innerHTML=`<img src="icons/${weather.iconId}.png">`
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML=weather.description;
    locationElement.innerHTML=`${weather.city},${weather.country}`;
}
function celsiusToFahrenheit(temperature){
    return (temperature *9/5)+32;
}
//when user clicks on temperature ele
tempElement.addEventListener("click",function(){
    if(weather.temperature.unit=="celsius"){
        let fahr = celsiusToFahrenheit(weather.temperature.value);
        fahr=Math.floor(fahr);
        tempElement.innerHTML=`${fahr}°<span>F</span>`;
        weather.temperature.unit="fahrenheit";
    }
    else{
        tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit="celsius";
    }
    
});