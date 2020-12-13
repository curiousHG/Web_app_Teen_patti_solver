// import { Game } from "JS-logic/solver.js";
document.getElementById("Start").addEventListener("click",startGame);

function startGame(){
    alert("Hello")
    // document.getElementById("Setcard").addEventListener("click",setCard);
    // var gamesnumber = document.getElementsByName("gameTypes").length();
    // for (let i = 0;i<gamesnumber;i++){
        
    // }
    var game = new Game("Classic");
    alert(game.P1)
}

function setCard(){
    var suit = document.getElementsByName
}