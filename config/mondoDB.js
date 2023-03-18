const mongoose = require("mongoose");
const { config } = require("./config");

function connectMongo(server) {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(config.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: config.DB_NAME,
    })
    .then(() =>
      server.listen(config.PORT, () => {
        console.log(
          `App running on PORT: ${config.PORT} and MongoDB Server started Successfully!`
        );
      })
      
    )
    .catch((err) => console.log(err));
    mongoose.connection.on("disconnected", () => {
      console.log("mongoDB disconnected!");
    });
}

module.exports = connectMongo;
