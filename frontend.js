var bacheloretteData = [];

function refresh() {
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:1693/');

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
			while (bacheloretteData.length > 0) {
				bacheloretteData.pop();
			}
			for (i in data) {
				bacheloretteData.push(data[i]);
			}
		}
	}

	request.send();
}

refresh();
document.getElementById("refresh").onclick = refresh;

class FantasyPlayer {
	constructor(name, men) {
		this.name = name;
		this.men = men;
		this.score = 0;
	}
}

var app = new Vue({
	el: "#app",
	data: {
		bacheloretteData: bacheloretteData,
		fantasyPlayers: [
			new FantasyPlayer("Krzysztof", ["Roberto", "John", "Kasey", "Craig", "Phil"])
		]
	},
	
	methods: {
		addPlayer: function (name, men) {
			if (name != "") {
				fantasyPlayers.append(new FantasyPlayer(name, men));
			}
		},
		
		scoreFor: function (man) {
			var score = 0;
			for (episode in this.bacheloretteData) {
				for (setOfStats in this.bacheloretteData[episode].stats) {
					if (this.bacheloretteData[episode].stats[setOfStats].name == man) {
						score += this.bacheloretteData[episode].stats[setOfStats].score;
						break; // handle duplicate names... shhh
					}
				}
			}
			return score;
		}
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