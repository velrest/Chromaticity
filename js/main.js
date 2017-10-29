var hue = require("node-hue-api"),
    timeout = 2000; // 2 seconds

const constModule = require('../renderer');
let store = constModule.store();

var host = store.get("bridge_ip"), 
    username = store.get("username"), 
    api;

api = new hue.HueApi(host, username);

var initialize_page = function() {
  console.log("BRIDGE CONFIGURATION")
  console.log(api.fullState(console.log));
  console.log("ALL USERS")
  console.log(api.registeredUsers(console.log));
};

initialize_page();
