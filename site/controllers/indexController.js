const { captureRejectionSymbol } = require("events");
const fs = require("fs");
const path = require("path");
const db = require("../database/models")

const indexController = {
    home : function(req, res, next){
     return res.render("index");
    }
};

module.exports = indexController;