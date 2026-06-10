const logger = require("./logger.js");

const weatherDescriptions = {
  0: { label: "Sonnig", emoji: "☀️" },
  1: { label: "Meist klar", emoji: "🌤️" },
  2: { label: "Teilweise bewölkt", emoji: "⛅" },
  3: { label: "Bewölkt", emoji: "☁️" },
  45: { label: "Neblig", emoji: "🌫️" },
  48: { label: "Neblig", emoji: "🌫️" },
  51: { label: "Leichter Nieselregen", emoji: "🌦️" },
  61: { label: "Leichter Regen", emoji: "🌧️" },
  63: { label: "Regen", emoji: "🌧️" },
  80: { label: "Regenschauer", emoji: "🌦️" },
  81: { label: "Regenschauer", emoji: "🌦️" },
  82: { label: "Starker Regenschauer", emoji: "🌧️" },
  95: { label: "Gewitter", emoji: "⛈️" },
};

function getWeekendDates() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=So, 1=Mo, ..., 6=Sa
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + daysUntilSaturday);
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  return {
    saturday: saturday.toISOString().split("T")[0],
    sunday: sunday.toISOString().split("T")[0],
  };
}

async function getWeekendWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode&timezone=Europe%2FBerlin&forecast_days=7`;
    const response = await fetch(url);
    const data = await response.json();
    //logger.info("API response: " + JSON.stringify(data));

    const { saturday, sunday } = getWeekendDates();
    const times = data.daily.time;
    const temps = data.daily.temperature_2m_max;
    const codes = data.daily.weathercode;

    const satIndex = times.indexOf(saturday);
    const sunIndex = times.indexOf(sunday);

    const satCode = codes[satIndex] ?? 0;
    const sunCode = codes[sunIndex] ?? 0;

    return {
      saturday: {
        date: saturday,
        temp: temps[satIndex] ?? null,
        code: satCode,
        ...(weatherDescriptions[satCode] ?? { label: "Unbekannt", emoji: "❓" }),
      },
      sunday: {
        date: sunday,
        temp: temps[sunIndex] ?? null,
        code: sunCode,
        ...(weatherDescriptions[sunCode] ?? { label: "Unbekannt", emoji: "❓" }),
      },
    };
  } catch (e) {
    logger.error("Weather API error", e);
    return null;
  }
}

async function validateLocation(location) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Friday-WeatherApp/1.0"
      }
    });
    const data = await response.json();
    return data.length > 0;
  } catch (e) {
    logger.error("Nominatim API error", e);
    return true;
  }
}

module.exports = { getWeekendWeather, validateLocation };