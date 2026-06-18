const logger = require("../utils/logger.js");
const accounts = require("./accounts.js");
const destinationStore = require("../models/destination-store.js");
const { getWeekendWeather } = require("../utils/weather.js");

const destinations = {
  async show(request, response) {
    logger.info("destination detail rendering");
    const user = await accounts.getCurrentUser(request);
    const destination = await destinationStore.getDestinationById(request.params.id);
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