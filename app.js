//ver-6

const express = require("express");
const bodyParser = require("body-parser");

let itss = [];
let workitems = [];
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    res.render("lists", {listTitle: day, newListItem: itss});
});

app.post("/",function(req,res){
    let iteee = req.body.newItem;
    if(req.body.pge === "work")
    {
        workitems.push(iteee);
        res.redirect("/work");
    }
    else{
        itss.push(iteee);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("lists", {listTitle: "Work List", newListItem: workitems});
});

app.post("/work",function(req,res){
    workitems.push(req.body.newItem);
    res.redirect("/work");
});

app.listen(3000, function(){
    console.log("server started running");
});