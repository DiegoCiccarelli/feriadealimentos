const fs = require("fs");
const path = require("path");
const db = require("../database/models/Cart")

const indexController = {
    home : function(req, res, next){
    return res.render("index");
    }
};

module.exports = indexController;