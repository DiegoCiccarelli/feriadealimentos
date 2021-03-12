const fs = require("fs");
const path = require("path");
const db = require("../database/models/index")
const bcrypt = require("bcryptjs"); 
const { validationResult } = require("express-validator");



const producersController = {
    viewRegister : function(req, res, next){
        res.render('producer/register');
    },

    viewEditRegister : function(req, res, next){
        db.Producer.findOne({where : {id:req.params.id, estado_productor : 1}}).then(resultado => {
            if(resultado == null){
                res.send("No se ha encontrado un productor con el id: " + req.params.id)
            } else{
                res.render('producer/producerEdit', {producer: resultado})
            }
        })
    },
   
    register : function(req, res, next){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render("producer/register", {errors : errors.errors, data : req.body})
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
            descripcion_productor: req.body.descripcion,
            estado_productor: 1
        }).then(function(){
            //res.send('se ha creado con exito el productor: ' + req.body.nombreProductor);
            res.redirect('/productores/listado');
            })
        }
    },
    
    list : function(req,res){
        db.Producer.findAll({where : {estado_productor : 1}}).then(resultado => {
            console.log(resultado)
            res.render("producer/producerList", {producer : resultado})
        })
    },

    edit: function(req, res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.body.id = req.params.id
            res.render("producer/producerEdit", {errors : errors.errors, data : req.body})

        }else{
            if(typeof req.files[0] != "undefined"){
            db.Producer.update({
                logotipo: req.files[0].filename
                }, 
                {
                    where : {id:req.params.id}
                }).then( () => Promise.resolve("Se ha subido la imagen"))
            }
        

        db.Producer.update({
            nombre_productor: req.body.nombreProductor,
            apellido_productor: req.body.apellido,
            email_productor: req.body.email,
            domicilio_productor: req.body.domicilio,
            telefono_productor: req.body.telefono,
            nombre_emprendimiento: req.body.nombreEmprendimiento,
            descripcion_productor: req.body.descripcion
        }, {where : {id:req.params.id}}).then(()=>{
            res.redirect('/productores/listado')
        });

        }
    },

    delete: function(req, res){
    db.Producer.update({estado_productor : 0},{where:{id:req.params.id}})
    .then( () => {
        res.redirect('/productores/listado')
    }
    )}
    

};

module.exports = producersController;