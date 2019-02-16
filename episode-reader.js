const fs = require("fs");

var contestants;

fs.readdir('contestants.csv', function(error, items) {
	
});

fs.readdir('data', function(error, items) {
    for (i in items) {
        fs.readFile('data/' + items[i], 'utf-8', function(readError, data) {
			console.log(data);
		});
    }
});