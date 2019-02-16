const fs = require("fs");

fs.readdir('data', function(err, items) {
    for (i in items) {
        fs.readFile('data/' + items[i], 'utf-8', function(readError, data) {
			console.log(data);
		});
    }
});

