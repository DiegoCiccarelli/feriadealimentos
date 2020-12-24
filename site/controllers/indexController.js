const { captureRejectionSymbol } = require("events");
const fs = require("fs");
const path = require("path");
const db = require("../database/models")

const indexController = {
    home : function(req, res, next){
   
        console.log("hola");
        db.Category.findByPk(2)
        .then(function(result){
           console.log(result);
        });


        return res.render("index");
    }
};

module.exports = indexController;