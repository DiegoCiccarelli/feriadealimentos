var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET footer. 
router.get('/footer', function(req, res, next) {
  res.render('footer');
});*/

/* GET listado productos. */
router.get('/listado-productos', function(req, res, next) {
  res.render('listado-producto');
});

/* GET Carrito. */
router.get('/carrito', function(req, res, next) {
  res.render('carrito');
});


/* GET Detalle producto. */
router.get('/detalleProducto', function(req, res, next) {
  res.render('product/detalleProducto');
});


/* GET register. */
router.get('/registro', function(req, res, next) {
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
