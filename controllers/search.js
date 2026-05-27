const logger = require("../utils/logger.js");
const db = require("../db/db.js");
const accounts = require("./accounts.js");
const { getWeekendWeather } = require("../utils/weather.js");

const search = {
  async index(request, response) {
    logger.info("search rendering");
    const user = await accounts.getCurrentUser(request);
    const client = db.getDataStore();
    const result = await client.query("SELECT * FROM destinations");

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

