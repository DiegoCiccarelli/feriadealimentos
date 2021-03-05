const db = require("../database/models/index")


const cartFunction = {
    refreshQuantity : (a, b) => {
    console.log(a.body)
    for(let i = 0; i < a.body.product_id.length; i++){
        db.CartProduct.update(
            {
                cantidad : a.body.product_quantity[i]
            },
            {
                where : 
                    {
                        carrito_id : a.session.carrito_id,
                        producto_id : a.body.product_id[i]
                    }
            }
        )
        .catch( err => b.json(500))
    }
    }
}
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
                            return res.json(data)
                        })
                    /* Si no tiene ese producto en su carrito simplemente agregamos el producto a la tabla intermedia */
                    }else{
                        db.CartProduct.create(
                            {
                                carrito_id : response.id,
                                producto_id : req.body.product_id,
                                cantidad : Number(req.body.product_quantity)
                            })
                            .then( (data) => {
                                return res.json(data)
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
                    .then((data) => {
                        return res.json(data)
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
        .then( data => {
            if(data){
            req.session.carrito_id = data.id;
            res.render("product/cart", {cartData : data})
            } else {
                res.render("product/cart")
            }
        })

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

    },

    checkout : (req, res) => {
        cartFunction.refreshQuantity(req,res)
        db.Cart.update(
            {
                estado_carrito : "cerrado"
            },
            {
                where : 
                    {
                        id : req.session.carrito_id
                    }
            }
        )
        .then( data =>{
            res.json(data)
        })
    },
    continuePurchase : (req, res) => {
        cartFunction.refreshQuantity(req, res)
        res.json(200)
    },
    viewCheckout : (req, res) => {
        if(req.session.carrito_id){
            db.Cart.findOne({
                where : {
                    id : req.session.carrito_id,
                    estado_carrito : "cerrado"
                },
                include : [{association : "products"}, {association : "user"}]
            })
            .then( response => {
                res.render("product/checkout", {cartData : response})
            })
        }else{
            res.redirect("/productos/listadoproductos")
        }
    },
    finishPurchase : (req, res) => {
        /* BUSCAMOS EL CARRITO EN LA DB PARA RECUPERAR LOS PRODUCTOS (NO ENVIAMOS DESDE EL FRONT PARA EVITAR QUE LO MODIFIQUEN)*/ 
        db.Cart.findOne({
            where : {
                id : req.session.carrito_id,
                estado_carrito : "cerrado"
            },
            include : [{association : "products"}]
        })
        .then(response => {
            /* CALCULAMOS EL TOTAL DEL CARRITO*/
            let total_carrito = 0;
            for(let product of response.products){
                total_carrito += product.precio * product.CartProduct.cantidad; 
            }
            /* SI LA FORMA DE ENTREGA ES DELIVERY, CARGAMOS AL CARRITO LOS DATOS RELEVANTES PARA HACER LA ENTREGA*/
            if(req.body.forma_entrega == "delivery"){
                db.Cart.update(
                {
                    observaciones : req.body.observaciones,
                    domicilio_entrega : req.body.domicilio_entrega,
                    forma_entrega : req.body.forma_entrega,
                    total_carrito : total_carrito,
                    estado_carrito : "comprado"
                },
                {
                    where : 
                        {
                            id : req.session.carrito_id,
                            estado_carrito : "cerrado"
                        }
                })
                .then( data => {
                    req.session.carrito_id = null
                    res.json(data)
                })
                /* SI LA FORMA DE ENTREGA ES PASAR POR NODO, CARGAMOS AL CARRITO LOS DATOS RELEVANTES*/
            } else if (req.body.forma_entrega == "nodo"){
                db.Cart.update(
                    {
                        observaciones : req.body.observaciones,
                        nodo_entrega : req.body.nodo_entrega,
                        forma_entrega : req.body.forma_entrega,
                        total_carrito : total_carrito,
                        estado_carrito : "comprado"
                    },
                    {
                        where : 
                            {
                                id : req.session.carrito_id,
                                estado_carrito : "cerrado"
                            }
                    })
                    .then(data => {
                        /* DESTRUIMOS LA SESION PARA EVITAR CONFLICTOS CON EL CARRITO COMPRADO*/
                        req.session.carrito_id = null
                        res.json(data)
                    })
            }
        })
    }

    
}

module.exports = cartController;