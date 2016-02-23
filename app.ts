var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


//mongoose.connect('mongodb://localhost/tododb');
mongoose.connect("mongodb://biloko:pass@ds015508.mongolab.com:15508/edo_db1");

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/images'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override

var port = 8080;

module.exports = app;

todo = mongoose.model("todo", { tekst: String, korisnik_id: String});
korisnik = mongoose.model("korisnik", { username: String, password: String, profilna: Buffer});

require("./rutiranje")(app);

app.get('/bower_components/angular-xeditable/dist/css/xeditable.css', function(req, res, next)
{
  return res.sendFile("bower_components/angular-xeditable/dist/css/xeditable.css");
});

app.listen(port);
console.log("Pokrenut server na localhost:" + port);
