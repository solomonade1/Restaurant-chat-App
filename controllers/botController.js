const Session = require("../models/Session");
const Message = require("../models/Message");

const messageFormat = require("../utils/message");
const { botMenu, foodMenu } = require("../utils/botMenu");
const formatMenuItems = require("../utils/formatMenuItems");

const { config } = require("../config/config");

exports.saveSessionID = async (sessionID) => {
  try {
    const sessionFound = await Session.findOne({ sessionID });

    if (!sessionFound) {
      await Session.create({ sessionID });
    } else {
      return;
    }
  } catch (err) {
    console.log(err, "Error saving section ID");
  }
};

exports.loadMessage = async (io, sessionID) => {
  try {
    const previousMessages = await Message.find({ sessionID });

    if (!previousMessages) return;

    previousMessages.forEach((message) => {
      io.to(message.sessionID).emit("user message", message.userMessage);
      io.to(message.sessionID).emit("bot message", message.botMessage);
    });
  } catch (error) {
    console.log(error, "Load message Error");
  }
};

exports.welcomeMessage = (io, sessionID) => {
  let botMessage = `Hello, Welcome to Akins Restaurant <br> Virtual Assistant `;
  io.to(sessionID).emit(
    "bot message",
    messageFormat(config.botName, botMessage)
  );
};

exports.mainMenu = (io, sessionID) => {
  let botMessage = messageFormat(
    config.botName,
    formatMenuItems("mainMenu", botMenu)
  );
  io.to(sessionID).emit("bot message", botMessage);
  return botMessage;
};

exports.menu = (io, sessionID) => {
  let botMessage = messageFormat(
    config.botName,
    formatMenuItems("Select One Item To Add to Your Cart", foodMenu)
  );
  io.to(sessionID).emit("bot message", botMessage);
  return botMessage;
};

exports.checkOutOrder = async (io, sessionID) => {
  const sessionOrder = await Session.findOne({ sessionID });

  let botMessage = "";
  if (sessionOrder.currentOrder.length < 1) {
    botMessage = messageFormat(
      config.botName,
      "You have not ordered anything yet!"
    );
    io.to(sessionID).emit("bot message", botMessage);
  } else {
    sessionOrder.placedOrder = [
      ...sessionOrder.currentOrder,
      ...sessionOrder.placedOrder,
    ];
    sessionOrder.currentOrder = [];
    await sessionOrder.save();

    botMessage = messageFormat(config.botName, "Order Placed Successfully!");

    io.to(sessionID).emit("bot message", botMessage);
  }
  io.to(sessionID).emit("bot message", messageFormat(config.botName, botMenu));

  return botMessage;
};

exports.orderHistory = async (io, sessionID) => {
  const sessionOrder = await Session.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.placedOrder.length < 1) {
    botMessage = messageFormat(
      config.botName,
      "You do not have any order history yet!"
    );
    io.to(sessionID).emit("bot message", botMessage);
  } else {
    botMessage = messageFormat(
      config.botName,
      formatMenuItems("Your Order History", sessionOrder.placedOrder)
    );
    io.to(sessionID).emit("bot message", botMessage);
  }
  io.to(sessionID).emit("bot message", messageFormat(config.botName, botMenu));

  return botMessage;
};

exports.currentOrder = async (io, sessionID) => {
  const sessionOrder = await Session.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.currentOrder.length < 1) {
    botMessage = messageFormat(
      config.botName,
      "You do not have any order yet!"
    );
    io.to(sessionID).emit("bot message", botMessage);
  } else {
    botMessage = messageFormat(
      config.botName,
      formatMenuItems("Your Current Order", sessionOrder.currentOrder)
    );
    io.to(sessionID).emit("bot message", botMessage);
  }

  io.to(sessionID).emit("bot message", messageFormat(config.botName, botMenu));

  return botMessage;
};

exports.cancelOrder = async (io, sessionID) => {
  const sessionOrder = await Session.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.currentOrder.length < 1) {
    botMessage = messageFormat(
      config.botName,
      "You do not have any order yet!"
    );

    io.to(sessionID).emit("bot message", botMessage);
  } else {
    botMessage = messageFormat(config.botName, "Order Cancelled!");

    sessionOrder.currentOrder = [];
    await sessionOrder.save();

    io.to(sessionID).emit("bot message", botMessage);
  }
  //TODO: save the resposne to the database
  io.to(sessionID).emit("bot message", messageFormat(config.botName, botMenu));

  return botMessage;
};

exports.saveOrder = async (io, sessionID, number) => {
  const sessionOrder = await Session.findOne({ sessionID });

  let botMessage = "";
  if (number === 1) {
    sessionOrder.currentOrder.push(foodMenu[0]);

  }
  if (number === 2) {
    sessionOrder.currentOrder.push(foodMenu[1]);
  }
  if (number === 3) {
    sessionOrder.currentOrder.push(foodMenu[2]);
  }
  if (number === 4) {
    sessionOrder.currentOrder.push(foodMenu[3]);
  }
  if (number === 5) {
    sessionOrder.currentOrder.push(foodMenu[4]);
  }
  if (number === 6) {
    sessionOrder.currentOrder.push(foodMenu[5]);
  }

  await sessionOrder.save();

  botMessage = messageFormat(
    config.botName,
    formatMenuItems("Order Added", sessionOrder.currentOrder)
  );
  io.to(sessionID).emit("bot message", botMessage);

  io.to(sessionID).emit("bot message", messageFormat(config.botName, botMenu));

  return botMessage;
};
