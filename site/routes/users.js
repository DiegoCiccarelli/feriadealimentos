var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const usersMiddleware = require("../middlewares/usersMiddeware")
const {check, body, validationResult} = require("express-validator");
const multer = require('multer');
const path = require("path");
var storage = multer.diskStorage({
	  destination:(req,file,cb)=>{
		  cb(null,'public/images/userAvatar');
	  },
	  filename:(req,file,cb)=>{
		  cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		}
    });
var upload = multer({storage:storage});


router.get('/registro', usersController.viewRegister);
router.post('/registro', upload.any(), usersMiddleware.registerValidation, usersController.register);

router.get('/login', usersController.viewLogin);

router.post('/login', usersController.login);

router.get('/perfil', usersMiddleware.isLogged, usersController.viewEdit);
router.post('/perfil', upload.any(), usersMiddleware.editValidation, usersController.edit);

module.exports = router;
