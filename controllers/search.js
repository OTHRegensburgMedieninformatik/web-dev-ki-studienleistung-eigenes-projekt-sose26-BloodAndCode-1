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
    const page = parseInt(request.query.page) || 1;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;

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
      "SELECT * FROM destinations WHERE distance_km <= $1 ORDER BY distance_km ASC LIMIT $2 OFFSET $3",
      [maxDistance, pageSize, offset]
    );

    const countResult = await client.query(
      "SELECT COUNT(*) FROM destinations WHERE distance_km <= $1",
      [maxDistance]
    );
    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / pageSize);

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