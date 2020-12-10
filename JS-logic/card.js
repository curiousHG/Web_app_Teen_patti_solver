const { heirarchies, suits, numbers, gameTypes } = require("./details")

class Card {
  constructor(suit, number) {
    this.suit = suits[suit];
    this.number = numbers[number]
  }
}

let c1 = new Card();
let c2=new Card("spade","2");
let c3=new Card("spade","5");
let c4=new Card("spade","9");

module.exports = {
  Card,c1,c2,c3,c4
}

// let card1 = new Card("spade", 2);
// console.log(card1)