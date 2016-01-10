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
  res.render('new', {title: 'New Restaurant', formTitle: 'create restaurant'});
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
});

router.get('/show/:id', function(req, res){
  getZagat().where('id', req.params.id).first().then(function(result){
    res.render('show', {zagat: result})
  });
});

router.get('/edit/:id', function(req, res){
  getZagat().where('id', req.params.id).first().then(function(result){
    res.render('new', {title: result.name + ' Info', formTitle: "edit restaurant", name: result.name, location: result.location, state: result.state, type: result.type, image: result.image, description: result.description});
  });
});

router.post('/edit/:id', function(req, res) {
  getZagat().where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/')
  });
});

router.get('/:id/delete', function (req, res) {
  getZagat().where('id', req.params.id).del().then(function (result) {
    res.redirect('/');
  })
})

module.exports = router;
