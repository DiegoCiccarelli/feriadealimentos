const fs = require("fs");
const path = require("path");
const db = require("../database/models/index")
const bcrypt = require("bcryptjs"); 
const { validationResult } = require("express-validator");



const usersController = {
    viewRegister : function(req, res, next){
        res.render('user/register');
    },
    register : function(req, res, next){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render("user/register", {errors : errors.errors, datos : req.body})
        }else{
        let avatar = null;
        if(typeof req.files[0] != "undefined"){
        avatar = req.files[0].filename
        }
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
            res.redirect('/usuarios/login');
        })
    }
    },
    
    viewLogin : function(req, res, next) {
        //console.log("en get de login" + req.session.email);
        res.render('user/login');

    },
    //Login de Usuario
    login: function(req, res, next){
        //buscamos si el mail existe o sea el usuario en BD
        db.User.findOne({where : {email_usuario : req.body.email}}).then(function(result){
            if(result){
                // si existe comprobamos contraseña encriptada
                
                if(bcrypt.compareSync(req.body.pwd, result.contrasena)){
                    
                    //creamos la session y seteamos el email
                    req.session.email = req.body.email;

                    // si es admin creo el valor en session admin true
                   console.log(result.tipo_usuario);
                    if (result.tipo_usuario=="admin"){
                        req.session.admin = true;
                    }else{
                        req.session.admin = false;
                    }
                    
                    // si eligió recuérdame seteamos la cookie
                    if(req.body.rememberMe){
                        //seteo cookie a un año
                        res.cookie("userFeria", req.body.email, { expires: new Date(Date.now() + 31536000000)});
                    };

                    res.redirect("/");
               
                }else{
                    
                    return res.render("user/login", { errorMessage : "Email o contraseña incorrecta",
                                                datos: req.body});
                    

                };
               
            }else{
                return res.render("user/login", { errorMessage : "Email o  contraseña incorrecta",
                                                datos: req.body});
                
            }
        })

    },

    viewEdit: function(req, res, next){

        //console.log("llego");
       //console.log(req.session.email);
        db.User.findOne({where : {email_usuario: req.session.email}}).then(function(result){
            //console.log(result);
            if(result == null){
                 return res.send("Algo salio mal: ")
              } else{
                 console.log("else!!");
                 return res.render('user/userViewEdit', {user: result})
             }
        })
    },

    edit: function(req, res, next){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.body.email = req.session.email;
            console.log(req.body);
            res.render("user/userViewEdit", {errors : errors.errors, data : req.body})
        }else{
            
            //let avatar = null;
            
            if(typeof req.files[0] !== "undefined"){
                db.User.update({
                avatar: req.files[0].filename
                }, 
                {
                    where : {email_usuario : req.session.email}
                }).then( () => Promise.resolve("Se ha subido la imagen"))
            }

            db.User.update({
                nombre_usuario: req.body.nombre,
                apellido_usuario: req.body.apellido,
                email_usuario: req.body.email,
                telefono_usuario: req.body.telefono,
                //contrasena: bcrypt.hashSync(req.body.pass,10),
                dni: req.body.dni,
                calle: req.body.calle,
                altura: req.body.altura,
                piso: req.body.piso,
                departamento: req.body.departamento,
                barrio: req.body.barrio,
                localidad: req.body.localidad,
                provincia: req.body.provincia,
                pais: req.body.pais,
                //avatar: avatar,
                tipo_usuario: "cliente",    
            }, {where : {email_usuario : req.session.email}}).then(function(){

                res.redirect('/usuarios/perfil');
            
            })
        }
    }

};

module.exports = usersController;