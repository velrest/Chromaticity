var express = require('express');
var hueController = require('../controllers/hue')

module.exports = function() {
  var router = express.Router();
  console.log("routes reached");
  router.post('/getbridge', hueController.getBridge);

  return router;
};
