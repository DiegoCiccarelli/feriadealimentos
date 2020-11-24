const fs = require("fs");
const path = require("path");
let productsDirname = path.join(__dirname, "/../data/productsData.json");
let productsData = JSON.parse(fs.readFileSync(productsDirname, "utf-8"));

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
    createProduct : function(req, res, next){
        let formData = req.body;
        formData.imagenProducto = req.files[0].filename;
        let id = 0;
        if(productsData[0] == undefined){
            productsData.push(formData);
            productsData[0].id = 1;
        } else{
        for(let i = 0; i < productsData.length; i++){
        if(!productsData[i+1]){
            id = parseInt(productsData[i].id, 10) + 1;
        }
        }
        formData.id = id;
        productsData.push(formData);
    }
        let productsDataJSON = JSON.stringify(productsData);
        fs.writeFileSync(productsDirname, productsDataJSON);
        res.send("Se ha creado con exito el producto: " + req.body.nombre)
    },
    productListAdmin : function(req, res, next) {
        res.render('product/productListAdmin', {productsData});
    }
    // editProduct : function(req, res, next) {
    //     res.render('product/productCreateEdit');
    // }
};

module.exports = productsController;