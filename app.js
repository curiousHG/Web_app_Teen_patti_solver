const game = require(__dirname+'/JS-logic/game.js')
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
"use strict";
const heirarchies = {
    "Trail": 6,
    "PureSeq": 5,
    "Seq": 4,
    "Color": 3,
    "Pair": 2,
    "HighCard": 1
}
const suits = {
    'S': 0,
    'H': 1,
    'D': 2,
    'C': 3
}
const numbers = {
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
const gameTypes = {
    'Classic': 3,
    'AK47': 3,
    'DiscardOne': 4
}

app.get("/", function (req, res) {
    res.render("home",{gameTypes:gameTypes,numbers:numbers,suits:suits})
})
app.post("/",function (req,res) {
    console.log(req.body);
  })
app.get("/rules", function (req, res) {
    res.render("rules")
})
app.get("/tellYourVariation", function (req, res) {
    res.render("tellYourVariation")
})
app.post("/tellYourVariation", function (req, res) {
    res.render("home")
})
app.get("/winprobability", function (req, res) {
    res.render("winProbability")
})

app.get("/orignal", function (req, res) {
    res.render("orignal",{gameTypes:gameTypes,numbers:numbers,suits:suits})
    // Object.keys(gameTypes).forEach(function(key){
    //     console.log(key,gameTypes[key])
    // })
    
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
const g = new game();
g.setCard();