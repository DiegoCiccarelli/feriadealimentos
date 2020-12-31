const {check, body, validationResult} = require("express-validator");
const path = require("path");
const db = require("../database/models/index")
var express = require('express');
var router = express.Router();
// traemos bcrypt para validar usuario login
const bcrypt = require("bcryptjs"); 


const usersMiddleware = {
    registerValidation : [
        body("apellido").notEmpty().withMessage("Debe ingresar un apellido"),
        body("nombre").notEmpty().withMessage("Debe ingresar un nombre"),
        body("email").notEmpty().normalizeEmail().isEmail().withMessage("Debe ingresar un email válido"),
        body("email").custom(function(value){
            db.User.findOne({where : {email_usuario : value}}).then(function(resultado){
                if(resultado == null){
                    return true
                }else{
                    return false
                }
            })
        }),
        body("pass").notEmpty().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").withMessage("Debe ingresar una contraseña con un minimo de 8 caracteres, una minuscula, una mayuscula y un caracter especial"),
        body("repeatPass", "Las contraseñas deben coincidir").notEmpty().custom(function(value, {req}){
            if(value == req.body.pass){
                return true
            } else{
                return false
            }
        }),
        body("calle").notEmpty().withMessage("Debe ingresar una calle"),
        body("altura").notEmpty().withMessage("Debe ingresar una altura"),
        body("barrio").notEmpty().withMessage("Debe ingresar un barrio"),
        body("localidad").notEmpty().withMessage("Debe ingresar una localidad"),
        body("avatar", "Debe ingresar una imagen válida").custom(function(value, {req}){
            if(typeof req.files[0] == "undefined"){
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
    ],

    loginValidation: function(req, res, next){
        //buscamos si el mail existe o sea el usuario en BD
        db.User.findOne({where : {email_usuario : req.body.email}}).then(function(result){
            if(result){
                // si existe comprobamos contraseña encriptada
               // console.log("se encontro el mail");
                //console.log(result.contrasena);
                let bdPassword = result.contrasena;
                console.log(bdPassword)    
                if(req.body.pwd == bdPassword){
                //if(bcrypt.compareSync(req.body.pwd, bdPassword)){
                    console.log("NEXXXT");
                    next();
                }else{
                    console.log("contraseña no válida");
                }
                // return true;
            }else{
                console.log("no se encontro el mail");
                return false;
            }
        })

    }
        
        
       
    ,

}


module.exports = usersMiddleware;