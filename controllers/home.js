const logger = require("../utils/logger.js");
const accounts = require("./accounts.js");

const home = {
  async index(request, response) {
    logger.info("home rendering");
    const user = await accounts.getCurrentUser(request);
    const viewData = {
      title: "Welcome to Friday!",
      user: user,
    };
    response.render("index", viewData);
  },
};

module.exports = home;