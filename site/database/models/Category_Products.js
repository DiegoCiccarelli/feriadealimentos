module.exports = function(sequelize, DataTypes){
    let alias = "Category_Products";
    
    let cols = {
        id: {
            
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            
        },

        categoria_id: {
            type: DataTypes.INTEGER

        },

        product_id: {
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
        tableName: "categoria"
    };

    let Category = sequelize.define(alias, cols, config);

    // FALTAN LAS RELACIONES AQUI


    return Category;
}
