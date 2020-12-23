module.exports = function(sequelize, DataTypes){
    let alias = "Products";
    
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
        tableName: "productos"
    };

    let Products = sequelize.define(alias, cols, config);

    Products.associate = function(models){
        Products.belongsTo(models.Producer), {
            as: "Producer",
            foreignKey: productor_id
        }
    }

    // FALTAN OTRAS RELACIONES AQUI

    return Category;
}



