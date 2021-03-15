const { captureRejectionSymbol } = require("events");
const fs = require("fs");
const path = require("path");
const db = require("../database/models")

const indexController = {
    home : function(req, res, next){
    db.Category.findAll(
        {where : 
            {
                estado_categoria : 1
            }
        })
    .then( resultado => {
        res.render("index", {categories : resultado})
    })
    },
    viewContact : (req, res) => {
        res.render("contact")
    },
    viewAboutUs : (req, res) => {
        res.render("aboutUs")
    }
};

module.exports = indexController;