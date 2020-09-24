// SETTING UP EXPRESS AND BODY-PARSER

const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

let items = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//GET
app.get("/", function(req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });
});

// POST
app.post("/", function(req, res) {
  let item = req.body.newItem;

  items.push(item);

  res.redirect("/");
});



app.listen(port, function() {
  console.log("Server is running on port :" + port);

});
