const API_KEY = "6e5ecf799545f76a8189b46482590f0a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&units=metric&lang=es&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Ciudad no encontrada");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error API:", error.message);
    throw error;
  }
}
