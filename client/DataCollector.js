
var currentlyWatched = {};
var request = require('browser-request');


var watchAndSave = function(name) {
	var options = {
		method: 'GET',
		uri: name,
		json: true
	};
	request(options, function(er, response, body) {
        if (body && body['appspot']) {
            localStorage[btoa(name)] = JSON.stringify(body);
        }
	});
};

var getData = function(name) {
    var data = localStorage[btoa(name)];
    if (data) {
        data = JSON.parse(data);
    }
    return data;
};


var startWatch = function(name) {
	if (currentlyWatched[name]) {
		return;
	}
	currentlyWatched[name] = true;
	watchAndSave(name);
    setInterval(watchAndSave, 30000, name);
};

module.exports = {
    "startWatch": startWatch,
    "getData": getData
};