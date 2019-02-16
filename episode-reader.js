const fs = require("fs");

var contestants = fs.readFileSync("contestants.json").toString();
contestants = JSON.parse(contestants);

fs.readdir('data', function(error, items) {
    for (i in items) {
        fs.readFile('data/' + items[i], 'utf-8', function(error, data) {
			for (i in contestants) {
				var name = getFirstName(contestants[i]["name"]);
				var timesMentioned = countInstances(data, name);
				var timesSpoke = countInstances(data, name + ":");
				console.log(contestants[i]["name"] + " " + timesMentioned + " " + timesSpoke);
			}
		});
    }
});

function countInstances(string, substring) {
	return string.split(substring).length - 1;
}

function getFirstName(name) {
	return name.split(" ")[0];
}