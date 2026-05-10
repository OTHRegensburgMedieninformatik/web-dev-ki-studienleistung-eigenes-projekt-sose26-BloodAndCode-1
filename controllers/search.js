const logger = require("../utils/logger.js");

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
};

module.exports = search;