const fs = require("fs");
const path = require("path");
const {check, body, validationResult} = require("express-validator");
let productsDirname = path.join(__dirname, "/../data/productsData.json");
let productsData = JSON.parse(fs.readFileSync(productsDirname, "utf-8"));
let db = require("../database/models/index")

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
        const errors = validationResult(req);
        let formData = req.body;
        let id = 0;

        if(!errors.isEmpty()){
            console.log(errors)
            res.render("product/productCreateEdit", {errors : errors.errors})
        }
        else if(productsData[0] == undefined){
            formData.imagenProducto = req.files[0].filename;
            productsData.push(formData);
            productsData[0].id = 1;
        } else{
        for(let i = 0; i < productsData.length; i++){
        if(!productsData[i+1]){
            id = parseInt(productsData[i].id, 10) + 1;
        }
        }
        formData.imagenProducto = req.files[0].filename;
        formData.id = id;
        productsData.push(formData);
    }
        let productsDataJSON = JSON.stringify(productsData);
        fs.writeFileSync(productsDirname, productsDataJSON);
        res.send("Se ha creado con exito el producto: " + req.body.nombre)
    },
    
    productListAdmin : function(req, res, next) {
        db.Product.findAll().then(resultado =>{
            res.render('product/productListAdmin', {productsData:resultado});
        })
        
    },
    
    showProductEdit : function(req, res, next) {
        
        db.Product.findOne({where : {id:req.params.id}}).then(resultado => {
            if(resultado == null){
                res.send("No se ha encontrado un usuario con el id: " + req.params.id)
            } else{
                res.render(`/productos/productoEditar/${req.params.id}`, {product: resultado})
            }
        })
    
        
    },

    productEdit : function(req, res, next) {
       if(!errors.isEmpty()){
        console.log(errors)
        res.render(`/productos/productoEditar/${req.params.id}`, {errors : errors.errors})
    }else{
        let imagen = req.files[0].filename;
        db.Product.update(
            {
                nombre_producto: req.body.nombre,
                descripcion_corta: req.body.descripcion_corta,
                descripcion_larga : req.body.descripcion_larga,
                precio: req.body.precio,
                imagen: imagen,
                estado_producto: req.body.estado,
                variacion: req.body.variacion,
                tamano: req.body.tamano
        },{where:{id:req.params.id}}).then(() => {
            res.render("/productos/listadoProductosAdmin")
        })
    }

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