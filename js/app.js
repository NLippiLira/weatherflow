import { getWeatherByCity } from "./api.js";
import { renderWeather, renderFavorites } from "./ui.js";
import { getFavorites, saveFavorites } from "./storage.js";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

let favorites = getFavorites();

// 👉 Exponemos funciones para UI
window.addFavorite = (city) => {
  if (!favorites.includes(city)) {
    favorites.push(city);
    saveFavorites(favorites);
    renderFavorites(favorites);
  }
};

window.removeFavorite = (city) => {
  favorites = favorites.filter(c => c !== city);
  saveFavorites(favorites);
  renderFavorites(favorites);
};

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const weatherData = await getWeatherByCity(city);
    renderWeather(weatherData);
  } catch (error) {
    alert(error.message);
  }
});

// Render inicial
renderFavorites(favorites);
