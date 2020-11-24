const fs = require("fs");
const path = require("path");

const productsController = {
    productList : function(req, res, next) {
        res.render('product/productList');
    },
    cart : function(req, res, next){
        res.render('product/cart');
    },
    productDetail : function(req, res, next) {
        res.render('product/productDetail');
    },
    newProduct : function(req, res, next) {
        res.render('product/productCreateEdit');
    },
    editProduct : function(req, res, next) {
        res.render('product/productCreateEdit');
    }
};

module.exports = productsController;