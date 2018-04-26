window.addEventListener('load',init);

function init(){
	$.ajax({
	    url: 'data/data.json',
	    type: 'GET',
	    failure: function(err){
	    	console.log ("Could not get the data");
	    	return alert("Something went wrong");
	    },
	    success: function(data) {
	    	console.log(data);
	    	setChartDefaults();
	    	// buildDoughnutChart(data);
				buildDoughnutChart2(data);
	    	buildBarChart(data);
	    }
	});
}

// set default options for ALL charts
function setChartDefaults(){
	// make it responsive
	Chart.defaults.global.responsive = true;
	// set the font color
	Chart.defaults.global.defaultFontColor = '#222';
	// set the font family
	Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
}


// function buildDoughnutChart(data){
//
//
//
// 	// now, let's make the chart
// 	// a chart can take 2 objects:
// 	// 1. data - the data/information (required)
// 	// 2. options - chart options (optional)
//
// 	var data = {
// 	    labels: [
// 	        "Total Journalists Deaths",
// 	        "Female Journalists Deaths",
// 					"Male Journalists Deaths"
// 	    ],
// 	    datasets: [
// 	        {
// 	            data: [data.overall.totalDeaths, data.overall.femaleDeaths, data.overall.maleDeaths],
// 	            backgroundColor: [
// 	                "#B71C1C",
// 	                "#F44336",
// 									"#D32F2F"
// 	            ],
// 	            hoverBackgroundColor: [
// 	                "#C62828",
// 	                "#E53935",
// 									"#EF5350"
// 	            ]
// 	        }]
// 	};
//
// 	// create chart options (this is optional)
// 	// see list of options:
// 	// http://www.chartjs.org/docs/latest/charts/doughnut.html
// 	var options = {
// 		legend: {
// 			position: 'bottom',
// 			labels: {
// 				fontColor: '#222',
// 				boxWidth: 12.5,
// 				padding: 20
// 			},
// 		},
// 	    tooltips: {
// 	        backgroundColor: '#222',
// 	    },
// 	    animation:{
// 	        animateScale:false
// 	    }
// 	}
//
// 	// first, get the context of the canvas where we're drawing the chart
// 	var ctx = document.getElementById("doughnutChart").getContext("2d");
//
// 	// now, create the doughnut chart, passing in:
// 	// 1. the type (required)
// 	// 2. the data (required)
// 	// 3. chart options (optional)
// 	var myDoughnutChart = new Chart(ctx,{
// 	    type: 'doughnut',
// 	    data: data,
// 	    options: options
// 	});
// }

function buildDoughnutChart2(data){

	// first, let's just render the overall counts on the page
	document.getElementById('totalDeaths').innerHTML = data.overall.totalDeaths;
	document.getElementById('femaleDeaths').innerHTML = data.overall.femaleDeaths;
	document.getElementById('maleDeaths').innerHTML = data.overall.maleDeaths;

	document.getElementById('crossfire').innerHTML = data.overall.crossfire;
	document.getElementById('dangerousAssignment').innerHTML = data.overall.dangerousAssignment;
	document.getElementById('murder').innerHTML = data.overall.murder;
	var data = {
	    labels: [
	        "Crossfire",
	        "Dangerous Assignment",
					"Murder"
	    ],
	    datasets: [
	        {
	            data: [data.overall.crossfire, data.overall.dangerousAssignment, data.overall.murder],
	            backgroundColor: [
	                "#B71C1C",
	                "#F44336",
									"#D32F2F"
	            ],
	            hoverBackgroundColor: [
	                "#C62828",
	                "#E53935",
									"#EF5350"
	            ]
	        }]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/latest/charts/doughnut.html
	var options = {
		legend: {
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20
			},
		},
	    tooltips: {
	        backgroundColor: '#222',
	    },
	    animation:{
	        animateScale:false
	    }
	}

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("doughnutChart2").getContext("2d");

	// now, create the doughnut chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myDoughnutChart2 = new Chart(ctx,{
	    type: 'doughnut',
	    data: data,
	    options: options
	});
}


function buildBarChart(data){

	// first, let's prepare the data
	// let's pull out the labels we need; i.e. the state names
	var labelsArray = [];
	data.femaleCountries.forEach(function(e){
		labelsArray.push(e.country)
	});

	//let's pull out the country count stats we need
	var countArray = [];
	data.femaleCountries.forEach(function(e){
		countArray.push(e.femTotal);
	})

	//let's pull out the percentages stats we need
	var percentArray = [];
	data.femaleCountries.forEach(function(e){
		percentArray.push(e.percentage);
	})

	// now, let's make the chart
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)
	var data = {
	    // chart labels
	    labels: labelsArray,
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset
	    datasets: [
	        {
	            label: "Countries",
	            backgroundColor: "#B71C1C",
	            data: countArray
	        }
	        // {
	        //     label: "Percentages",
	        //     backgroundColor: "#ff5d40",
	        //     data: percentArray
	        // }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/latest/charts/bar.html
	var options = {
		legend: {
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20
			},
		},
	    tooltips: {
	        backgroundColor: '#222',
	    },
	}

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("barChart").getContext("2d");

	// now, create the bar chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myBarChart = new Chart(ctx, {
	    type: 'bar',
	    // type: 'horizontalBar', // horizontal bards
	    data: data,
	    options: options
	});
}
