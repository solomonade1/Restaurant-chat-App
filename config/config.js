const config = {
  botName: process.env.BOT_NAME,
  PORT: process.env.PORT || 8080,
  mongoURL: process.env.MONGO_URL,
  sessionSecret: process.env.sessionSecret || "Hello",
  local_db: process.env.local_db,
  DB_NAME: process.env.DB_NAME,
  sessionMaxAge: process.env.sessionMaxAge,
};

const cors = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = { config, cors };
