let testing_iterations = 2
let s = [];
for (k in suits) {
    // console.log(k)
    s.push(k);
}
let n = [];
for (k in numbers) {
    // console.log(k)
    n.push(k);
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
            // console.log(1)
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
            // console.log(2)
        }
        t = g.setCard(2, suit, num)
        p2.push([suit, num])
    }
    console.log("Cards of Player 1:", p1);
    console.log("Cards of Player 2:", p2);
    g.compare()
}