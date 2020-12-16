let gameTyp = document.getElementById("gameTyp");
let submit_1 = document.getElementById("submit_1");
let compare = document.getElementById("Compare");
let c1 = document.getElementById("c1")
let c2 = document.getElementById("c2")
let c3 = document.getElementById("c3")
let c4 = document.getElementById("c4")
let c5 = document.getElementById("c5")
let c6 = document.getElementById("c6")
let result = document.querySelector(".result")
let chooser = document.querySelector(".chooser")
let reset = document.querySelector(".reset")

let p1suits = []
let p1num = []

submit_1.addEventListener("click", () => {
  for (let i = 0; i < 3; i++) {
    let k = i + 1
    p1suits[i] = document.getElementById("suit" + k).value;
    p1num[i] = document.getElementById("no" + k).value;
  }
})


let heirarchies = {
  "Trail": 6,
  "PureSeq": 5,
  "Seq": 4,
  "Color": 3,
  "Pair": 2,
  "HighCard": 1
}
let suits = {
  'S': 0,
  'H': 1,
  'D': 2,
  'C': 3
}
let numbers = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}
let gameTypes = {
  'Classic': 3,
  'AK47': 3,
  'DiscardOne': 4
}

class Card {
  constructor(suit, number) {
    this.suit = suits[suit];
    this.number = numbers[number]
  }
}

class Player {
  constructor() {
    this.cards = [];
    this.hierarchy = null;
    this.hierarchyNumber = [];
  }
  numberChecker() {
    // Returns True if all cards have same numbers
    if (this.cards[0].number === this.cards[1].number && this.cards[1].number === this.cards[2].number) {
      // console.log("number hn")
      return true
    }
    return false
  }

  sequenceChecker() {
    // Returns True if the cards form any sequence and sets sequenceHierarchy
    let l = [];
    var card;
    for (card in this.cards) {
      l.push(this.cards[card].number)
    }
    l.sort((a, b) => a - b)
    // Considering A23 the highest sequence
    if (l === [2, 3, 14]) {
      this.hierarchyNumber.push(12);
      // console.log("seq hn")
      return true

    }
    else if (l[2] - l[0] === 2) {
      this.hierarchyNumber.push(l[0] - 1)
      // console.log("seq hn")
      return true

    }
    return false
  }
  suitChecker() {
    // Returns True is cards suit is same
    if (this.cards[0].suit === this.cards[1].suit && this.cards[1].suit === this.cards[2].suit) {
      // console.log("color hn")
      return true
    }
    return false
  }
  pairChecker() {
    // console.log(this.cards[0].suit)
    // Checks if cards contain a pair and sets hierarchyNumber to a list
    // where first element is pair number and second is number of the remaining card
    let l = [];
    var card;
    for (card in this.cards) {
      l.push(this.cards[card].number)
    }
    l.sort((a, b) => a - b)
    if (l[1] === l[0]) {
      this.hierarchyNumber.push(l[1], l[2])
      // console.log("pair")
      return true
    }
    else if (l[1] === l[2]) {
      this.hierarchyNumber.push(l[1], l[0])
      // console.log("pair")
      return true
    }
    return false
  }
  hierarchy_decider() {
    // console.log("we are in decider")
    if (this.numberChecker()) {
      this.hierarchy = heirarchies["Trail"]
      this.hierarchyNumber.push(this.cards[0].number)
    }
    else if (this.sequenceChecker()) {
      if (this.suitChecker()) {
        this.hierarchy = heirarchies["PureSeq"]
      }
      else {
        this.hierarchy = heirarchies["Seq"]
      }
    }
    else if (this.suitChecker()) {
      this.hierarchy = heirarchies["Color"]
      let cards = [];
      var card;
      for (card in this.cards) {
        // console.log(this.cards[card].number)
        cards.push(this.cards[card].number)
      }
      cards.sort((a, b) => a - b);
      cards.reverse();
      this.hierarchyNumber = cards;
    }
    else if (this.pairChecker()) {
      this.hierarchy = heirarchies["Pair"]
    }
    else {
      this.hierarchy = heirarchies["HighCard"]
      let cards = [];
      var card;
      for (card in this.cards) {
        cards.push(this.cards[card].number)
      }
      cards.sort((a, b) => a - b)
      this.hierarchyNumber = cards.reverse();
    }
  }
}


// let l = [c4, c2, c3]
// let p = new Player()
// p.cards = l
// p.hierarchy_decider();
// console.log(p.cards)
// console.log(p.hierarchy,p.hierarchyNumber)


// let card1 = new Card("spade", 2);
// console.log(card1)

function winnerAction(winner) {
  // console.log("Winner function")
  if (winner != 0) {
    let t = `Player ${winner} wins`
    result.innerHTML = `<h3>${t}</h3>`
  } else {
    result.innerHTML = `<h3>Tie</h3>`
  }
}

class Game {
  constructor(gameType) {
    this.gameType = gameType;
    this.cardsDealt = gameTypes[gameType];
    this.P1 = new Player();
    this.P2 = new Player();
  }

  setCard(player_id, suit, num) {
    // appends card object to player of given player_id
    // inputs are player_id, suit code(0, 1, 2, 3) and num(2, 3, 4, 'a', 'k', 'q')
    if (player_id === 1) {
      if (this.P1.cards.length < this.cardsDealt) {
        let c1 = new Card(suit, num);
        // console.log(c1)
        // console.log("P1 Cards", this.P1.cards);
        this.P1.cards.push(c1)
        // console.log("P1 Cards", this.P1.cards);
      }
      else
        if (this.P2.cards.length < this.cardsDealt)
          //We can automatically switch to player 2
          console.log("Enter cards for player 2")
      // else
      //We can disable the enter button and activate the compare button
      // console.log("Initiate compare")
    }
    else if (player_id === 2) {
      if (this.P2.cards.length < this.cardsDealt) {
        let c1 = new Card(suit, num);
        // console.log(c1)
        // console.log("P2 Cards", this.P2.cards);
        this.P2.cards.push(c1)
        // console.log("P2 Cards", this.P2.cards);
      }
      else
        if (this.P1.cards.length < this.cardsDealt)
          // We can automatically switch to player 1
          console.log("Enter cards for player 1")
      // else
      //We can disable the enter button and activate the compare button
      // console.log("Initiate compare")
    }
    return true
  }

  gameType_Classic() {
    // console.log(this.P1)
    let p1 = [];
    p1.push(this.P1.hierarchy);
    let heirNum1 = this.P1.hierarchyNumber.values();
    for (const value of heirNum1) {
      p1.push(value)
      // console.log(p1)
    }
    // console.log(p1.length)
    let p2 = [];
    p2.push(this.P2.hierarchy);
    let heirNum2 = this.P2.hierarchyNumber.values();
    for (const value of heirNum2) {
      p2.push(value)
      // console.log(p2)
    }
    // console.log(p1.length)
    let p1Length = p1.length
    for (var i = 0; i < p1Length; i++) {
      // console.log("Entered Loop")
      if (p1[i] > p2[i]) {
        // console.log("p1 wins")
        winnerAction(1);
        return
      }
      else if (p1[i] < p2[i]) {
        // console.log("p2 wins")
        winnerAction(2);
        return
      }
    }
  }

  gameTypeMethodDecider() {
    if (this.gameType === "Classic")
      this.gameType_Classic();
  }

  compare() {
    if (this.P1.cards.length === this.cardsDealt && this.P2.cards.length === this.cardsDealt) {
      this.P1.hierarchy_decider();
      this.P2.hierarchy_decider();
      this.gameTypeMethodDecider();
    }
    else
      console.log("Enter More cards")
  }
}

// let testing_iterations = 2
// let s = [];
// for (k in suits) {
//   // console.log(k)
//   s.push(k);
// }
// let n = [];
// for (k in numbers) {
//   // console.log(k)
//   n.push(k);
// }
// for (let i = 0; i < testing_iterations; i++) {
//   let p1 = [];
//   let p2 = [];
//   let gT = "Classic"
//   let g = new Game(gT)
//   let cards = [];
//   for (var j = 0; j < 3; j++) {
//     let t = true
//     let suit = null
//     let num = null
//     while (t) {
//       suit = s[Math.floor(Math.random() * s.length)]
//       num = n[Math.floor(Math.random() * n.length)]
//       if (!cards.includes([suit, num])) {
//         cards.push([suit, num])
//         break
//       }
//       // console.log(1)
//     }
//     t = g.setCard(1, suit, num)
//     p1.push([suit, num])
//   }
//   for (var j = 0; j < 3; j++) {
//     let t = true
//     let suit = null
//     let num = null
//     while (t) {
//       suit = s[Math.floor(Math.random() * s.length)]
//       num = n[Math.floor(Math.random() * n.length)]
//       if (!cards.includes([suit, num])) {
//         cards.push([suit, num])
//         break
//       }
//       // console.log(2)
//     }
//     t = g.setCard(2, suit, num)
//     p2.push([suit, num])
//   }
//   console.log("Cards of Player 1:", p1);
//   console.log("Cards of Player 2:", p2);
//   g.compare()
// }
let p2suits = []
let p2num = []
let submit_2 = document.getElementById("submit_2")
submit_2.addEventListener("click", () => {
  for (let i = 0; i < 3; i++) {
    let k = i + 1
    p2suits[i] = document.getElementById("suit" + k + ".2").value;
    p2num[i] = document.getElementById("no" + k + ".2").value;
  }
})
compare.addEventListener("click", () => {
  chooser.classList.add("none");
  reset.classList.remove("none")
  let iter = 0;
  c1.src = `/Cards/${p1suits[iter]}/${p1num[iter] + p1suits[iter]}.png`
  c2.src = `/Cards/${p1suits[iter + 1]}/${p1num[iter + 1] + p1suits[iter + 1]}.png`
  c3.src = `/Cards/${p1suits[iter + 2]}/${p1num[iter + 2] + p1suits[iter + 2]}.png`
  c4.src = `/Cards/${p2suits[iter]}/${p2num[iter] + p2suits[iter]}.png`
  c5.src = `/Cards/${p2suits[iter + 1]}/${p2num[iter + 1] + p2suits[iter + 1]}.png`
  c6.src = `/Cards/${p2suits[iter + 2]}/${p2num[iter + 2] + p2suits[iter + 2]}.png`
  let gT = gameTyp.value;
  let g = new Game(gT)
  let cards = [];
  for (var j = 0; j < 3; j++) {
    let suit = null
    let num = null
    suit = p1suits[j]
    num = p1num[j]
    if (!cards.includes([suit, num])) {
      g.setCard(1, p1suits[j], p1num[j])
      cards.push([suit, num])
    } else {
      alert("Similar cards entered!")
    }
    suit = p2suits[j]
    num = p2num[j]
    if (!cards.includes([suit, num])) {
      g.setCard(2, p2suits[j], p2num[j])
      cards.push([suit, num])
    } else {
      alert("Similar cards entered!")
    }
  }
  console.log(cards)
  g.compare()

})
