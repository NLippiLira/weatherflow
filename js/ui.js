const weatherResult = document.getElementById("weatherResult");

export function renderWeather(data) {
  const {
    name,
    main: { temp, humidity },
    weather,
    wind
  } = data;

  weatherResult.innerHTML = `
    <div class="card shadow-sm p-4">
      <h3 class="fw-bold mb-2 d-flex justify-content-center align-items-center gap-2">
  ${name}
  <button id="favBtn" class="btn btn-sm btn-outline-warning">
    ⭐
  </button>
</h3>
      <p class="display-6 mb-1">${Math.round(temp)}°C</p>
      <p class="text-capitalize text-muted">${weather[0].description}</p>

      <div class="d-flex justify-content-center gap-4 mt-3">
        <div>
          <small class="text-muted">Humedad</small>
          <div class="fw-semibold">${humidity}%</div>
        </div>

        <div>
          <small class="text-muted">Viento</small>
          <div class="fw-semibold">${wind.speed} m/s</div>
        </div>
      </div>
    </div>
  `;

  weatherResult.classList.remove("d-none");
  document.getElementById("favBtn").onclick = () => {
  window.addFavorite(name);
};
}

const favoritesList = document.getElementById("favoritesList");

export function renderFavorites(favorites) {
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <li class="list-group-item text-muted text-center">
        No hay ciudades favoritas
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
      <button class="btn btn-sm btn-outline-danger">
        ✕
      </button>
    `;

    li.querySelector("button").onclick = () => {
      window.removeFavorite(city);
    };

    favoritesList.appendChild(li);
  });
}
