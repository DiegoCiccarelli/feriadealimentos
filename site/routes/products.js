var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");

/* GET listado productos. */
router.get('/listadoProductos', productsController.productList);

  /* GET Carrito. */
router.get('/carrito', productsController.cart);

router.get('/detalleProducto', productsController.productDetail);

router.get('/productoNuevo', productsController.newProduct);

router.get('/productoEditar', productsController.editProduct);

module.exports = router;