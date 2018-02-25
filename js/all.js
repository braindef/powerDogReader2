// Whole-script strict mode syntax
"use strict";

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
	
	const loader = new Loader("B2_A2_S2", document.getElementById("myCanvas"));
	const grapher = new Grapher(loader);

	//grapher.startup();

	loader.firstFileTime = Math.floor( new Date() /1000 ) - 3 * day;
	loader.lastFileTime = Math.floor( new Date() / 1000);

	loader.startTime = loader.firstFileTime+1;
	loader.endTime = loader.lastFileTime-1;
	loader.loadFiles();

});
