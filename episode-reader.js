const fs = require("fs");

function countInstances(string, substring) {
	return string.split(substring).length - 1;
}

function getFirstName(name) {
	return name.split(" ")[0];
}

function getTimesMentioned(data, name) {
	return countInstances(data, name);
}

function getTimesSpoken(data, name) {
	return countInstances(data, name + ":");
}

var methods = [getTimesMentioned, getTimesSpoken];

var contestants = fs.readFileSync("contestants.json").toString();
contestants = JSON.parse(contestants);

fs.readdir('data', function(error, items) {
    for (i in items) {
        fs.readFile('data/' + items[i], 'utf-8', function(error, data) {
			for (i in contestants) {
				var name = getFirstName(contestants[i]["name"]);
				var stats = [];
				for (j in methods) {
					var method = methods[j];
					var result = method.call(null, data, name);
					stats.push(result);
				}
				var ret = name + " ";
				for (j in stats) {
					ret += stats[j] + " ";
				}
				console.log(ret);
			}
		});
    }
});