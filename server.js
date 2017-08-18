// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//Require Article Schema
var Article = require('./models/article.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; 

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration configuration
if(process.env.NODE_ENV == "production"){
    mongoose.connect("mongodb://heroku_gkgcs28f:gjbfij925t97ut20umu8d3s16i@ds151163.mlab.com:51163/heroku_gkgcs28f")
} else{
mongoose.connect('mongodb://localhost/nytreact');
}

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

//Require Article Schema
var Article = require('./models/article.js');

// -------------------------------------------------

var router = require('./controllers/controller.js');
app.use('/', router);


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
