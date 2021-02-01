const fs = require("fs");
const path = require("path");
const {check, body, validationResult} = require("express-validator");
let productsDirname = path.join(__dirname, "/../data/productsData.json");
let productsData = JSON.parse(fs.readFileSync(productsDirname, "utf-8"));
let db = require("../database/models/index");

const productsController = {

    productList : function(req, res, next) {
        db.Product.findAll({where:{estado_producto : 1}})
        .then( (productsData) => {
        res.render('product/productList', {productsData});
        })
    },

    cart : function(req, res, next){
        res.render('product/cart');
    },

    productDetail : function(req, res, next) {
        db.Product.findByPk(req.params.id, {where:{estado_producto : 1}})
        .then( (productData) => {
            if (productData){
                return res.render('product/productDetail', {productData});
            }else{
                return res.send("Error no se encuentra el producto");
            }
        })
    },

    newProduct : function(req, res, next) {

        let allCategories = db.Category.findAll();
        let allProducers = db.Producer.findAll();
        let categories;
        let producers;

        //Traer todas categorias y productores para enviar a la vista
            Promise.all([allCategories, allProducers]).then(([categories, producers]) =>{

                //console.log(categories, producers);
                // renderizamos la vista y le enviamos categorias y productores
                 return res.render('product/productCreate', {categories: categories,
                 producers: producers});

        });
        


    },

    createProduct : function(req, res, next){
        
        let allCategories = db.Category.findAll();
        let allProducers = db.Producer.findAll();
        let categories;
        let producers;

        const errors = validationResult(req)
        console.log(errors);
        if(!errors.isEmpty()){

            let allCategories = db.Category.findAll();
            let allProducers = db.Producer.findAll();
            let categories;
            let producers;
             //Traer todas categorias y productores para enviar a la vista
            Promise.all([allCategories, allProducers]).then(([categories, producers]) =>{

                //console.log(categories, producers);
                // renderizamos la vista y le enviamos categorias y productores
                console.log(errors);
                console.log(categories);
                console.log(producers)
    
                res.render("product/productCreate", {errors : errors.errors, datos : req.body, categories: categories, producers: producers});
               
            });
        
          

        }else{
            let avatar = null;
            if(typeof req.files[0] != "undefined"){
            avatar = req.files[0].filename;
        }
        console.log(req.body);
        db.Product.create({
           
            // nombre_producto: req.body.nombre,
            // descripcion_corta: req.body.descripcion_corta,
            // descripcion_larga : req.body.descripcion_larga,
            // precio: req.body.precio,
            // imagen: imagen,
            // estado_producto: req.body.estado,
            // variacion: req.body.variacion,
            // tamano: req.body.tamano
            //productor_id: req.body.producto
            
        }).then(function(){
            res.send('se ha creado con exito el producto: ' + req.body.nombre);
            //res.redirect('/productos/listado');
            })
        }
    },
    
    // list : function(req,res){
    //     db.Producer.findAll().then(resultado => {
    //         res.render("producer/producerList", {producer : resultado})
    //     })
    // },
    
    productListAdmin : function(req, res, next) {
        db.Product.findAll().then(resultado =>{
            res.render("product/productListAdmin", {product:resultado});
        })
    },
    
    showProductEdit : function(req, res, next) {
        
    let busquedaProducto = db.Product.findByPk(req.params.id, {where : {estado_producto:1},include:[{association:"producers"}, {association:"categories"}]})
    let busquedaProductores = db.Producer.findAll({where:{estado_productor : 1}})
    let busquedaCategorias = db.Category.findAll({where:{estado_categoria : 1}});

    Promise.all([busquedaProducto, busquedaProductores, busquedaCategorias]).then(([producto, productores, categorias]) => {
        if(!producto){
            res.send("No se ha encontrado un producto con el id " + req.params.id)
        } else{
            res.render("product/productEdit", {product:producto, producers:productores, categories:categorias})
        }
    })
    
        
    },

    productEdit : function(req, res, next) {
        let errors = validationResult(req)
        /* Chequeamos que no haya errores de validacion*/
        if(!errors.isEmpty()){
            res.send(errors)
        /* Si no hay errores procedemos a actualizar: */
        }else{
                /* Si no carga una imagen mantenemos la que está guardada en la base de datos, si lo hace, subimos la imagen*/
                if(typeof req.files !== "undefined"){
                    db.Product.update({
                    imagen: req.files[0].filename
                    }, 
                    {
                        where : {id:req.params.id}
                    }).then( () => Promise.resolve("Se ha subido la imagen"))
                }
            
            /* Eliminamos todas las relaciones que el producto tenga para subir las actualizadas*/
            db.CategoryProduct.destroy({where: {producto_id : req.params.id}})
            /* Subimos las nuevas categorias que el admin ha seleccionado a la tabla pivot*/
            .then( () => {
                
                /* Chequeamos si req.body.category es un array (es decir, si se selecciono mas de una categoria), si lo es recorremos el array y creamos una relacion en la tabla pivot por cada categoria que haya en el array)*/
                if(Array.isArray(req.body.category)){
                    for(let categoria of req.body.category){
                        db.CategoryProduct.create({
                            
                            producto_id : req.params.id,
                            categoria_id : categoria
                        
                            })
                        }
                /* Si solo se selecciono una categoria entonces realizo un solo create con la categoria seleccionada */ 
                }else{
                    db.CategoryProduct.create({
                            
                            producto_id : req.params.id,
                            categoria_id : req.body.category
                    
                        })
                    }
                }
            )
            /* Actualizamos el resto de las columnas del producto */
            .then( () => {
            db.Product.update(
                    {
                        nombre_producto: req.body.nombre,
                        descripcion_corta: req.body.descripcionCorta,
                        descripcion_larga : req.body.descripcionLarga,
                        precio: req.body.precioProducto,
                        estado_producto: req.body.estado,
                        variacion: req.body.variacion,
                        tamano: req.body.tamano,
                        productor_id : req.body.productor,
                    },
                    {
                        where:{id:req.params.id},
                        include: [{association:"producers"}]
                    })
                }
            )
            /* Una vez todo actualizado redirigimos a la tabla de productos */
            .then(() => {
                return res.redirect("/productos/listadoProductosAdmin")
            })
        }
    },
    productDelete : function(req,res,next){
    if(req.params.id){
        
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
            db.Category.create({nombre_categoria : req.body.categoria, estado_categoria: 1}).then(()=>{
                res.redirect('/productos/listadoCategorias')
            })
        }
    },
    deleteCategory : function(req, res){
        db.Category.update({
            estado_categoria : 0
        },{
            where:
            {
                id:req.params.id
            }
        }).then(
            res.redirect('/productos/listadoCategorias')
        )
    },
    listadoCategorias : function(req,res){
        db.Category.findAll({where : {estado_categoria : 1}}).then(resultado => {
            console.log(resultado)
            res.render("product/categoryList", {categoria:resultado})
        })
    }

}
module.exports = productsController; 