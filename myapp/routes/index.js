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

router.post('/', function(req, res, next){
  res.redirect('/')
});

router.post('/new', function(req, res){
  var items = {
    name: req.body.name,
    type: req.body.type,
    location: req.body.location,
    rating: req.body.rating,
    state: req.body.state,
    image: req.body.image,
    description: req.body.description
  }
  getZagat().insert(items).then(function(results){
    res.redirect('/')
  });
})


module.exports = router;
