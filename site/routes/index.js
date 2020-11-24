var express = require('express');
var router = express.Router();
const indexCotroller = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexCotroller.home);

module.exports = router;
