const express = require("express");
const sessionMiddleware = require("./middlewares/sessionMiddleware");




const app = express();
// Creating server



// Serve static files from the public directory
app.use(express.static("public"));

app.use(sessionMiddleware);

module.exports = app;
