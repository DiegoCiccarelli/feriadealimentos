module.exports = function(sequelize, dataTypes){
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
        },
        nombre_usuario: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        apellido_usuario: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        email_usuario: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        telefono_usuario: {
            type: dataTypes.STRING(20),
            "allowNull" : false
        },
        contrasena: {
            type: dataTypes.CHAR(60),
            "allowNull" : false
        },
        dni: {
            type: dataTypes.INTEGER(10),
            "allowNull" : false
        },
        calle: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        altura: {
            type: dataTypes.STRING(10),
            "allowNull" : false
        },
        piso: {
            type: dataTypes.STRING(10),
            "allowNull" : true
        },
        departamento: {
            type: dataTypes.STRING(10),
            "allowNull" : true
        },
        barrio: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        localidad: {
            type: dataTypes.STRING(50),
            "allowNull" : false
        },
        provincia: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        pais: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        avatar: {
            type: dataTypes.STRING(50),
            "allowNull" : true
        },
        tipo_usuario: {
            type: dataTypes.STRING(50),
            "allowNull" : false
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
        "tableName": "usuario",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
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
