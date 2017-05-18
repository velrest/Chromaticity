var hue = require("node-hue-api");
var HueApi = hue.HueApi;

var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

var getBridge = function(req, res, next) {
  // get bridge
  hue.nupnpSearch()
  .then(function (output) {
    res.json(output.toJSON());
  })
  .otherwise(function (error) {
    res.status(500).json({msg: error.message});
  })
  .done();
};

module.exports = {
  // Search for bridge on network
  getBridge: getBridge,
}
