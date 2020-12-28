const fs = require("fs");
const path = require("path");
const db = require("../database/models/index")
const bcrypt = require("bcryptjs"); 
const { validationResult } = require("express-validator");


const usersController = {
    verRegister : function(req, res, next){
        res.render('user/register');
    },
    register : function(req, res, next){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors)
            res.render("user/register", {errors : errors.errors})
        }else{
        let avatar = req.files[0].filename
        db.User.create({
            nombre_usuario: req.body.nombre,
            apellido_usuario: req.body.apellido,
            email_usuario: req.body.email,
            telefono_usuario: req.body.telefono,
            contrasena: bcrypt.hashSync(req.body.pass,10),
            dni: req.body.dni,
            calle: req.body.calle,
            altura: req.body.altura,
            piso: req.body.piso,
            departamento: req.body.departamento,
            barrio: req.body.barrio,
            localidad: req.body.localidad,
            provincia: req.body.provincia,
            pais: req.body.pais,
            avatar: avatar,
            tipo_usuario: "cliente",
        }).then(function(){
            res.send('se ha creado con exito el usuario: ' + req.body.nombre);
        })
    }
    },
    login : function(req, res, next) {
        res.render('user/login');
    }
};

module.exports = usersController;