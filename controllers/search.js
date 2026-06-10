const logger = require("../utils/logger.js");
const db = require("../db/db.js");
const accounts = require("./accounts.js");
const { getWeekendWeather, validateLocation } = require("../utils/weather.js");

const search = {
  async index(request, response) {
    logger.info("search rendering");
    const user = await accounts.getCurrentUser(request);
    const location = request.query.location;
    const maxDistance = request.query.maxDistance || 500;
    if (!location) {
      const viewData = { title: "Suchergebnisse", user: user, error: "Bitte gib deinen Standort ein." };
      return response.render("search", viewData);
    }

    const locationExists = await validateLocation(location);
    if (!locationExists) {
      const viewData = { title: "Suchergebnisse", user: user, error: "Standort nicht gefunden. Bitte überprüfe die Eingabe." };
      return response.render("search", viewData);
    }
    const client = db.getDataStore();
    const result = await client.query(
      "SELECT * FROM destinations WHERE distance_km <= $1 ORDER BY distance_km ASC",
      [maxDistance]);

    const destinationsWithWeather = await Promise.all(
      result.rows.map(async (destination) => {
        const weather = await getWeekendWeather(destination.lat, destination.lon);
        return { ...destination, weather };
      })
    );

    const viewData = {
      title: "Suchergebnisse",
      destinations: destinationsWithWeather,
      user: user,
      maxDistance: maxDistance,
    };
    response.render("search", viewData);
  },
};

module.exports = search;

/*
const search = {
  index(request, response) {
    logger.info("search rendering");
    const viewData = {
      title: "Suchergebnisse",
      location: request.query.location,
      maxDistance: request.query.maxDistance,
    };
    response.render("search", viewData);
  },
}; */

