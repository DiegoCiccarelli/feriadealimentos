const {check, body, validationResult} = require("express-validator");
const path = require("path");
var express = require('express');
var router = express.Router();


const productsMiddleware = {
    checkForm : [
        body("nombre").notEmpty().withMessage("Es necesario introducir un nombre al producto"),
        body("precioProducto").notEmpty().withMessage("Es necesario introducir un precio al producto"),
        body("descripcionCorta").notEmpty().withMessage("Es necesario introducir una descripcion corta al producto"),
        body("descripcionLarga").notEmpty().withMessage("Es necesario introducir una descripcion larga al producto"),
        body("imagenProducto").custom(function(value, {req}){
            if(typeof req.files[0].originalname == "undefined"){
                return false;
            } else{
                var extension = (path.extname(req.files[0].originalname)).toLowerCase();
                switch (extension) {
                    case '.jpg':
                        return true;
                    case '.jpeg':
                        return true;
                    case  '.png':
                        return true;
                    default:
                        return false;
                }
            }
        })
    ]
}


module.exports = productsMiddleware;