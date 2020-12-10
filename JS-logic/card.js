const { heirarchies, suits, numbers, gameTypes } = require("./details")

class Card {
  constructor(suit, number) {
    this.suit = suits[suit];
    this.number = numbers[number]
  }
}

let c1 = new Card();

module.exports = {
  Card,c1
}

// let card1 = new Card("spade", 2);
// console.log(card1)