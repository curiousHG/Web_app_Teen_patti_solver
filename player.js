const {Card,c1,c2,c3} = require("./card")
const { heirarchies, suits, numbers, gameTypes } = require("./details")


class Player {
  constructor() {
    this.cards = [];
    this.hierarchy = null
    this.hierarchyNumber = null
  }
  suitChecker() {
    // Returns True is cards suit is same
    if (this.cards[0].suit == this.cards[1].suit == this.cards[2].suit)
      return True
  }
  numberChecker() {
    // Returns True if all cards have same numbers
    if (this.cards[0].number == this.cards[1].number == this.cards[2].number)
      return True
  }
  sequenceChecker() {
    // Returns True if the cards form any sequence and sets sequenceHierarchy
    let l = [];
    var card;
    for (card in this.cards) {
      l.push(card.number)
    }
    l.sort()
    // Considering A23 the highest sequence
    if (l === [2, 3, 14]) {
      this.hierarchyNumber = [12]
      return true
    }
    else if (l[2] - l[0] == 2) {
      this.hierarchyNumber = [l[0] - 1]
      return true
    }
    return false
  }
  pairChecker() {
    // Checks if cards contain a pair and sets hierarchyNumber to a list
    // where first element is pair number and second is number of the remaining card
    let l = [];
    var card;
    for (card in this.cards) {
      l.push(card.number)
    }
    l.sort()
    if (l[1] == l[0]) {
      this.hierarchyNumber = [l[1], l[2]]
      return true
    }
    else if (l[1] == l[2]) {
      this.hierarchyNumber = [l[1], l[0]]
      return true
    }
    return false
  }
  hierarchy_decider() {
    if (this.numberChecker()) {
      this.hierarchy = heirarchies["Trail"]
      this.hierarchyNumber = [this.cards[0].number]
    }
    else if (this.sequenceChecker()) {
      if (this.suitChecker())
        this.hierarchy = heirarchies["PureSeq"]
      else
        this.hierarchy = heirarchies["Seq"]
    }
    else if (this.suitChecker()) {
      this.hierarchy = heirarchies["Color"]
      let cards = [];
      var card;
      for (card in this.cards) {
        cards.push(card.number)
      }
      cards.sort()
      this.hierarchyNumber = [];
      this.hierarchyNumber.push(cards.reverse());
    }
    else if (this.pairChecker())
      this.hierarchy = heirarchies["Pair"]
    else {
      this.hierarchy = heirarchies["HighCard"]
      let cards = [];
      var card;
      for (card in this.cards) {
        cards.push(card.number)
      }
      cards.sort()
      this.hierarchyNumber = [];
      this.hierarchyNumber.push(cards.reverse());
    }
  }
}

let player1 = new Player();
let player2 = new Player();


// let l = [c1,c2,c3]
// console.log(l);
// let p = new Player()
// p.cards = l
// console.log(p.cards[0].suit)
// p.hierarchy_decider()
// console.log(p.hierarchy, p.hierarchyNumber)

module.exports = {
  Player,player1,player2
}
