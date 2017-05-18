var hue = require("node-hue-api"),
    timeout = 2000; // 2 seconds

var HueApi = new hue.HueApi();
var FOUNDBRIDGE= null;

var displayUserResult = function(result) {
      console.log("Created user: " + JSON.stringify(result));
};

var displayError = function(err) {
      console.log(err);
};

var registerUser = function(host, userDescription) {
  HueApi.registerUser(host, userDescription)
      .then(displayUserResult)
      .fail(displayError)
      .done();
};


var handleBridges = function(bridges) {
  console.log("Hue Bridges Found: " + JSON.stringify(bridges));
  FOUNDBRIDGE = bridges[0];

  if (bridges.length == 0) {
    $("#message").text("Oops, I couldn't find a hue bridge on your network.");
    $("#manual_bridge_ip").show();
    $("#bridge_scan").text("Search again");
  }
  else {
    $("#message").text("Ok, I found a bridge on your network with the IP " + bridges[0]["ipaddress"]);
    $("#bridge_register").css("visibility", "visible");
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
  
  $("#bridge_register").click(function() {
    console.log("Attempting to register hue user to the hue bridge.");
    //registerUser(FOUNDBRIDGE["ipaddress"], "Chromaticity"); 
    HueApi.createUser(FOUNDBRIDGE["ipaddress"], function(err, user) {
        if (err) {
          $("#message").text("Oh no, I couldn't connect to the bridge. The link button wasn't pressed.");
        } else {
          displayUserResult(user);
          $("#bridge_register").css("visibility", "hidden");
          $("#message").text("Hooray, I was able to successfully connect to the bridge");
        };
    });
    
  });
});
