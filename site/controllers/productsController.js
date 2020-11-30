const fs = require("fs");
const path = require("path");
const {check, body, validationResult} = require("express-validator");
let productsDirname = path.join(__dirname, "/../data/productsData.json");
let productsData = JSON.parse(fs.readFileSync(productsDirname, "utf-8"));

const productsController = {

    productList : function(req, res, next) {
        res.render('product/productList', {productsData});
    },

    cart : function(req, res, next){
        res.render('product/cart');
    },

    productDetail : function(req, res, next) {
              console.log(productsData)
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

       return res.render('product/productCreateEdit');
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
        
            console.log(productsData);  
            let product = productsData.find(p => parseInt(req.params.id)==p.id);
            console.log(product)
            
            if (product){
                return res.render('product/productEdit', {product: product})
            }else{
                return res.send("Error no se encuentra el producto");
            }
    
        
    },

    productEdit : function(req, res, next) {
       
        for(let i=0; i<productsData.length; i++){
    
            if(req.params.id==productsData[i].id){
                productsData[i] = req.body;
                productsData[i].id=parseInt(req.params.id);
                productsData[i].imagenProducto = req.files[0].filename;
            }

        };
         
    fs.writeFileSync(productsDirname, JSON.stringify(productsData));
    return res.send("Se han guardado los cambios con éxito");

    },
    productDelete : function(req,res,next){
        var idProduct = req.params.id;
        var productDelete = productsData.filter(function(product){
        return product.id != idProduct;  
        })
        if(productDelete.length != productsData.length){
        productDeleteJSON = JSON.stringify(productDelete);
        fs.writeFileSync(productsDirname ,productDeleteJSON);
        return res.send("El producto  con el id " + req.params.id + " ha sido eliminado");
    } else {
        return res.send("El producto con el id: " + idProduct + " no se ha encontrado")
    }
    }
}
module.exports = productsController; 