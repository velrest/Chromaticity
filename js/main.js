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
    for (i=0;i<object.devices.length;i++) {
    html += "<tr><td>" + object.devices[i].name + "</td>" + 
        "<td>" + object.devices[i].username + "</td>" +
        "<td>" + object.devices[i].created + "</td>" +
        "<td>" + object.devices[i].accessed + "</td>" +
        "<td> <button class='btn btn-default'>E</button><button class='btn btn-danger' data-toggle='modal' data-target='#editUserModal'>D</button></td></tr>"; 
  }
  document.getElementById("userlist").innerHTML = html;
};


var updateLightList = function(object) {
  var html = "";
  var lightcontrols = '<div class="row light_container" style="padding:0px;margin:0px;">' +
    '  <div class="col-md-3 col-lg-2">' +
    '  <button class="bubble_wrapper right jscolor {valueElement:\'valueInput\', styleElement: \'styleInput\'} ">'+
    '    <div id="styleInput" class="light_bubble right">'+
    '        <img src="../img/products/br30.svg" class="light_icon" />'+
    '    </div>'+
    '  </button>'+
    '  </div>'+
    '  <div class="col-md-6 col-lg-8">'+
    '  <div data-slider-color="slider-pink">'+
    '    <div class="rkmd-slider slider-discrete slider-pink">'+
    '      <input type="range" min="0" max="100" value="35">'+
    '    </div>'+
    '  </div>'+
    '  </div>'+
    '  <div class="col-md-3 col-lg-2">'+
    '    <div class="material-switch pull-right onoffswitch">'+
    '    <input id="someSwitchOptionInfo" name="someSwitchOption001" type="checkbox"/>'+
    '    <label for="someSwitchOptionInfo" class="label-info"></label>'+
    '  </div>'+
    '  </div>'+
    '</div> '; 
  for (i=0;i<object.lights.length;i++) {
    html += lightcontrols 
  }
  document.getElementById("control_light_list").innerHTML = html;
};


var initialize_page = function() {
  console.log("BRIDGE CONFIGURATION")
  console.log(api.fullState(console.log));
  console.log("ALL USERS")
  console.log(api.registeredUsers(console.log));

  // Get all users registered with bridge
  api.registeredUsers().then(generateUserList).done()

  // Get all lights registered with bridge
  console.log(api.lights(console.log));
  api.lights().then(updateLightList).done()
  
};

initialize_page();
