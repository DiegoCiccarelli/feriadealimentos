const db = require("../database/models/index")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('Zxu2!h');

const globalMiddleware = {
    headerUser : (req, res, next) => {
        if((typeof req.session.nombre != "undefined")){
            res.locals.username = req.session.nombre;
            next()
        }else {
            next()
        }

    },
    sessionRecovery : (req,res,next) => {
        if((typeof req.session.email == "undefined") && (typeof req.cookies.email != "undefined")){
            db.User.findOne({where : {email_usuario : cryptr.decrypt(req.cookies.email)}})
            .then((data) => {
                req.session.userId = data.id
                req.session.email = data.email_usuario
                req.session.nombre = data.nombre_usuario
                if(data.tipo_usuario == "admin"){
                    req.session.admin = true;
                } else{
                    req.session.admin = false;
                }
                next()
            })
        } else{
            next()
        }

    }
}

module.exports = globalMiddleware;