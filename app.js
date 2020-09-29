// SETTING UP EXPRESS AND BODY-PARSER

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const port = 3000;
const app = express();

const items = ["Buy food", "Coock food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//-----    GET "/"   -----//
app.get("/", function(req, res) {

  let day = date.getDate();
  console.log(day);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

//-----    POST "/"   -----//
app.post("/", function(req, res) {

  let item = req.body.newItem;

  if (req.body.btnNewItem === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

//-----    GET "/work"   -----//
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems

  });
});

//-----    POST "/work"   -----//
app.post("/work", function(req, res) {
  let item = req.body.newItem;

  workItems.push(workItems);

  res.redirect("/work");

});

//-----    GET "/about"   -----//
app.get("/about", function(req, res) {
  res.render("about");

});


//-----    SERVER LISTENING   -----//
app.listen(port, function() {
  console.log("Server is running on port :" + port);

});
