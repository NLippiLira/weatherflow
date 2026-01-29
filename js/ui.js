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
      <h3 class="fw-bold mb-2">${name}</h3>

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
}
