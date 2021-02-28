const { response } = require("express")
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
                }
        })
        .then( response => {
            /* Si hay un carrito activo entonces le asignamos el producto que eligio el usuario */
            if(response){
                /* Comprobamos si el usuario ya tiene ese producto en su carrito*/
                db.CartProduct.findOne(
                {
                    where : 
                        {
                            producto_id : req.body.product_id,
                        },
                        include : [
                            {association : "product"}
                        ]
                })
                .then(result => {
                    /* Si lo tiene entonces los productos seleccionados a la columna cantidad para evitar tener productos repetidos */
                    if(result){
                        db.CartProduct.update(
                            {
                                cantidad : Number(result.cantidad) + Number(req.body.product_quantity)
                            },
                            {
                                where : 
                                    {
                                        id : result.id
                                    }
                            }
                            )
                        .then( () => {
                            /* Luego actualizamos el total del carrito sumandole solo los nuevos productos agregados */ 
                            db.Cart.update(
                                {
                                    total_carrito : response.total_carrito + (result.product.precio * Number(req.body.product_quantity))
                                },
                                {
                                    where : 
                                    {
                                        id : result.carrito_id
                                    }
                                })
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
                            .then( result => {
                                /* Buscamos el producto y con el include recuperamos la informacion del producto al que hace referencia*/
                                db.CartProduct.findByPk(result.id,
                                    {
                                        include : 
                                            [
                                                {association : "product"}
                                            ]
                                    })
                                .then( retrieve => {
                                    /* Actualizamos el total del carrito */
                                    db.Cart.update(
                                        {
                                            total_carrito : response.total_carrito + (retrieve.product.precio * Number(req.body.product_quantity))
                                        },
                                        {
                                            where : 
                                            {
                                                id : retrieve.carrito_id
                                            }
                                        })
                                    return res.redirect(`/productos/detalleproducto/${req.body.product_id}`)
                                })
                            })
                    }
                })
            /* Si no existe carrito activo entonces debo crear el carrito y luego subir el producto*/
            } else {
                /* Creamos el carrito */
                db.Cart.create(
                    {
                        usuario_id : userId,
                        estado_carrito : "activo"
                    })
                .then(response => {
                    /* Agregamos el producto al nuevo carrito creado*/
                    db.CartProduct.create(
                        {
                            carrito_id : response.id,
                            producto_id : req.body.product_id,
                            cantidad : req.body.product_quantity
                        })
                    /* Pasamos a actualizar el precio total del carrito */
                    .then( response => {
                        /* Buscamos el producto y con el include recuperamos la informacion del producto al que hace referencia*/
                        db.CartProduct.findByPk(response.id,
                            {
                                include : 
                                    [
                                        {association : "product"}
                                    ]
                            })
                        .then( response => {
                            /* Actualizamos el total del carrito */
                            db.Cart.update(
                                {
                                    total_carrito : response.product.precio * response.cantidad
                                },
                                {
                                    where : 
                                    {
                                        id : response.carrito_id
                                    }
                                })
                            return res.redirect(`/productos/detalleproducto/${req.body.product_id}`)
                        })
                    })
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
        .then( data => res.render("product/cart", {cartData : data}))

    },
}

module.exports = cartController;