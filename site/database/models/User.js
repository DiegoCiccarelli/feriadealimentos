module.exports = function(sequelize, dataTypes){
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_usuario: {
            type: dataTypes.STRING(50)
        },
        apellido_usuario: {
            type: dataTypes.STRING(50)
        },
        email_usuario: {
            type: dataTypes.STRING(50)
        },
        telefono_usuario: {
            type: dataTypes.STRING(20)
        },
        contrasena: {
            type: dataTypes.CHAR(60)
        },
        dni: {
            type: dataTypes.INTEGER(10)
        },
        calle: {
            type: dataTypes.STRING(50)
        },
        altura: {
            type: dataTypes.STRING(10)
        },
        piso: {
            type: dataTypes.STRING(10)
        },
        departamento: {
            type: dataTypes.STRING(10)
        },
        barrio: {
            type: dataTypes.STRING(50)
        },
        localidad: {
            type: dataTypes.STRING(50)
        },
        provincia: {
            type: dataTypes.STRING(50)
        },
        pais: {
            type: dataTypes.STRING(50)
        },
        avatar: {
            type: dataTypes.STRING(50)
        },
        tipo_usuario: {
            type: dataTypes.STRING(50)
        },
        created_at: {
            type: dataTypes.DATE()
        },
        updated_at: {
            type: dataTypes.DATE()
        }
    }

    let config = {
        tableName: "usuario",
        createdAt = "created_at",
        updatedAt = "updated_at"
    }

    let User = sequelize.define(alias, cols, config)

    User.associate = function(models){
        User.hasMany(models.Cart, {
            as : "carts",
            foreignKey:"usuario_id"
        })
    }

    return User
    }
