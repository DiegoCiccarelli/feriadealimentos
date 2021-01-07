const {check, body, validationResult} = require("express-validator");
const path = require("path");
const db = require("../database/models/index")
var express = require('express');
var router = express.Router();
const { Session } = require("inspector");


const producersMiddleware = {
    registerValidation : [
        body("apellido").notEmpty().withMessage("Debe ingresar un apellido"),
        body("nombreProductor").notEmpty().withMessage("Debe ingresar un nombre"),
        // body("email").notEmpty().normalizeEmail().isEmail().withMessage("Debe ingresar un email válido"),
        // body("email").custom(function(value){
        //     return db.Producer.findOne({where : {email_productor : value}}).then(function(resultado){
        //         if(resultado){
        //             return Promise.reject("El email ya está en uso")
        //         }
        //     })
        // }),

        body("nombreEmprendimiento").notEmpty().withMessage("Debe ingresar un domicilio"),
        // body("logotipo", "Debe ingresar una imagen válida").custom(function(value, {req}){
        //     if(typeof req.files[0] == "undefined"){
        //         return true;
        //     } else{
        //         var extension = (path.extname(req.files[0].originalname)).toLowerCase();
        //         switch (extension) {
        //             case '.jpg':
        //                 return true;
        //             case '.jpeg':
        //                 return true;
        //             case  '.png':
        //                 return true;
        //             default:
        //                 return false;
        //         }
        //     }
        // })
    ],

   
}



module.exports = producersMiddleware;