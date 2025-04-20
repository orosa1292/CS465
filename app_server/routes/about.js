var express = require('express');
var router = express.Router();
var controller = require('../controllers/about');

/* GET travel page */
router.get('/', controller.about);

module.exports = router;