$(document).ready(function(){
	setInterval(getTrains, 1000);
});

function getTrains(){
	var API_KEY = "6k26b5dkgcxm463nqdfwwdn3";
	var url = "http://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?api_key=" + API_KEY;
	var arrivals = $.ajax({url: url, dataType: 'jsonp'})
	.done(success)
	.fail(failure);
}

function success(response){
	var $trains = $('.trains');
	$trains.html("");
	response.Trains.forEach(function(train, index, trains){
		if(train.Min === "ARR" || train.Min === "BRD") {
			var template = '<li style="color: #' + colorize(train.Line) + ';">' + train.LocationName + '</li>';
			$trains.append(template);
		}
	});
}

function failure(response){
}

function findStation(code){
	var station = {}
	STATIONS.forEach(function(element, index, array){
		if(element.Code === code) { station = element }
	});
	return station
}

function colorize(line){
	var key = {
		"RD": "fa2800",
		"SV": "bbbbbb",
		"BL": "065aab",
		"YL": "ffea00",
		"GR": "188237",
		"OR": "fc8100",
		"--": "20f5f2"
	}
	return key[line]
}