const fs = require("fs");
const path = require("path");
const {check, body, validationResult} = require("express-validator");
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
              
        let product = productsData.find(p => parseInt(req.params.id)==p.id);
        console.log(product)
        
        if (product){
            return res.render('product/productDetail', {product: product});
            console.log(product);
        }else{
            return res.send("Error no se encuentra el producto");
        }

    },

    newProduct : function(req, res, next) {

        res.render('product/productCreateEdit');
    },

    createProduct : function(req, res, next){
        let formData = req.body;
        formData.imagenProducto = req.files[0].filename;
        const errors = validationResult(req);
        let id = 0;
        console.log(errors);
        if(!errors.isEmpty()){
            res.render("product/productCreateEdit", {errors : errors.errors})
        }
        else if(productsData[0] == undefined){
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
    },
    
    showProductEdit : function(req, res, next) {
        
              
            let product = productsData.find(p => parseInt(req.params.id)==p.id);
            console.log(product)
            
            if (product){
                return res.render('product/productEdit', {
                product: product,
                mode: "edit",
                title: "Editar Producto",
                buttonText: "Guardar Cambios",
                formAction: "/products/editProduct/"
                });
                console.log(product);
            }else{
                return res.send("Error no se encuentra el producto");
            }
    
        
    },

    productEdit: function(req, res, next) {


    }
}

module.exports = productsController;