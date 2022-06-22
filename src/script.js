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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2"> 
  <div class="week-days">${day}</div>
  <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" alt="" width="42" class="forecast-icon"/>
  <div class="forecast-temperatures">28° <span class="min-temp">16°</span></div>
</div>`;
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let button = document.querySelector("#show-current-position");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
