const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MessageSchema = new Schema(
  {
    sessionID: {
      type: String,
      required: [true, "Enter a Session ID"],
      trim: true,
    },
    userMessage: {
      username: String,
      text: String,
      time: String,
    },
    botMessage: {
      username: String,
      text: String,
      time: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message
