var express = require('express');
var router = express.Router();
const adminController = require("../controllers/adminController");
const usersMiddleware = require("../middlewares/usersMiddeware")

/* GET home page. */
router.get('/menu', usersMiddleware.isLogged, usersMiddleware.isAdmin, adminController.viewAdminMenu);

module.exports = router;
