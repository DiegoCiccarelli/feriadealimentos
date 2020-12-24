module.exports = function(sequelize, DataTypes){
    let alias = "Category_Products";
    
    let cols = {
        id: {
            
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
            
        },

        categoria_id: {
            type: DataTypes.INTEGER,
            "allowNull" : false

        },

        product_id: {
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
        "tableName": "categoria_producto",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    };


    let Category = sequelize.define(alias, cols, config);

    // FALTAN LAS RELACIONES AQUI


    return Category;
}
