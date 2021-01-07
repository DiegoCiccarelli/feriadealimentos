const fs = require("fs");
const path = require("path");
const db = require("../database/models/index")
const bcrypt = require("bcryptjs"); 
const { validationResult } = require("express-validator");



const producersController = {
    viewRegister : function(req, res, next){
        res.render('producer/register');
    },
    register : function(req, res, next){
        const errors = validationResult(req)
        if(!errors.isEmpty()){

            console.log(errors)
            res.render("producer/register", {errors : errors.errors, datos : req.body})
        }else{
        let logotipo = null;
        if(typeof req.files[0] != "undefined"){
        logotipo = req.files[0].filename
        }
        db.Producer.create({
            nombre_productor: req.body.nombreProductor,
            apellido_productor: req.body.apellido,
            email_productor: req.body.email,
            domicilio_productor: req.body.domicilio,
            logotipo: logotipo,
            telefono_productor: req.body.telefono,
            nombre_emprendimiento: req.body.nombreEmprendimiento,
            descripcion_productor: req.body.descripcion
            
        }).then(function(){
            res.send('se ha creado con exito el productor: ' + req.body.nombreProductor);
        })
    }
    },
    
    

};

module.exports = producersController;