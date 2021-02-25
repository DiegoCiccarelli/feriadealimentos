module.exports = function(sequelize, dataTypes){
    let alias = "CartProduct";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
        },

        carrito_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'Cart',
                key: 'id'
            }
        },
        producto_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        cantidad: {
            type: dataTypes.INTEGER.UNSIGNED,
            "allowNull" : false
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
        "tableName": "carrito_producto",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    }
    let CartProduct = sequelize.define(alias, cols, config)

    CartProduct.associate = function(models){
        CartProduct.belongsTo(models.Cart,{
            as : "cart",
            foreignKey: "carrito_id"
        })
        
        CartProduct.belongsTo(models.Product,{
            as : "product",
            foreignKey: "producto_id"
        })
    }   


    return CartProduct
    }