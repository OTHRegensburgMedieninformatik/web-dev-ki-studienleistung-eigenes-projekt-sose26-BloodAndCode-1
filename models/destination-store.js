const db = require("../db/db.js");
const logger = require("../utils/logger.js");

const destinationStore = {
  async getDestinationById(id) {
    const query = "SELECT * FROM destinations WHERE id = $1";
    try {
      const client = db.getDataStore();
      const result = await client.query(query, [id]);
      return result.rows[0];
    } catch (e) {
      logger.error("Error getting destination", e);
      return undefined;
    }
  },

  async getAllDestinations() {
    const query = "SELECT * FROM destinations";
    try {
      const client = db.getDataStore();
      const result = await client.query(query);
      return result.rows;
    } catch (e) {
      logger.error("Error getting destinations", e);
      return [];
    }
  },
};

module.exports = destinationStore;