const formatMenuItems = (msg, list) => {
  let arrayMsg = "";

  if (msg == "mainMenu") {
    arrayMsg = list
      .map((item) => {
        return `${item.number}: To ${item.text}`;
      })
      .join(`<br>`);
    arrayMsg = `Please select a number from the list below: <br>` + arrayMsg;
    return arrayMsg;
  }

  arrayMsg = list
    .map((item, index) => {
      return `${index + 1}: ${item.food} => &#8358; ${item.price} `;
    })
    .join(`<br>`);

  arrayMsg = `${msg}: <br>` + arrayMsg;
  return arrayMsg;
};

module.exports = formatMenuItems;
