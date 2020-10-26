var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/footer', function(req, res, next) {
  res.render('footer', { title: 'footer' });
});

/* GET home page. */
router.get('/listado-productos', function(req, res, next) {
  res.render('listado-producto');
});

/* GET home page. */
router.get('/carrito', function(req, res, next) {
  res.render('carrito');
});


module.exports = router;
