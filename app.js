const express = require("express");
const logger = require("./utils/logger");
const handlebars = require("express-handlebars");
const session = require("express-session");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.engine('.hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
  }
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "friday_secret_key",
  resave: false,
  saveUninitialized: false,
}));

const routes = require("./routes");
app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log(`Web App template listening on ${process.env.PORT}`);
});

module.exports = app;