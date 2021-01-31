const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.render("home")

})
app.get("/rules",function(req,res){
    res.render("rules")
})
app.get("/tellYourVariation",function(req,res){
    res.render("tellYourVariation")
})
app.get("/winprobability",function(req,res){
    res.render("winProbability")
})

app.get("/orignal",function(req,res){
    res.render("orignal")
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
  });