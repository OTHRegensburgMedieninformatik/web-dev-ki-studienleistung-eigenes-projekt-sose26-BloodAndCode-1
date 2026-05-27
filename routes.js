const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const destinations = require("./controllers/detail.js");
const search = require("./controllers/search.js");
const accounts = require("./controllers/accounts.js");

router.get("/", home.index);
router.get("/destinations/:id", destinations.show);
router.get("/search", search.index);

router.get("/login", accounts.login);
router.get("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.post("/register", accounts.createAccount);
router.get("/logout", accounts.logout);

module.exports = router;