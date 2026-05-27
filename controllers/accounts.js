const logger = require("../utils/logger.js");
const userstore = require("../models/user-store.js");

const accounts = {
  login(request, response) {
    logger.info("login rendering");
    response.render("login");
  },

  register(request, response) {
    logger.info("register rendering");
    response.render("register");
  },

  async authenticate(request, response) {
    const user = await userstore.authenticateUser(
      request.body.email,
      request.body.password
    );
    if (user) {
      request.session.user = user;
      logger.info("User authenticated", user);
      response.redirect("/");
    } else {
      logger.info("Authentication failed");
      response.redirect("/login");
    }
  },

  async createAccount(request, response) {
    const user = request.body;
    await userstore.addUser(user);
    logger.info("Creating account", user);
    response.redirect("/");
  },

  logout(request, response) {
    request.session.destroy();
    logger.info("User logged out");
    response.redirect("/");
  },

  async getCurrentUser(request) {
    const userId = request.session.user?.id;
    if (userId) {
      return await userstore.getUserById(userId);
    }
    return undefined;
  },
};

module.exports = accounts;