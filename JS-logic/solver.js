const { Player, player1, player2 } = require("./player")
const { Card } = require("./card")
const { heirarchies, suits, numbers, gameTypes } = require("./details")

function winnerAction(winner) {
    console.log("Winner function")
    if (winner != 0)
        console.log("Player", winner, "won.")
    else
        console.log("Tie")
}

class Game {
    constructor(gameType) {
        this.gameType = gameType;
        this.cardsDealt = gameTypes[gameType];
        this.P1 = player1
        this.P2 = player2
    }

    setCard(player_id, suit, num) {
        // appends card object to player of given player_id
        // inputs are player_id, suit code(0, 1, 2, 3) and num(2, 3, 4, 'a', 'k', 'q')
        if (player_id === 1) {
            if (this.P1.cards.length < this.cardsDealt) {
                let c1 = new Card(suit, num);
                console.log(c1)
                console.log("P1 Cards", this.P1.cards);
                this.P1.cards.push(c1)
                console.log("P1 Cards", this.P1.cards);
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
                console.log(c1)
                console.log("P2 Cards", this.P2.cards);
                this.P1.cards.push(c1)
                console.log("P2 Cards", this.P2.cards);
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
        console.log(this.P1)
        let p1 = [];
        p1.push(this.P1.hierarchy, this.P1.hierarchyNumber);
        let p2 = [];
        p2.push(this.P2.hierarchy, this.P2.hierarchyNumber);
        for (var i; i < p1.length; i++) {
            if (p1[i] > p2[i]) {
                winnerAction(1);
                return
            }
            else if (p1[i] < p2[i]) {
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

let testing_iterations = 2
let s = [];
for (k in suits) {
    // console.log(k)
    s.push(suits[k]);
}
let n = [];
for (k in numbers) {
    // console.log(k)
    n.push(numbers[k]);
}
for (let i = 0; i < testing_iterations; i++) {
    let p1 = [];
    let p2 = [];
    let gT = "Classic"
    let g = new Game(gT)
    let cards = [];
    for (var j = 0; j < 3; j++) {
        let t = true
        let suit = null
        let num = null
        while (t) {
            suit = s[Math.floor(Math.random() * s.length)]
            num = n[Math.floor(Math.random() * n.length)]
            if (!cards.includes([suit, num])) {
                cards.push([suit, num])
                break
            }
            console.log(1)
        }
        t = g.setCard(1, suit, num)
        p1.push([suit, num])
    }
    for (var j = 0; j < 3; j++) {
        let t = true
        let suit = null
        let num = null
        while (t) {
            suit = s[Math.floor(Math.random() * s.length)]
            num = n[Math.floor(Math.random() * n.length)]
            if (!cards.includes([suit, num])) {
                cards.push([suit, num])
                break
            }
            console.log(2)
        }
        t = g.setCard(2, suit, num)
        p2.push([suit, num])
    }
    console.log("Cards of Player 1:", p1);
    console.log("Cards of Player 2:", p2);
    g.compare()
}
