// script.js
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchHistory = document.getElementById("search-history");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");

function displayWeather(data) {
    currentWeather.innerHTML = `
      <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
      <p>Temperature: ${data.main.temp}°F</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} MPH</p>
    `;
  }
  
  function displayForecast(data) {
    forecast.innerHTML = "";
  
    data.list.forEach((item, index) => {
      if (index % 8 === 0) {
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
  
        forecastItem.innerHTML = `
          <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
          <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
          <p>Temp: ${item.main.temp}°F</p>
          <p>Wind: ${item.wind.speed} MPH</p>
          <p>Humidity: ${item.main.humidity}%</p>
        `;
  
        forecast.appendChild(forecastItem);
      }
    });
  }
  
  async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f461f184bb0f987cdbcdefa61ead2cc9&units=imperial`);
    const data = await response.json();
    displayWeather(data);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f461f184bb0f987cdbcdefa61ead2cc9&units=imperial`);
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
  }
  
  function addToHistory(city) {
    const listItem = document.createElement("div");
    listItem.classList.add("history-item");
    listItem.textContent = city;
    listItem.addEventListener("click", () => fetchWeather(city));
    searchHistory.appendChild(listItem);
  }
  
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
      addToHistory(city);
      cityInput.value = "";
    }
  });