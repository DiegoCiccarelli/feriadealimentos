const {check, body, validationResult} = require("express-validator");


const productsMiddleware = {
    checkForm : [
        body("nombre").notEmpty().withMessage("Es necesario introducir un nombre al producto"),
        body("precioProducto").notEmpty().withMessage("Es necesario introducir un precio al producto"),
        body("descripcionCorta").notEmpty().withMessage("Es necesario introducir una descripcion corta al producto"),
        body("descripcionLarga").notEmpty().withMessage("Es necesario introducir una descripcion larga al producto"),
        body("imagenProducto").notEmpty().withMessage("Es necesario subir el producto con una imagen")
    ],
}

module.exports = productsMiddleware;