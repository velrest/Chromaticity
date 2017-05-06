var hue = require("node-hue-api"),
    timeout = 2000; // 2 seconds

var handleBridges = function(bridges) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridges));
    if (bridges.length == 0) {
      $("#message").text("Oops, I couldn't find a hue bridge on your network.");
      $("#manual_bridge_ip").show();
      $("#bridge_scan").text("Search again");
    }
    else {
      var myBridge = bridges[0];
      $("#message").text("Ok, I found a bridge on your network with the IP " + myBridge["ipaddress"]);
      $("#continue").css("visibility", "visible");
      $("#bridge_scan").css("visibility", "hidden");
    }
};


// Create lListeners
$( document ).ready(function() {
  $("#bridge_scan").click(function() {
    console.log("The scan bridge button was clicked");
    hue.upnpSearch(timeout).then(handleBridges).done();
    $("#message").text("Searching for bridges on your network...");
  });
});


