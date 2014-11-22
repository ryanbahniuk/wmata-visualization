$(document).ready(function(){
	var trains = [];
	var ddd = initialize(trains);
	setInterval(getTrains, 1000);
});

function initialize(trains){
	var svg = d3.select('svg');
	var circles = svg.selectAll('circle').data(trains);

	var arrivals = circles.enter();

	var maxCount = d3.max(trains);

	//north
	//shady grove 39.128381, -77.169307
	//south
	//franconia springfield 38.764592, -77.171032
	//west
	//reston 38.948469, -77.351260
	//east
	//largo town center 38.901238, -76.841278
	var x = d3.scale.linear()
	  .range([0, 1000])
	  .domain([-77.351260, -76.841278]);

	var y = d3.scale.linear()
	  .range([1000, 0])
	  .domain([39.128381, 38.764592]);

	arrivals.append('circle')
	.attr('x', x(0))
	.attr('y', y(0))
	.attr('height', 50)
	.attr('width', 50);

	return {
		svg: svg,
		circles: circles,
		arrivals: arrivals,
		maxCount: maxCount,
		x: x,
		y: y
	}
}

function getTrains(){
	var API_KEY = "6k26b5dkgcxm463nqdfwwdn3";
	var url = "http://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?api_key=" + API_KEY;
	var arrivals = $.ajax({url: url, dataType: 'jsonp'})
	.done(success)
	.fail(failure);
}

function success(response){
	var $trains = $('#trains');
	$trains.html("");
	response.Trains.forEach(function(train, index, trains){
		if(train.Min === "ARR" || train.Min === "BRD") {
			var template = '<li style="color: #' + colorize(train.Line) + ';">' + train.LocationName + '</li>';
			$trains.append(template);
		}
	});
}

function failure(response){
	console.log("Couldn't connect to WMATA API!");
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