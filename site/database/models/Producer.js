module.exports = function(sequelize, dataTypes){
    let alias = "Producer";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
        },
        nombre_productor: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        apellido_productor: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        email_productor: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        telefono_productor: {
            type: dataTypes.STRING(20),
            "allowNull" : true
        },
        nombre_emprendimiento: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        descripcion_productor: {
            type: dataTypes.STRING(200),
            "allowNull" : true
        },
        logotipo: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        domicilio_productor: {
            type: dataTypes.STRING(100),
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
        "tableName": "productor",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    }
    let Producer = sequelize.define(alias, cols, config)

    Producer.associate = function(models){
        Producer.hasMany(models.Product, {
            as : "products",
            foreignKey:"productor_id"
        })
    }


    return Producer
    }