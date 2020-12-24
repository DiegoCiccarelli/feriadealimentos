module.exports = function(sequelize, DataTypes){
    let alias = "Product";
    
    let cols = {
        id: {
            
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
            
        },

        nombre_producto: {
            type: DataTypes.TEXT(50),
            "allowNull" : false
        },

        descripcion_corta: {
            type: DataTypes.TEXT(100),
            "allowNull" : true
        },

        descripcion_larga: {
            type: DataTypes.TEXT(200),
            "allowNull" : true
        },

        precio: {
            type: DataTypes.FLOAT,
            "allowNull" : false
        },

        imagen: {
            type: DataTypes.TEXT(100),
            "allowNull" : false
        },

        estado_producto: {
            type: DataTypes.BOOLEAN,
            "allowNull" : false
        },

        variacion: {
            type: DataTypes.TEXT(50),
            "allowNull" : true
        },

        tamano: {
            type: DataTypes.TEXT(50),
            "allowNull" : true
        },

        productor_id: {
            type: DataTypes.INTEGER,
            "allowNull" : false

        },

        created_at: {
            type: DataTypes.DATE,
            "allowNull" : false
        },

        updated_at:{
            type: DataTypes.DATE,
            "allowNull" : false
        }
    };

    let config = {
        "tableName": "producto",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
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

    Product.associate = function(models){
        Product.belongsToMany(models.Category,{
            as: "categories",
            through: "categoria_producto",
            foreignKey: "categoria_id",
            otherKey: "producto_id"
        });
    };


    return Product;
}
