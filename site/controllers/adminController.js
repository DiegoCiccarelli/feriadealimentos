const db = require("../database/models/index")

const adminController = {
    viewAdminMenu : (req, res) => {
        res.render("admin/menuAdmin")
    },
    viewPurchases : (req, res) => {
        db.Cart.findAll({where : {estado_carrito : "comprado"}, order : [["updated_at", "DESC"]], include : "user"})
        .then(cartData => {
            res.render("admin/viewPurchases", {cartData})

        })
    }
}

module.exports = adminController;