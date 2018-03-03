
// Whole-script strict mode syntax
//"use strict";

//var site;

//konstanten spaltenbenennung fürs array <-> csv
//day;month;year;address;bus;strings;stringid;produces_day;pac_max;whday_offset
var date=0;
var produces_day=7;
var pac_max=8;

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

		this.loaders = [];
		
	}

	moveLeft() {
		for (var i=0; i<this.loaders.length; i++)
			this.loaders[i].grapher.moveLeft();
	}

	moveRight() {
		for (var i=0; i<this.loaders.length; i++)
			this.loaders[i].grapher.moveRight();
	}


	currentMonth() {
		for (var i=0; i<this.loaders.length; i++)
		{
			this.loaders[i].startTime=new Date().getTime()/1000 - 30 * day;
			this.loaders[i].endTime=new Date().getTime()/1000;
			this.loaders[i].grapher.startup();
		}
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
				this.loaders[i].grapher.startup();
	}

	appendLoader(loader) {
		this.loaders.push(loader);
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
			' <button class="moveRight">&gt;</button>' +
			' <button class="currentMonth">Current Month</button>';


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

	var strings = [ "B2_A2_S1"];
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

		loader[i].loadFile(new Date().getTime()/1000);

	}

  		var x = document.getElementsByClassName("moveLeft");
  		for (var i = 0; i < x.length; i++) {
	      		x[i].addEventListener("click", function(){
			    site.moveLeft();
			});
		}

  
  		var x = document.getElementsByClassName("moveRight");
  		for (var i = 0; i < x.length; i++) {
	      		x[i].addEventListener("click", function(){
			    site.moveRight();
			});
		}

  		var x = document.getElementsByClassName("oneWeek");
  		for (var i = 0; i < x.length; i++) {
	      		x[i].addEventListener("click", function(){
			    site.oneWeek();
			});
		}

  		var x = document.getElementsByClassName("oneDay");
  		for (var i = 0; i < x.length; i++) {
	      		x[i].addEventListener("click", function(){
			    site.oneDay();
			});
		}
  		
		var x = document.getElementsByClassName("currentMonth");
  		for (var i = 0; i < x.length; i++) {
	      		x[i].addEventListener("click", function(){
			    site.currentMonth();
			});
		}
});



