const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    sessionID: {
      type: String,
      required: [true, "Enter a Session ID"],
      trim: true,
    },
    placedOrder: [
      {
        number: Number,
        food: String,
        price: Number,
      },
    ],
    currentOrder: [
      {
        number: Number,
        food: String,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
