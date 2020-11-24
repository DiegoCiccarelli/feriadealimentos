var express = require('express');
var router = express.Router();
const usersControllers = require("../controllers/usersController");

router.get('/registro', usersControllers.register);

router.get('/login', usersControllers.login);

module.exports = router;
