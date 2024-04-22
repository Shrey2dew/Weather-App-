const apiKey = "4ba0c7611b5caab627ef86755cdba40d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const dayElement = document.querySelector(".day");
const timeElement = document.querySelector(".time");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

    const weatherCondition = data.weather[0].main;
    document.querySelector(".weather-condition").innerHTML = weatherCondition;

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "Images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "Images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "Images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "Images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "Images/mist.png";
    } else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "Images/snow.png";
    }

}

function updateDay() {
    const currentDate = new Date();
    const options = { weekday: 'long' };
    const currentDay = currentDate.toLocaleDateString('en-US', options);
    dayElement.innerHTML = currentDay;
}

function updateTime() {
    const currentTime = new Date();
    const currentFormattedTime = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    timeElement.innerHTML = currentFormattedTime;
}

setInterval(updateTime, 1000);

function showContainer() {
    const container = document.querySelector(".container");
    container.classList.add("show");
}

updateDay();
updateTime();
showContainer();

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});