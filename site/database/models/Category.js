module.exports = function(sequelize, DataTypes){
    let alias = "Category";
    
    let cols = {
        id: {
            
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
            
        },

        nombre_categoria: {
            type: DataTypes.TEXT(50),
            "allowNull" : false
        },
        estado_categoria: {
            type: DataTypes.BOOLEAN,
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
        "tableName": "categoria",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    };

    let Category = sequelize.define(alias, cols, config);

    
    Category.associate = function(models){
        Category.belongsToMany(models.Product, {
            as:"products",
            through: "CategoryProduct",
            foreignKey: "categoria_id",
            otherKey: "producto_id"
        });
    };

    return Category;
}

