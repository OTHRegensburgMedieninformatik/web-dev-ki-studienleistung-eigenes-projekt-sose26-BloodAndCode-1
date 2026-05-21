const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const destinations = require("./controllers/detail.js");
const search = require("./controllers/search.js");

router.get("/", home.index);
router.get("/destinations/:id", destinations.show);
router.get("/search", search.index);

module.exports = router;