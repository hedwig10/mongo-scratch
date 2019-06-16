var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newscraper";

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

var db = mongoose.connection;
db.on("error", function(err){
  console.log("Mongoose error: --=--" + err);
})
db.once("Open", function() { 
  console.log("Mongoose has connected succesfully.");
});

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"})
);
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`)
})