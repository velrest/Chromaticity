var hue = require("node-hue-api");

var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

// Search for bridge
// hue.nupnpSearch(function(err, result) {
//     if (err) throw err;
//     displayBridges(result);
// });


module.exports = {
  // Search for bridge on network
  getBridge: function(req, res, next) {
    // get bridge
    hue.nupnpSearch()
    .then(function (output) {
      res.json(output.toJSON());
    })
    .otherwise(function (error) {
      res.status(500).json({msg: error.message});
    })
    .done();
  },
}
