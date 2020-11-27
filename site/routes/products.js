var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");
const productsMiddleware = require("../middlewares/productsMiddleware");
const {check, body, validationResult} = require("express-validator");

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

/* GET detalle de un producto */
router.get('/detalleProducto/:id', productsController.productDetail);

router.get('/productoNuevo', productsController.newProduct);
router.post('/productoNuevo', upload.any(), productsMiddleware.checkForm, productsController.createProduct);

router.get('/listadoProductosAdmin', productsController.productListAdmin);

/* GET carga de formulario con datos para edicion de producto */
router.get('/productoEditar/:id', productsController.showProductEdit);

/*Post guardar producto editado */
router.post('/productoEditar/:id', productsController.productEdit);


module.exports = router;