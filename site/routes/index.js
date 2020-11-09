var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET listado productos. */
router.get('/listado-productos', function(req, res, next) {
  res.render('product/listado-producto');
});

/* GET Carrito. */
router.get('/carrito', function(req, res, next) {
  res.render('product/carrito');
});


/* GET Detalle producto. */
router.get('/detalleProducto', function(req, res, next) {
  res.render('product/detalleProducto');
});


/* GET register. */
router.get('/register', function(req, res, next) {
  res.render('user/register');
});

/* GET login. */
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

/* GET header. 
router.get('/header', function(req, res, next) {
  res.render('header');
});*/

module.exports = router;
