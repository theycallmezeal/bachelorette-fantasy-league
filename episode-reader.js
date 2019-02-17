const fs = require("fs");
const http = require('http');

function countInstances(string, substring) {
	return string.split(substring).length - 1;
}

function getFirstName(name) {
	return name.split(" ")[0];
}

class Analyzer {
	constructor(name, method) {
		this.name = name;
		this.method = method;
	}
}

var getTimesMentioned = new Analyzer("timesMentioned", function (data, name) {
	return countInstances(data.toLowerCase(), name.toLowerCase());
});

var getTimesSpoken = new Analyzer("timesSpoken", function (data, name) {
	return countInstances(data.toLowerCase(), name.toLowerCase() + ":");
});

var isolateSpeakersRegex = /\w*?: .*?(?=(\w*?:)|$)/gmi
var getSpeakerRegex = /^\w*(?=:)/mi

var getWordsSpoken = new Analyzer("wordsSpoken", function (data, name) {
	var count = 0;
	var matches = data.match(isolateSpeakersRegex);
	for (match in matches) {
		var transcriptLine = matches[match];

		var speaker = transcriptLine.match(getSpeakerRegex)[0];

		if (speaker == name) {
			var line = transcriptLine.replace(speaker + ": ", "");
			var wordsSpoken = line.split(" ").length;
			count += wordsSpoken;
		}
	}
	return count;
});

var analyzers = [getTimesMentioned, getTimesSpoken, getWordsSpoken];

var contestants = fs.readFileSync("contestants.json").toString();
contestants = JSON.parse(contestants);

function getData() {
	var files = fs.readdirSync("data");
	var results = [];
	for (i in files) {
		var episodeResults = [];
		var episode = fs.readFileSync('data/' + files[i]).toString();
		for (j in contestants) {
			var name = getFirstName(contestants[j]["name"]);
			var stat = { "name": name };
			for (k in analyzers) {
				var analyzer = analyzers[k];
				var result = analyzer.method.call(null, episode, name);
				stat[analyzer.name] = result;
			}
			episodeResults.push(stat);
		}
		results.push({
			"episode": files[i].replace(".txt", ""),
			"stats": episodeResults
		});
	}
	return results;
}

const hostname = '';
const port = 1693;

const server = http.createServer((request, result) => {
	result.statusCode = 200;
	result.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
	});
	
	result.write(JSON.stringify(getData()));
	result.end();
});

server.listen(port, hostname, () => {
	console.log('Server running on port ' + port);
});