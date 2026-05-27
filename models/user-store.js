const db = require("../db/db.js");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger.js");

const userstore = {
  async addUser(user) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const query = "INSERT INTO friday_users (email, password, name) VALUES ($1, $2, $3)";
    const values = [user.email, passwordHash, user.name];
    try {
      const client = db.getDataStore();
      await client.query(query, values);
      logger.info("User added", user);
    } catch (e) {
      logger.error("Error adding user", e);
    }
  },

  async authenticateUser(email, password) {
    const query = "SELECT * FROM friday_users WHERE email=$1";
    const values = [email];
    try {
      const client = db.getDataStore();
      const dbRes = await client.query(query, values);
      if (dbRes.rows[0] !== undefined) {
        const match = await bcrypt.compare(password, dbRes.rows[0].password);
        if (match) {
          return { id: dbRes.rows[0].id, email: email, name: dbRes.rows[0].name };
        }
      }
      return undefined;
    } catch (e) {
      logger.error("Error authenticating user", e);
    }
  },

  async getUserById(id) {
    const query = "SELECT * FROM friday_users WHERE id=$1";
    const values = [id];
    try {
      const client = db.getDataStore();
      const dbRes = await client.query(query, values);
      if (dbRes.rows[0] !== undefined) {
        return dbRes.rows[0];
      }
      return undefined;
    } catch (e) {
      logger.error("Error getting user", e);
    }
  },
};

module.exports = userstore;