const {check, body, validationResult} = require("express-validator");
const path = require("path");
var express = require('express');
var router = express.Router();


const productsMiddleware = {
    productCreateCheck : [
        body("nombre").trim().notEmpty().withMessage("Es necesario introducir un nombre al producto"),
        body("precioProducto").trim().notEmpty().withMessage("Es necesario introducir un precio al producto"),
        body("descripcionCorta").trim().notEmpty().withMessage("Es necesario introducir una descripcion corta al producto"),
        body("descripcionLarga").trim().notEmpty().withMessage("Es necesario introducir una descripcion larga al producto"),
        body("imagenProducto", "El producto debe tener una imagen").custom(function(value, {req}){
            if(req.files[0]){
                console.log(req.files)
                var extension = (path.extname(req.files[0].originalname)).toLowerCase();
                switch (extension) {
                    case '.jpg':
                        return true;
                        break;
                    case '.jpeg':
                        return true;
                        break;
                    case  '.png':
                        return true;
                        break;
                    default:
                        return false;
                        break;
                }
            }
            return false;
        })
    ],
    productEditCheck : [
        body("nombre").trim().notEmpty().withMessage("Es necesario introducir un nombre al producto"),
        body("precioProducto").trim().notEmpty().withMessage("Es necesario introducir un precio al producto"),
        body("descripcionCorta").trim().notEmpty().withMessage("Es necesario introducir una descripcion corta al producto"),
        body("descripcionLarga").trim().notEmpty().withMessage("Es necesario introducir una descripcion larga al producto"),
        body("imagenProducto", "La imagen debe tener un formato valido (jpg, jpeg o png)").custom(function(value, {req}){
            if(req.files[0]){
                var extension = (path.extname(req.files[0].originalname)).toLowerCase();
                switch (extension) {
                    case '.jpg':
                        return true;
                        break;
                    case '.jpeg':
                        return true;
                        break;
                    case  '.png':
                        return true;
                        break;
                    default:
                        return false;
                        break;
                }
            }
            return true;
        })
    ]
}


module.exports = productsMiddleware;