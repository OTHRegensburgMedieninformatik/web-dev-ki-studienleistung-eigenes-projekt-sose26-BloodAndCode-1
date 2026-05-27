const db = require("../db/db.js");
const logger = require("../utils/logger.js");

const tripstore = {
  async saveTrip(userId, destinationId, notes) {
    const query = "INSERT INTO saved_trips (user_id, destination_id, notes) VALUES ($1, $2, $3)";
    const values = [userId, destinationId, notes];
    try {
      const client = db.getDataStore();
      await client.query(query, values);
      logger.info("Trip saved", { userId, destinationId });
    } catch (e) {
      logger.error("Error saving trip", e);
    }
  },

  async getTripsByUser(userId) {
    const query = `
      SELECT saved_trips.id, saved_trips.notes, saved_trips.created_at,
             destinations.name, destinations.distance_km
      FROM saved_trips
      JOIN destinations ON saved_trips.destination_id = destinations.id
      WHERE saved_trips.user_id = $1
      ORDER BY saved_trips.created_at DESC
    `;
    try {
      const client = db.getDataStore();
      const result = await client.query(query, [userId]);
      return result.rows;
    } catch (e) {
      logger.error("Error getting trips", e);
      return [];
    }
  },
};

module.exports = tripstore;