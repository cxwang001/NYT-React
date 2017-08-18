// Node Dependencies
var express = require("express");
var router = express.Router();


// Import the Article model
var Article = require("../models/article.js");



// Main GET - This will display the ReactJS application.

router.get("/", function(req, res){
  res.sendFile("./public/index.html");
});


// Components use this to query MongoDB for all saved articles
router.get("/api/saved", function(req, res) {
  console.log("Hit!");

  Article.find({}).sort([["date", "descending"]]).exec(function(err, doc){
      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

// Components will use this to save an article to the database
router.post("/api/saved", function(req, res){
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
router.delete("/api/saved/:id", function(req, res){
  Article.find({_id: req.params.id}).remove().exec(function(err){
    if(err){
      console.log(err);
    }
    else {
      res.send("Deleted Article");
    }
  })
});

module.exports = router;