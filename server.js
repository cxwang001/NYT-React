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


// -------------------------------------------------

// Load HTML page (with ReactJS) in public/index.html
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});


// Components use this to query MongoDB for all saved articles
app.get('/api/saved', function(req, res) {
  console.log("Hit!");

  Article.find({}).sort([['date', 'descending']]).exec(function(err, doc){
      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

// Components will use this to save an article to the database
app.post('/api/saved', function(req, res){
  var newSaved = new Article(req.body);
 
  Article.create({"title": req.body.title, "date": req.body.date, "url": req.body.url}, function(err){
    if(err){
      console.log(err);
    }
    else {
      res.send("Saved Article");
    }
  })
});


// Components will use this to save an article to the database
app.delete('/api/saved/:id', function(req, res){
  Article.find({_id: req.params.id}).remove().exec(function(err){
    if(err){
      console.log(err);
    }
    else {
      res.send("Deleted Article");
    }
  })
});


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
