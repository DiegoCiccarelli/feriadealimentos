var express = require('express');
var router = express.Router();
const producersController = require("../controllers/producersController");
const producersMiddleware = require("../middlewares/producersMiddeware")
const {check, body, validationResult} = require("express-validator");
const multer = require('multer');
const path = require("path");
var storage = multer.diskStorage({
	  destination:(req,file,cb)=>{
		  cb(null,'public/images/producersLogos');
	  },
	  filename:(req,file,cb)=>{
		  cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		}
    });
var upload = multer({storage:storage});

router.get('/registro', producersController.viewRegister);

router.post('/registro', upload.any(), producersMiddleware.registerValidation, producersController.register);


module.exports = router;
