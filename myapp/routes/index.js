var express = require('express');
var router = express.Router();
var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://localhost/restaurants'
});

function getZagat() {
  return knex('zagat')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getZagat().select().then(function(result){
    res.render('index', {zagat: result})
  })
});



module.exports = router;
