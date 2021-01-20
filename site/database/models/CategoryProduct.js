module.exports = function(sequelize, dataTypes){
    let alias = "CategoryProduct";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
        },

        categoria_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'Category',
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
        "tableName": "categoria_producto",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    }
    let CategoryProducer = sequelize.define(alias, cols, config)

    CategoryProducer.associate = function(models){
        CategoryProducer.belongsTo(models.Category,{
            foreignKey: "categoria_id"
        })
        
        CategoryProducer.belongsTo(models.Product,{
            foreignKey: "producto_id"
        })
    }   


    return CategoryProducer
    }