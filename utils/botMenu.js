const botMenu = [
  { number: 1, text: "Place An Order" },
  { number: 99, text: "Checkout Order" },
  { number: 98, text: "Check Order History" },
  { number: 97, text: "Check Current Order" },
  { number: 0, text: "Cancel Order" },
];

const foodMenu = [
  { number: 1, food: "Swallow (Eba, Fufu, Semo, Amala)", price: 700 },
  { number: 2, food: "Pizza", price: 2500 },
  { number: 3, food: "Pounded Yam", price: 800 },
  { number: 4, food: "Jollof Rice", price: 2000 },
  { number: 5, food: "Bread sliced 500g", price: 1200 },
  { number: 6, food: "Broken rice (Ofada)", price: 2000 },
];

module.exports = {
  botMenu,
  foodMenu,
};
