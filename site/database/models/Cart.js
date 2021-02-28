module.exports = function(sequelize, dataTypes){
    let alias = "Cart";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
        },
        usuario_id: {
            type: dataTypes.INTEGER().UNSIGNED,
            "allowNull" : false
        },
        estado_carrito: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        total_carrito: {
            type: dataTypes.FLOAT(),
            "allowNull" : true
        },
        metodo_pago: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        forma_entrega: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        nodo_entrega: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        domicilio_entrega: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        observaciones: {
            type: dataTypes.STRING(200),
            "allowNull" : true
        },
        created_at: {
            type: dataTypes.DATE(),
            "allowNull" : false
        },
        updated_at: {
            type: dataTypes.DATE(),
            "allowNull" : false
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
            as : "products",
            through: "CartProduct",
            foreignKey: "carrito_id",
            otherKey: "producto_id"
        })
    }

    return Cart;
    }