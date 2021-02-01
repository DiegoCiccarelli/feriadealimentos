const db = require("../../database/models/index")

const apiController = {
    usersQuantity : (req, res) =>{
        db.User.findAll({where : {tipo_usuario : "cliente"}})
        .then((data) => {
            res.json({length : data.length});
        })
    },
    productsQuantity : (req, res) => {
        db.Product.findAll({where:{estado_producto : 1}})
        .then( (data) => {
        
        res.json({length : data.length});
        })
    },
    salesQuantity : (req, res) => {
        db.Cart.findAll({where:{estado_carrito : "cerrado"}})
        .then( (data) => {
        res.json({length : data.length});
        })
    },
    lastProduct : (req, res) => {
        db.Product.findAll({
            order: [['created_at', "DESC"]],
            limit : 1
        })
        .then( (data) => {
        res.json(data);
        })
    },
}

module.exports = apiController;