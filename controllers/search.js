const logger = require("../utils/logger.js");
const db = require("../db/db.js");
const accounts = require("./accounts.js");
const { getWeekendWeather, getLocationCoordinates, calculateDistance } = require("../utils/weather.js");

const search = {
  async index(request, response) {
    logger.info("search rendering");
    const user = await accounts.getCurrentUser(request);
    const location = request.query.location;
    const maxDistance = parseFloat(request.query.maxDistance) || 500;
    const page = parseInt(request.query.page) || 1;
    const pageSize = 5;

    if (!location) {
      const viewData = { title: "Suchergebnisse", user: user, error: "Bitte gib deinen Standort ein." };
      return response.render("search", viewData);
    }

    const coords = await getLocationCoordinates(location);
    if (!coords) {
      const viewData = { title: "Suchergebnisse", user: user, error: "Standort nicht gefunden. Bitte überprüfe die Eingabe." };
      return response.render("search", viewData);
    }

    const client = db.getDataStore();
    const result = await client.query("SELECT * FROM destinations");

    const destinationsWithDistance = result.rows
      .map((destination) => {
        const distance = calculateDistance(coords.lat, coords.lon, destination.lat, destination.lon);
        return { ...destination, distance_km: Math.round(distance) };
      })
      .filter((destination) => destination.distance_km <= maxDistance)
      .sort((a, b) => a.distance_km - b.distance_km);

    const totalCount = destinationsWithDistance.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const start = (page - 1) * pageSize;
    const pageItems = destinationsWithDistance.slice(start, start + pageSize);

    const destinationsWithWeather = await Promise.all(
      pageItems.map(async (destination) => {
        const weather = await getWeekendWeather(destination.lat, destination.lon);
        return { ...destination, weather };
      })
    );

    const viewData = {
      title: "Suchergebnisse",
      destinations: destinationsWithWeather,
      user: user,
      maxDistance: maxDistance,
      location: location,
      currentPage: page,
      totalPages: totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
    response.render("search", viewData);
  },
};

module.exports = search;