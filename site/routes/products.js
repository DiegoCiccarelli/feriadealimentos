var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");
const path = require("path");
const multer = require('multer');
var storage = multer.diskStorage({
	  destination:(req,file,cb)=>{
		  cb(null,'public/images/productsImages');
	  },
	  filename:(req,file,cb)=>{   
		  cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	  }
    });
var upload = multer({storage:storage});

/* GET listado productos. */
router.get('/listadoProductos', productsController.productList);

  /* GET Carrito. */
router.get('/carrito', productsController.cart);

router.get('/detalleProducto', productsController.productDetail);

router.get('/productoNuevo', productsController.newProduct);
router.post('/productoNuevo', upload.any(), productsController.createProduct)

// router.get('/productoEditar', productsController.editProduct);

module.exports = router;