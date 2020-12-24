module.exports = function(sequelize, dataTypes){
    let alias = "Producer";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_productor: {
            type: dataTypes.STRING(50)
        },
        apellido_productor: {
            type: dataTypes.STRING(50)
        },
        email_productor: {
            type: dataTypes.STRING(50)
        },
        telefono_productor: {
            type: dataTypes.STRING(20)
        },
        nombre_emprendimiento: {
            type: dataTypes.STRING(50)
        },
        descripcion_productor: {
            type: dataTypes.STRING(200)
        },
        logotipo: {
            type: dataTypes.STRING(50)
        },
        domicilio_productor: {
            type: dataTypes.STRING(100)
        },
        created_at: {
            type: dataTypes.DATE()
        },
        updated_at: {
            type: dataTypes.DATE()
        }
    }

    let config = {
        "tableName": "productor",
        "createdAt": "created_at",
        "updatedAt": "updated_at"
    }

    let Producer = sequelize.define(alias, cols, config)

    return Producer
    }