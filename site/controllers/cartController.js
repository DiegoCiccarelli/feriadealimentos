const db = require("../database/models/index")

const cartController = {
    addCart : (req, res) => {
        /*  Guardamos el id del usuario que agrega el producto */
        let userId = req.session.userId 
        /* Chequeamos si el usuario tiene un carrito activo */
        db.Cart.findOne(
        {
            where : 
                {
                    usuario_id : userId,
                    estado_carrito : "activo"
                },
            include : "products"
        })
        .then( response => {
            /* Si hay un carrito activo entonces le asignamos el producto que eligio el usuario */
            if(response){
                console.log("TIENE UN CARRITO ACTIVO")
                /* Comprobamos si el usuario ya tiene ese producto en su carrito*/
                    /* Si lo tiene entonces los productos seleccionados a la columna cantidad para evitar tener productos repetidos */
                    const productMatch = response.products.find(element => element.CartProduct.producto_id == req.body.product_id)
                    if(productMatch){
                        db.CartProduct.update(
                            {
                                cantidad : Number(productMatch.CartProduct.cantidad) + Number(req.body.product_quantity)
                            },
                            {
                                where : 
                                    {
                                        producto_id : productMatch.CartProduct.producto_id
                                    }
                            }
                            )
                        .then( (data) => {
                            return res.redirect(`/productos/detalleproducto/${req.body.product_id}`)
                        })
                    /* Si no tiene ese producto en su carrito simplemente agregamos el producto a la tabla intermedia */
                    }else{
                        db.CartProduct.create(
                            {
                                carrito_id : response.id,
                                producto_id : req.body.product_id,
                                cantidad : Number(req.body.product_quantity)
                            })
                            .then( () => {
                                return res.redirect(`/productos/detalleproducto/${req.body.product_id}`)
                            })
                    }
            /* Si no existe carrito activo entonces debo crear el carrito y luego subir el producto*/
            } else {
                /* Creamos el carrito */
                console.log("creamos el carrito")
                db.Cart.create(
                    {
                        usuario_id : userId,
                        estado_carrito : "activo"
                    })
                .then(response => {
                    /* Agregamos el producto al nuevo carrito creado*/
                    req.session.carrito_id = response.id;
                    db.CartProduct.create(
                        {
                            carrito_id : response.id,
                            producto_id : req.body.product_id,
                            cantidad : Number(req.body.product_quantity)
                        })
 
                     return res.redirect(`/productos/detalleproducto/${req.body.product_id}`)
                })
            }
        })
    },
    viewCart : function(req, res, next){


        db.Cart.findOne(
        {
            where : 
                {
                    estado_carrito : "activo", 
                    usuario_id : req.session.userId
                },
            include : "products"
        })
        .then( data => {
            req.session.carrito_id = data.id;
            res.render("product/cart", {cartData : data})})

    },

    deleteProductInCart: function(req, res, next){
        
        db.CartProduct.destroy(
        {
            where :
                {
                    producto_id : req.body.product_id,
                    carrito_id : req.session.carrito_id
                }
        }
        ).then(data =>{
            res.json(data);
        });

    }

    
}

module.exports = cartController;