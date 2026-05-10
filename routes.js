const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const about = require("./controllers/about.js");
const search = require("./controllers/search.js");


router.get("/", home.index);
router.get("/about", about.index);
router.get("/search", search.index);

module.exports = router;
