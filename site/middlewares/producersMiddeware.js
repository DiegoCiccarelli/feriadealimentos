const {check, body, validationResult} = require("express-validator");
const path = require("path");
const db = require("../database/models/index")
var express = require('express');
var router = express.Router();
const { Session } = require("inspector");



const producersMiddleware = {
    registerValidation : [
        body("apellido").trim().notEmpty().withMessage("Debe ingresar un apellido"),
        body("nombreProductor").trim().notEmpty().withMessage("Debe ingresar un nombre"),
        body("email").trim().notEmpty().normalizeEmail().isEmail().withMessage("Debe ingresar un email válido"),
        body("email").custom(function(value){
            return db.Producer.findOne({where : {email_productor : value, estado_productor : 1}})
            .then( resultado => {
                if(resultado){
                    return Promise.reject("El email ya está en uso")
                }
            })
        }),
        body("nombreEmprendimiento").trim().notEmpty().withMessage("Debe ingresar un domicilio"),
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
    ],
    producerEditCheck: [
        body("apellido").trim().notEmpty().withMessage("Debe ingresar un apellido"),
        body("nombreProductor").trim().notEmpty().withMessage("Debe ingresar un nombre"),
        body("email").trim().notEmpty().normalizeEmail().isEmail().withMessage("Debe ingresar un email válido"),
        body("email").custom(function(value, {req}){
        return db.Producer.findOne({where : {email_productor : value, estado_productor : 1}})
            .then( resultado => {
                if(resultado){
                    if(resultado.id == req.params.id){
                        return Promise.resolve("Se mantiene el email")
                    } else{
                        return Promise.reject("El email ya está en uso")
                    }
                } else{
                    return Promise.resolve("Se actualizara el mail")
                }
            })
        }),
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



module.exports = producersMiddleware;