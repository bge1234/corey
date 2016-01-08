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

router.get('/new', function(req, res){
  res.render('new');
})

router.post('/new', function(req, res){
  console.log(req.body)
})


module.exports = router;
