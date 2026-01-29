// ===============================
// WeatherFlow - app.js FINAL
// ===============================

// 🔑 CONFIGURACIÓN API
const API_KEY = "TU_API_KEY_AQUI"; // <-- reemplaza con tu API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// 💾 LocalStorage
const FAVORITES_KEY = "weatherflow-favorites";

// 🎯 ELEMENTOS DOM
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const favoritesList = document.getElementById("favoritesList");

// ⭐ ESTADO
let favorites = loadFavorites();
renderFavorites();

// ===============================
// API
// ===============================
async function fetchWeather(city) {
  const response = await fetch(
    `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`
  );

  if (!response.ok) {
    throw new Error("Ciudad no encontrada");
  }

  return response.json();
}

// ===============================
// UI STATES
// ===============================
function showLoader() {
  weatherResult.classList.remove("d-none");
  weatherResult.innerHTML = `
    <div class="text-center my-4">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Consultando clima...</p>
    </div>
  `;
}

function showError(message) {
  weatherResult.classList.remove("d-none");
  weatherResult.innerHTML = `
    <div class="alert alert-danger text-center">
      ${message}
    </div>
  `;
}

// ===============================
// RENDER CLIMA
// ===============================
function renderWeather(data) {
  weatherResult.classList.remove("d-none");

  weatherResult.innerHTML = `
    <div class="card shadow-sm mx-auto" style="max-width: 420px;">
      <div class="card-body text-center">
        <h4 class="fw-bold">${data.name}, ${data.sys.country}</h4>

        <div class="display-4 fw-bold my-2">
          ${Math.round(data.main.temp)}°C
        </div>

        <p class="text-muted text-capitalize">
          ${data.weather[0].description}
        </p>

        <div class="d-flex justify-content-around my-3">
          <span>💧 ${data.main.humidity}%</span>
          <span>💨 ${Math.round(data.wind.speed)} km/h</span>
        </div>

        <button id="addFavoriteBtn" class="btn btn-outline-warning btn-sm">
          ⭐ Guardar en favoritos
        </button>
      </div>
    </div>
  `;

  document
    .getElementById("addFavoriteBtn")
    .addEventListener("click", () => addFavorite(data.name));
}

// ===============================
// FAVORITOS - LOCALSTORAGE
// ===============================
function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function loadFavorites() {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

function addFavorite(city) {
  if (favorites.includes(city)) return;

  favorites.push(city);
  saveFavorites();
  renderFavorites();
}

function renderFavorites() {
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <li class="list-group-item text-muted text-center">
        No hay ciudades guardadas
      </li>
    `;
    return;
  }

  favorites.forEach(city => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <span>${city}</span>
      <button class="btn btn-sm btn-outline-danger">✖</button>
    `;

    li.querySelector("button").onclick = () => {
      favorites = favorites.filter(c => c !== city);
      saveFavorites();
      renderFavorites();
    };

    favoritesList.appendChild(li);
  });
}

// ===============================
// EVENTOS
// ===============================
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Ingresa una ciudad válida");
    return;
  }

  showLoader();

  try {
    const data = await fetchWeather(city);
    renderWeather(data);
  } catch (error) {
    showError("Ciudad no encontrada o error de conexión");
  }
});
