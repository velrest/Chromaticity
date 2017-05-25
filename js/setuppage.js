var hue = require("node-hue-api"),
    timeout = 2000; // 2 seconds

var HueApi = new hue.HueApi();
var BRIDGE = null;
var BRIDGE_DESCRIPTION = "Chromaticity client"

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
                  break;
                }
        }
}

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
  BRIDGE = bridges[0];

  if (bridges.length == 0) {
    $("#message").text("Oops, I couldn't find a hue bridge on your network.");
    $("#manual_bridge_ip").show();
    $("#bridge_scan").text("Search again");
  }
  else {
    $("#message").text("Ok, now press the button on your hue bridge.");
    $("#pushlink").css("display", "block");
    $("#bridge_scan").css("display", "none");
    $("#bridge_timeout").css("display", "block");
    startBridgeTimeout()
  }
};

var registerBridge = function() {
  HueApi.createUser(BRIDGE["ipaddress"], function(err, user) {
      if (err) { 
        console.log(err)
      } else {
        displayUserResult(user);
        return true;
      };
      });
  //HueApi.registerUser(BRIDGE["ipaddress"], BRIDGE_DESCRIPTION)
  //      .then(displayUserResult)
  //      .fail(displayError)
  //      .done();
};

var startBridgeTimeout = function() {
  var bridge_timeout = 30000;  // ms
  $("#bridge_slider").animate({width:"100%"}, bridge_timeout, 
                              function() {
                                clearInterval(registerAttempts); 
                                console.log("animation done");
                              });
  var registerAttempts = setInterval(function() { registerBridge(); }, 2000);
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
    //registerUser(BRIDGE["ipaddress"], "Chromaticity"); 
    HueApi.createUser(BRIDGE["ipaddress"], function(err, user) {
        if (err) {
          $("#message").text("Oh no, I couldn't connect to the bridge. The link button wasn't pressed.");
        } else {
          displayUserResult(user);
          $("#bridge_register").css("display", "none");
          $("#message").text("Hooray, I was able to successfully connect to the bridge");
        };
    });
  });
});
