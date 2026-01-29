import { getWeatherByCity } from "./api.js";
import { renderWeather } from "./ui.js";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Ingresa una ciudad");
    return;
  }

  try {
    const weatherData = await getWeatherByCity(city);
    renderWeather(weatherData);
  } catch (error) {
    alert(error.message);
  }
});

