module.exports = function(sequelize, dataTypes){
    let alias = "Cart";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: dataTypes.INTEGER().UNSIGNED
        },
        estado_carrito: {
            type: dataTypes.STRING(50)
        },
        total_carrito: {
            type: dataTypes.FLOAT()
        },
        metodo_pago: {
            type: dataTypes.STRING(50)
        },
        forma_entrega: {
            type: dataTypes.STRING(50)
        },
        nodo_entrega: {
            type: dataTypes.STRING(50)
        },
        domicilio_entrega: {
            type: dataTypes.STRING(50)
        },
        observaciones: {
            type: dataTypes.STRING(200)
        },
        created_at: {
            type: dataTypes.DATE()
        },
        updated_at: {
            type: dataTypes.DATE()
        }
    }

    let config = {
        "tableName": "carrito",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    }

    let Cart = sequelize.define(alias, cols, config);


    Cart.associate = function(models){
        Cart.belongsTo(models.User, {
            as : "user",
            foreignKey:"usuario_id"
        })

        Cart.belongsToMany(models.Product, {
            as:"products",
            through: "carrito_producto",
            foreignKey: "producto_id",
            otherKey: "carrito_id"
        })
    }

    return Cart
    }