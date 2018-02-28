
// Whole-script strict mode syntax
//"use strict";

var site;

//konstanten spaltenbenennung fürs array <-> csv
var timestamp=0;
var pac=5;
var pdc=6;
var udc=7;
var temp=8;

//konstanten für zeiten
var min = 60;
var hour = 60 * min;
var day = 24 * hour;
var week = 7 * day;
var month = 30 * day;
var year = 365 * day;


class Site {
	constructor(temp) {

		this.yMax=0;
		alert("constructor");
	}

	setYmax(value)
	{	alert(this.yMax);
		if (value>this.yMax)
		{
			this.yMax = value;
		}
		alert(this.yMax);
	}


	createGraphs(strings)
	{
		for (var i=0; i<strings.length; i++)
		{
			this.addRow(strings[i]);
		}
	}


	addRow(string) {
	    var div = document.createElement('div');

	    div.className = 'graph';

	    div.innerHTML =
		        '<div class="graph, center">' +
		        '<canvas id="'+string+'" class="canvas" width="800" height="600" style="border:2px solid #d3d3d3; background-color: #FFFFFF">' +
		                'Your browser does not support the HTML5 canvas tag.</canvas><br>' +
		        '</div>';

	    document.getElementById('content').appendChild(div);
	}

removeRow(input) {
	    document.getElementById('content').removeChild(input.parentNode);
	}

}


//MAIN:
//wait until the document is ready
var ready = function ( fn ) {
	//Sanity Check
	if ( typeof fn !== 'function' ) return;
	// If document is already loaded, run method
	if ( document.readyState === 'complete'  ) {
		return fn();
	}
    	// Otherwise, wait until document is loaded
	document.addEventListener( 'DOMContentLoaded', fn, false );
};
// Example
ready(function() {

	site = new Site();

	var strings = [ "B2_A2_S1", "B2_A2_S2", "B2_A3_S1", "B2_A3_S2" ];

	site.createGraphs(strings);

	var site = new Site();
	var loader = [];
	var grapher = [];



	for (var i=0; i<strings.length; i++)
	{

		
		loader[i] = new Loader(strings[i], document.getElementById(strings[i]), site);
		grapher[i] = new Grapher(loader[i]);

	}
		loader[0].loadFiles();
		loader[1].loadFiles();
		loader[2].loadFiles();
		loader[3].loadFiles();

});



