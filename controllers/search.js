const logger = require("../utils/logger.js");
const db = require("../db/db.js");

const search = {
  async index(request, response) {
    logger.info("search rendering");
    const client = db.getDataStore();
    const result = await client.query("SELECT * FROM destinations");
    const viewData = {
      title: "Suchergebnisse",
      destinations: result.rows,
    };
    response.render("search", viewData);
  },
};


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

module.exports = search; 