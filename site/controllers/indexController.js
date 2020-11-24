const fs = require("fs");
const path = require("path");

const indexController = {
    home : function(req, res, next){
        res.render('index');
    }
};

module.exports = indexController;