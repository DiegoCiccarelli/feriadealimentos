const express = require("express");
const router = express.Router();
const apiController = require("../../controllers/api/apiController");

router.get("/usersQuantity", apiController.usersQuantity);
router.get("/productsQuantity", apiController.productsQuantity);
router.get("/salesQuantity", apiController.salesQuantity);
router.get("/lastProduct", apiController.lastProduct);


//Listado de productos para búsqueda en home
router.get("/products", apiController.products);

//Listado de categorías
router.get("/categories", apiController.categories);
module.exports = router;