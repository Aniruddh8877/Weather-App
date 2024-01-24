const apikey = "1c9fe49d414cbda65c4177c3a99a5c73";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatheIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        updateWeatherIcon(data.weather[0].main);

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

function updateWeatherIcon(weatherCondition) {
    const iconMap = {
        "Clouds": "assects/clouds.png",
        "Clear": "assects/clear.png",
        "Rain": "assects/rain.png",
        "Drizzle": "assects/drizzle.png", // Corrected the condition name
        "Mist": "assects/mist.png"
    };

    const iconSrc = iconMap[weatherCondition] || "assects/clouds.png";
    weatheIcon.src = iconSrc;
}

searchbtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});
