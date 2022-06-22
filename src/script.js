let now = new Date();
let p = document.querySelector("p");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
p.innerHTML = `${day}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h2 = document.querySelector("#city");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
  } else {
    alert(`Please enter a city`);
  }
  let city = searchInput.value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  days.forEach(function (forecastDay, index) {
    If(index < 5);
    {
      forecastHTML =
        forecastHTML +
        `<div class="col-2"> 
  <div class="week-days">${formatDay(forecastDay.dt)}</div>
  <img src="https://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="" width="42" class="forecast-icon"/>
  <div class="forecast-temperatures">${Math.round(
    forecastDay.temp.max
  )}° <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span></div>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "18587a413f83472ff5f95d93ae688338";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let h2 = document.querySelector("#city");
  h2.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let actualTemperature = document.querySelector("#temperature");
  actualTemperature.innerHTML = `${temperature}`;
  let humidity = response.data.main.humidity;
  let actualHumidity = document.querySelector("#humidity");
  actualHumidity.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let actualWind = document.querySelector("#wind");
  actualWind.innerHTML = `${wind}`;
  let weather = response.data.weather[0].main;
  let actualWeather = document.querySelector("#wx-description");
  actualWeather.innerHTML = `${weather}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "18587a413f83472ff5f95d93ae688338";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "18587a413f83472ff5f95d93ae688338";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let button = document.querySelector("#show-current-position");
button.addEventListener("click", getCurrentPosition);
