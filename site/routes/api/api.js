const express = require("express");
const router = express.Router();
const apiController = require("../../controllers/api/apiController");

router.get("/usersQuantity", apiController.usersQuantity)
router.get("/productsQuantity", apiController.productsQuantity)
router.get("/salesQuantity", apiController.salesQuantity)
router.get("/lastProduct", apiController.lastProduct)

module.exports = router;