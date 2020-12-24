const fs = require("fs");
const path = require("path");
const db = require("../database/models")

const indexController = {
    home : function(req, res, next){
   
        console.log("hola");
        console.log(db.Cart);


        return res.render("index");
    }
};

module.exports = indexController;