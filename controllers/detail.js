const logger = require("../utils/logger.js");
const db = require("../db/db.js");
const accounts = require("./accounts.js");

const destinations = {
  async show(request, response) {
    logger.info("destination detail rendering");
    const user = await accounts.getCurrentUser(request);
    const client = db.getDataStore();
    const result = await client.query(
      "SELECT * FROM destinations WHERE id = $1",
      [request.params.id]
    );
    const viewData = {
      title: "Reiseziel",
      destination: result.rows[0],
      user: user,
    };
    response.render("detail", viewData);
  },
};

module.exports = destinations;