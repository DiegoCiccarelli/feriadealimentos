const {check, body, validationResult} = require("express-validator");
const path = require("path");
var express = require('express');
var router = express.Router();


const usersMiddleware = {
    registerValidation : [
        body("apellido", "Debe ingresar un apellido").notEmpty(),
        body("nombre", "Debe ingresar un nombre").notEmpty(),
        body("email", "Debe ingresar un email válido").notEmpty().normalizeEmail().isEmail(),
        body("pass", "Debe ingresar una contrasena con un minimo de 8 caracteres, una minuscula, una mayuscula y un caracter especial").notEmpty().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
        body("repeatPass", "Las contraseñas deben coincidir").notEmpty().custom(function(value, {req}){
            if(value == req.body.pass){
                return true
            } else{
                return false
            }
        }),
        body("calle", "Debe ingresar una calle").notEmpty(),
        body("altura", "Debe ingresar una altura").notEmpty(),
        body("barrio", "Debe ingresar un barrio").notEmpty(),
        body("localidad", "Debe ingresar una localidad").notEmpty(),
        body("avatar").custom(function(value, {req}){
            if(typeof req.files[0].originalname == "undefined"){
                return true;
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


module.exports = usersMiddleware;