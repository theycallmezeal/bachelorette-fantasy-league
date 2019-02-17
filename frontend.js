var bacheloretteData = [];

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:1693/');

request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		for (i in data) {
			bacheloretteData.push(data[i]);
		}
	}
}

request.send();

var app = new Vue({
	el: "#app",
	data: {
		bacheloretteData: bacheloretteData
	},
	computed: {
		stats: function () {
			var ret = [];
			var firstStatsArray = this.bacheloretteData[0].stats[0];
			for (i in firstStatsArray) {
				ret.push(i);
			}
			return ret;
		}
	}
});