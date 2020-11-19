var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET listado productos. */
router.get('/listadoProductos', function(req, res, next) {
  res.render('product/productList');
});

/* GET Carrito. */
router.get('/carrito', function(req, res, next) {
  res.render('product/cart');
});


/* GET Detalle producto. */
router.get('/detalleProducto', function(req, res, next) {
  res.render('product/productDetail');
});


/* GET register. */
router.get('/registro', function(req, res, next) {
  res.render('user/register');
});

/* GET login. */
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

/* GET Producto Nuevo */
router.get('/productoNuevo', function(req, res, next) {
  res.render('product/productCreateEdit');
});

/* GET Producto Editar */
router.get('/productoEditar', function(req, res, next) {
  res.render('product/productCreateEdit');
});


module.exports = router;
