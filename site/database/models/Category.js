module.exports = function(sequelize, DataTypes){
    let alias = "Category";
    
    let cols = {
        id: {
            
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            
        },

        nombre_categoria: {
            type: DataTypes.TEXT(50)
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
