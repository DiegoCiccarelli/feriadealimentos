module.exports = function(sequelize, DataTypes){
    let alias = "Product";
    
    let cols = {
        id: {
            
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            
        },

        nombre_producto: {
            type: DataTypes.TEXT(50)
        },

        descripcion_larga: {
            type: DataTypes.TEXT(100)
        },

        descripcion_larga: {
            type: DataTypes.TEXT(200)
        },

        precio: {
            type: DataTypes.FLOAT
        },

        imagen: {
            type: DataTypes.TEXT(100)
        },

        estado_producto: {
            type: DataTypes.BOOLEAN
        },

        variacion: {
            type: DataTypes.TEXT(50)
        },

        tamano: {
            type: DataTypes.TEXT(50)
        },

        productor_id: {
            type: DataTypes.INTEGER

        },

        created_at: {
            type: DataTypes.DATE
        },

        updated_at:{
            type: DataTypes.DATE
        }
    };

    let config = {
        tableName: "producto"
    };

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.Producer, {
            as: "producers",
            foreignKey: "productor_id"
        });
    };

    Product.associate = function(models){
        Product.belongsToMany(models.Cart, {
            as:"carts",
            through: "carrito_producto",
            foreignKey: "carrito_id",
            otherKey: "producto_id"
        });
    };

    Products.associate = function(models){
        Product.belongsToMany(models.Category,{
            as: "categories",
            through: "categoria_producto",
            foreignKey: "categoria_id",
            otherKey: "producto_id"
        });
    };


    return Product;
}
