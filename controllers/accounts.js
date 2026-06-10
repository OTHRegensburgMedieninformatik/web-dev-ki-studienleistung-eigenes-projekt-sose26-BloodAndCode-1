const logger = require("../utils/logger.js");
const userstore = require("../models/user-store.js");
const tripstore = require("../models/trip-store.js");

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
    const error = await userstore.addUser(user);
    if (error === "23505") {
      return response.render("register", { error: "Diese E-Mail ist bereits registriert." });
    }
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
  async saveTrip(request, response) {
    const user = await accounts.getCurrentUser(request);
    if (!user) {
      return response.redirect("/login");
    }
    const destinationId = request.params.id;
    const notes = request.body.notes;
    await tripstore.saveTrip(user.id, destinationId, notes);
    logger.info("Trip saved, redirecting");
    response.redirect("/destinations/" + destinationId);
  },

  async myTrips(request, response) {
    const user = await accounts.getCurrentUser(request);
    if (!user) {
      return response.redirect("/login");
    }
    const trips = await tripstore.getTripsByUser(user.id);
    const viewData = { user, trips };
    response.render("trips", viewData);
  },
};

module.exports = accounts;