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

let button = document.querySelector("#show-current-position");
button.addEventListener("click", getCurrentPosition);
