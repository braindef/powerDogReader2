
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

	moveRight() {
		for (var i=0; i<this.loader.length; i++)
			this.loader[i].grapher.moveRight();
	}



	oneWeek() {
		for (var i=0; i<this.loader.length; i++)
		{
			this.loader[i].startTime=new Date().getTime()/1000 - 7 * day;
			this.loader[i].endTime=new Date().getTime()/1000;
			this.loader[i].loadFiles();
			this.loader[i].grapher.context.font="80px Calibri";
			this.loader[i].grapher.context.fillStyle = '#FF0000'
			this.loader[i].grapher.context.fillText("Loading Data...", this.loader[i].grapher.width/4, this.loader[i].grapher.height/2);
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
			' <button class="moveRight">&gt;</button>' +
			' <button class="oneWeek">last Week</button>';


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

	var strings = [ "B2_A2_S1", "B2_A2_S2", "B2_A3_S1", "B2_A3_S2" ];

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
});



