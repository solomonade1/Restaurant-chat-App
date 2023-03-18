const session = require("express-session");

const { config } = require("../config/config");

const maxAge = 18
// parseInt(config.sessionMaxAge);

const sessionMiddleware = session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge },
});

module.exports = sessionMiddleware;
