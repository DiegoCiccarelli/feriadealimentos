const fs = require("fs");
const path = require("path");
const {check, body, validationResult} = require("express-validator");
let productsDirname = path.join(__dirname, "/../data/productsData.json");
let productsData = JSON.parse(fs.readFileSync(productsDirname, "utf-8"));
let db = require("../database/models/index");

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
        const errors = validationResult(req)
        if(!errors.isEmpty()){

            //console.log(errors)
            res.render("product/productCreateEdit", {errors : errors.errors, datos : req.body})

        }else{
            let avatar = null;
            if(typeof req.files[0] != "undefined"){
            avatar = req.files[0].filename;
        }
        
        db.Product.create({
            nombre_producto: req.body.nombre,
            descripcion_corta: req.body.descripcion_corta,
            descripcion_larga : req.body.descripcion_larga,
            precio: req.body.precio,
            imagen: imagen,
            estado_producto: req.body.estado,
            variacion: req.body.variacion,
            tamano: req.body.tamano
            //productor_id: req.body.producto
            
        }).then(function(){
            res.send('se ha creado con exito el producto: ' + req.body.nombre);
            //res.redirect('/productos/listado');
            })
        }
    },
    
    list : function(req,res){
        db.Producer.findAll().then(resultado => {
            res.render("producer/producerList", {producer : resultado})
        })
    },
    
    productListAdmin : function(req, res, next) {
        db.Product.findAll().then(resultado =>{
            res.render("product/productListAdmin", {product:resultado});
        })
    },
    
    showProductEdit : function(req, res, next) {
        
    let busquedaProducto = db.Product.findByPk(req.params.id, {include:[{association:"producers"}, {association:"categories"}]})
    let busquedaCategorias = db.Category.findAll();

    Promise.all([busquedaProducto, busquedaCategorias]).then(([producto, categorias]) => {
        if(!producto){
            res.send("No se ha encontrado un producto con el id " + req.params.id)
        } else{
            console.log(categorias)
            res.render("product/productEdit", {product:producto, categories:categorias})
        }
    })
    
        
    },

    productEdit : function(req, res, next) {
       if(!errors.isEmpty()){
        console.log(errors)
        res.render("product/productEdit", {errors : errors.errors, product:req.body})
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
    },
    viewCreateCategory : function(req, res){
        if(req.params.id){
            db.Category.findOne({where: {id:req.params.id}}).then(resultado => {
                if(!resultado){
                res.send("No se ha encontrado un usuario con el id " + req.params.id)
                }else{
                res.render("product/createCategory", {categoria:resultado})
            }})
        } else{
            res.render("product/createCategory")
        }
    },
    createCategory : function(req,res){
        if(req.params.id){
            db.Category.update({nombre_categoria : req.body.categoria}, {where : {id:req.params.id}}).then(()=>{
                res.redirect('/productos/listadoCategorias')
            })
        }else{
            db.Category.create({nombre_categoria : req.body.categoria}).then(()=>{
                res.redirect('/productos/listadoCategorias')
            })
        }
    },
    deleteCategory : function(req, res){
        db.Category.destroy({where:{id:req.params.id}}).then(
            res.redirect('/productos/listadoCategorias')
        )
    },
    listadoCategorias : function(req,res){
        db.Category.findAll().then(resultado => {
            console.log(resultado)
            res.render("product/categoryList", {categoria:resultado})
        })
    }

}
module.exports = productsController; 