const logger = require("../utils/logger.js");
const db = require("../db/db.js");

const destinations = {
  async show(request, response) {
    logger.info("destination detail rendering");
    const client = db.getDataStore();
    const result = await client.query(
      "SELECT * FROM destinations WHERE id = $1",
      [request.params.id]
    );
    console.log("params:", request.params.id);
    console.log("rows:", result.rows);
    const viewData = {
      title: "Reiseziel",
      destination: result.rows[0],
    };
    response.render("detail", viewData);
  },
};

module.exports = destinations;