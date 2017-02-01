// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process

function getRequest(url, success) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
	    if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send();
	return xhr;
}
	
//getRequest('http://foo.bar/?p1=1&p2=Hello+World', function(data){ console.log(data);  });

function postAjax(url, data, success) {
	var params = typeof data == 'string' ? data : Object.keys(data).map(
	function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])  }										        
	).join('&');			
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xhr.open('POST', url);
	xhr.onreadystatechange = function() {
	    if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText);  }									    
	};
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}
	
//postAjax('http://foo.bar/', { p1: 1, p2: 'Hello World'  }, function(data){ console.log(data);  });



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


