// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process

function init(){
	var Storage = require('node-storage');
	var store = new Storage('db.json');

	//store.put('hello', 'world');

	console.log(store.get('hello'));
}

init()

window.setInterval(function(){
	console.log("it works");
}, 5000);


