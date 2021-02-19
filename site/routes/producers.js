var express = require('express');
var router = express.Router();
const producersController = require("../controllers/producersController");
const producersMiddleware = require("../middlewares/producersMiddeware")
const {check, body, validationResult} = require("express-validator");
const multer = require('multer');
const path = require("path");
const productsController = require('../controllers/productsController');
const usersMiddleware = require('../middlewares/usersMiddeware');

var storage = multer.diskStorage({
	  destination:(req,file,cb)=>{
		  cb(null,'public/images/producersLogos');
	  },
	  filename:(req,file,cb)=>{
		  cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		}
    });
var upload = multer({storage:storage});

//Listar productores
router.get('/listado', usersMiddleware.isLogged, usersMiddleware.isAdmin, producersController.list)


//Mostrar para crear
router.get('/registro', usersMiddleware.isLogged, usersMiddleware.isAdmin, producersController.viewRegister);

//Guardar Productor
router.post('/registro', usersMiddleware.isLogged, usersMiddleware.isAdmin, upload.any(), producersMiddleware.registerValidation, producersController.register);

//Mostrar para editar
router.get('/editar/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin, producersController.viewEditRegister);

//Editar productor
router.post('/editar/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin, upload.any(), producersMiddleware.producerEditCheck, producersController.edit);

//Eliminar productor
router.get('/eliminar/:id', usersMiddleware.isLogged, usersMiddleware.isAdmin, producersController.delete)


module.exports = router;
