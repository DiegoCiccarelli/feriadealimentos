var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET footer. */
router.get('/footer', function(req, res, next) {
  res.render('footer', { title: 'footer' });
});

/* GET listado productos. */
router.get('/listado-productos', function(req, res, next) {
  res.render('listado-producto');
});

/* GET home page. */
router.get('/carrito', function(req, res, next) {
  res.render('carrito');
});


/* GET Detalle producto. */
router.get('/detalleProducto', function(req, res, next) {
  res.render('detalleProducto');
});


/* GET Detalle producto. */
router.get('/registro', function(req, res, next) {
  res.render('register');
});

/* GET Detalle producto. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET Detalle producto. */
router.get('/header', function(req, res, next) {
  res.render('header');
});


module.exports = router;
