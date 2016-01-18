var express = require('express');
var router = express.Router();
var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://localhost/restaurants'
});

function getZagat() {
  return knex('zagat')
}
function getEmployees(){
  return knex('employees')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getZagat().select().then(function(result){
    res.render('index', {zagat: result})
  })
});

// renders the add a new restaurant form page
router.get('/new', function(req, res){
  res.render('new', {title: 'New Restaurant', formTitle: 'create restaurant'});
})


router.post('/', function(req, res){
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
    res.render('edit', {title: result.name + ' Info', formTitle: "edit restaurant", zagat: result, description: result.description, rating: result.rating});
  });
});


router.post('/edit/:id', function(req, res) {
  getZagat().where('id', req.params.id).update(req.body).then(function(result){
    res.redirect('/')
  });
});

router.get('/:id/delete', function (req, res) {
  getZagat().where('id', req.params.id).del().then(function (result) {
    res.redirect('/');
  })
})

router.get('/admin', function(req, res){
   getZagat().then(function(result){
     getEmployees().then(function(resultE){
       res.render('admin', {zagat: result, employees: resultE})
     })
   })
})

router.get('/new_employee/:id', function(req, res){
   getZagat().where('id', req.params.id).first().then(function(result){
     console.log(result)
     res.render('new_employee', {zagat: result})
   })
 })

router.post('/new_employee/:id', function(req, res){
  var items = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    zagat_id: req.params.id
  }
  getEmployees().insert(items).then(function(result){
    res.redirect('/admin')
  })

})





//knex.select('zagat.id','zagat.name','employees.first_name', 'employees.last_name','employees.zagat_id').from('zagat').rightJoin('employees', 'zagat.id','employees.zagat_id')


module.exports = router;
