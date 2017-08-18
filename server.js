// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//Require Article Schema
var Article = require('./models/article.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect('mongodb://localhost/nytreact');

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

// We will call this route the moment our page gets rendered
// Components use this to query MongoDB for all saved articles
app.get('/api/saved', function(req, res) {
  console.log("Hit!");

  // Find all the records, sort it in descending order for publish date
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
  // console.log("BODY: " + req.body.title);

  // Save article based on the JSON input. 
  // We'll use Date.now() to always get the current date time
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
