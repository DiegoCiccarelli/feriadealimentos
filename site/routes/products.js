var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");
const cartController = require("../controllers/cartController")
const productsMiddleware = require("../middlewares/productsMiddleware");
const {check, body, validationResult} = require("express-validator");

const path = require("path");
const multer = require('multer');
const usersMiddleware = require('../middlewares/usersMiddeware');
const { usersQuantity } = require('../controllers/api/apiController');
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

/* GET detalle de un producto */
router.get('/detalleProducto/:id', productsController.productDetail);

router.get('/productoNuevo', usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.newProduct);

router.post('/productoNuevo', usersMiddleware.isLogged, usersMiddleware.isAdmin, upload.any(),productsMiddleware.productCreateCheck, productsController.createProduct);

router.get('/listadoProductosAdmin', usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.productListAdmin);

/* GET carga de formulario con datos para edicion de producto */
router.get('/productoEditar/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.showProductEdit);

/*Post guardar producto editado */
router.post('/productoEditar/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin, upload.any(), productsMiddleware.productEditCheck, productsController.productEdit);

router.get('/productDelete/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin,  productsController.productDelete) 

router.get("/listadoCategorias", usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.listadoCategorias)
router.get('/crearCategoria', usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.viewCreateCategory)
router.post('/crearCategoria', usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.createCategory)
router.get('/editarCategoria/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.viewCreateCategory)
router.post('/editarCategoria/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.createCategory)
router.get('/eliminarCategoria/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin, productsController.deleteCategory)

/* Carrito */
router.get('/carrito', usersMiddleware.isLogged, cartController.viewCart);
router.post("/agregarcarrito", usersMiddleware.isLogged, cartController.addCart)


module.exports = router;