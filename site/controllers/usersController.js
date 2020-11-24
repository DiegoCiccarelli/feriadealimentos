const fs = require("fs");
const path = require("path");

const usersController = {
    register : function(req, res, next) {
        res.render('user/register');
    },
    login : function(req, res, next) {
        res.render('user/login');
    }
};

module.exports = usersController;