var express = require('express');
var hueController = require('../controllers/hue')

module.exports = function() {
  var router = express.Router();

  router.get('/getbride', hueController.getBridge);

  return router;
};
