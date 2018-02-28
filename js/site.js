
// Whole-script strict mode syntax
//"use strict";

//var site;

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
	constructor(nGraphs) {

		this.nGraphs = nGraphs;

		this.yMax=0;
		
		this.counter = 0;

		this.loader = [];
		
	}


	moveLeft() {
		for (var i=0; i<this.loader.length; i++)
			this.loader[i].grapher.moveLeft();
	}

	setYmax(value) {
		if (value>this.yMax)
		{
			this.yMax = value;
		}
	}

	incCounter()
	{
		this.counter++;
		if (this.counter==this.nGraphs)
			for (var i=0; i<this.nGraphs; i++)
				this.loader[i].grapher.startup();
	}

	appendLoader(loader) {
		this.loader.push(loader);
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

	    div.className = 'graph, center';

	    div.innerHTML = '<h2>'+string+'</h2>' +
		        '<canvas id="'+string+'" class="canvas" width="800" height="600" style="border:2px solid #d3d3d3; background-color: #FFFFFF">' +
		                'Your browser does not support the HTML5 canvas tag.</canvas><br>' +
		        '</div>' + 
			' <button class="moveLeft">&lt;</button>' +
			' <button onclick="moveRight()">&gt;</button>' +
			' <input type="text" id="startTime" value="1518865004">' +
			' <input type="text" id="endTime" value="1518884700">' +
			' <button id="update" onclick="printGraph();">Update</button>';


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

	var site = new Site();

	var strings = [ "B2_A2_S1" ];
		//, "B2_A2_S2", "B2_A3_S1", "B2_A3_S2" ];

	site.createGraphs(strings);

	var site = new Site(strings.length);
	var loader = [];
	var grapher = [];



	for (var i=0; i<strings.length; i++)
	{

		
		loader[i] = new Loader(strings[i], document.getElementById(strings[i]), site);
		site.appendLoader(loader[i]);
		grapher[i] = new Grapher(loader[i]);
		loader[i].loadFiles();

	}

  		var x = document.getElementsByClassName("moveLeft");
  		for (var i = 0; i < x.length; i++) {
	      		x[i].addEventListener("click", function(){
			    site.moveLeft();
			});
		}

  


});



