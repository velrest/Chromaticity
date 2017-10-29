var hue = require("node-hue-api"),
    timeout = 2000; // 2 seconds

const constModule = require('../renderer');
let store = constModule.store();

var host = store.get("bridge_ip"), 
    username = store.get("username"), 
    api;

api = new hue.HueApi(host, username);

var generateUserList = function(object) {
  html = ""
  listelem = "<li>{0} - {1}</li>"
    for (i=0;i<object.devices.length;i++) {
    html += "<tr><td>" + object.devices[i].name + "</td>" + 
        "<td>" + object.devices[i].username + "</td>" +
        "<td>" + object.devices[i].created + "</td>" +
        "<td>" + object.devices[i].accessed + "</td></tr>"; 
  }
  document.getElementById("userlist").innerHTML = html;
};


var initialize_page = function() {
  console.log("BRIDGE CONFIGURATION")
  console.log(api.fullState(console.log));
  console.log("ALL USERS")
  console.log(api.registeredUsers(console.log));
  api.registeredUsers().then(generateUserList).done()
  
};

initialize_page();
