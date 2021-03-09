const db = require("../database/models/index")

const globalMiddleware = {
    headerUser : (req, res, next) => {
        if(req.session.nombre){
            res.locals.username = req.session.nombre;
            console.log(res.locals.user_name)
            next()
        } else{
            next()
        }
    }
}

module.exports = globalMiddleware;