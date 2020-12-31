var express = require('express');
var router = express.Router();
const usersControllers = require("../controllers/usersController");
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

router.get('/registro', usersControllers.verRegister);
router.post('/registro', upload.any(), usersMiddleware.registerValidation, usersControllers.register);

router.get('/login', usersControllers.login);

router.post('/login', usersMiddleware.loginValidation, usersControllers.createSession);

module.exports = router;
