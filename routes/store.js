var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('reacordsalt.sqlite3');

  var posts = [];
    var fslevel = [];
    db.serialize(function() {

    });

  db.serialize(function() {
    db.each("SELECT * FROM item order by fname asc;", function(err, row)
        {
            posts.push({fname: row.fname, saltlevel: row.saltlevel});
         // posts.push({floglevel: row[1].loglevel})

        }, function() {
        db.each("select * from log where logdate = date();", function (err, rows) {
            fslevel.push({fslevel: rows});
            console.log(rows)
        });

    

        // All done fetching records, render response
                res.render('index', { title: 'Record Salt intake', menuitem: posts,fslevel: fslevel});
            });

                        });
  db.close();

});

module.exports = router;
