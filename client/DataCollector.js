
var MAX_EVENTS = 100;
var currentlyWatched = {};
var request = require('browser-request');

var watchAndSave = function(name) {
	var options = {
		method: 'GET',
		uri: name,
		json: true
	};
	request(options, function(er, response, body) {
		if (er || !response.ok) {
            console.log('there was an error!');
			console.log(er);
            console.log(response);
            console.log(body);
			return;
		}
        console.log(response.ok)
        console.log("response")
        console.log(response);
        console.log("body")
		console.log(body);
	});
	setTimeout(watchAndSave, 30000, name);
};


var startWatch = function(name) {
    console.log('starting watch');
	if (currentlyWatched[name]) {
		return;
	}
	currentlyWatched[name] = true;
	watchAndSave(name);
};

module.exports = {
    "startWatch": startWatch,
    "getData": function() {}
};