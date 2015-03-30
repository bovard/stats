
var MAX_EVENTS = 100;
var currentlyWatched = {};
var request = require('browser-request');

var watchAndSave = function(name) {
	var options = {
		method: 'GET',
		url: name,
		json: true
	};
	request(options, function(er, response, body) {
		if (er || !response.ok) {
			console.log(er);
			return;
		}
		console.log(body);
	});
	setTimeout(watchAndSave, 5000, name);
};


var startWatch = function(name) {
    console.log('starting watch');
	if (currentlyWatched[name]) {
		return;
	}
	currentlyWatched[name] = true;
	watchAndSave(name);
};

module.exports = startWatch;