
var MAX_EVENTS = 100;
var currentlyWatched = {};
var request = require('browser-request');

var data = {};

var watchAndSave = function(name) {
	var options = {
		method: 'GET',
		uri: name,
		json: true
	};
	request(options, function(er, response, body) {
		if (!response.ok) {
            console.log('there was an error!');
			console.log(er);
            console.log(response);
            console.log(body);
			return;
		}
        data[name].push(body);
        while(data[name].length > MAX_EVENTS) {
            data[name].shift();
        }
	});
	setTimeout(watchAndSave, 30000, name);
};

var getData = function(name, all) {
    if (all) {
        return data[name];
    } else {
        return data[name][data[name].length - 1]
    }
};


var startWatch = function(name) {
    console.log('starting watch');
	if (currentlyWatched[name]) {
		return;
	}
	currentlyWatched[name] = true;
    data[name] = [];
	watchAndSave(name);
};

module.exports = {
    "startWatch": startWatch,
    "getData": getData
};