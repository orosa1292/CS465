var express = require('express');
var router = express.Router();
var controller = require('../controllers/news');

/* GET travel page */
router.get('/', controller.news);

module.exports = router;
