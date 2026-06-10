const logger = require("../utils/logger.js");
const db = require("../db/db.js");
const accounts = require("./accounts.js");
const { getWeekendWeather } = require("../utils/weather.js");

const destinations = {
  async show(request, response) {
    logger.info("destination detail rendering");
    const user = await accounts.getCurrentUser(request);
    const client = db.getDataStore();
    const result = await client.query(
      "SELECT * FROM destinations WHERE id = $1",
      [request.params.id]
    );
    const destination = result.rows[0];
    const weather = await getWeekendWeather(destination.lat, destination.lon);
    const viewData = {
      title: destination.name,
      destination: destination,
      weather: weather,
      user: user,
    };
    response.render("detail", viewData);
  },
};

module.exports = destinations;