//global variabeln
var nFiles=0;	//TODO
var xhr=[];
var count=0;

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

var totalLength = 0;

var startTime;

var firstFileTime;
var lastFileTime;

var alreadyLoaded = Math.floor( new Date() / 1000  );

var stringArray;

var myString;


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
	firstFileTime = Math.floor( new Date() /1000 ) - 3 * day;
	lastFileTime = Math.floor( new Date() / 1000);

	startTime = firstFileTime+1;
	endTime = lastFileTime-1;
	
	loadFiles();
});


function addCounters()
{
	var pdcMax=0;	
	//alert("nFiles: "+nFiles);	
	for (i=0; i<nFiles; i++)
	if (xhr[i].status==200)
	{
		xhr[i]["count"]=xhr[i].response.split("\n").length -1 - 1;  //schneidet CSV Header ab, zweites -1 berücksichtigt dass arrayfeld bei 0 beginnt
		//alert(xhr[i].count);
	
	}
	else
	{
		xhr[i]["count"]=0;
	}
}

function countTotalRows()
{
	totalLength=0;
	for (i=0; i<nFiles; i++)
	{
		console.log("X totalLength: "+xhr[i].count);
		totalLength += xhr[i].count;
	}
}



function createArray()
{
	addCounters();
	countTotalRows();

	stringArray = [totalLength];

	for (i=0; i<totalLength; i++)
	{
		stringArray[i]=[];
		for (j=0; j<temp+1; j++)
			stringArray[i][j]=0;
	}

	var arrayCounter = 0;

	for (i=0; i<nFiles; i++)
	{
		for (j=0; j<xhr[i].count; j++)
		{
			console.log("NOT ZERO:"+xhr[i].response.split("\n")[j+1].split(";")[timestamp] +"nFiles: "+nFiles + "totalLength: "+totalLength) ;
			stringArray[arrayCounter][timestamp] = xhr[i].response.split("\n")[j+1].split(";")[timestamp] ;
			stringArray[arrayCounter][pac] = xhr[i].response.split("\n")[j+1].split(";")[pac] ;
			stringArray[arrayCounter][pdc] = xhr[i].response.split("\n")[j+1].split(";")[pdc] ;
			stringArray[arrayCounter][udc] = xhr[i].response.split("\n")[j+1].split(";")[udc] ;
			stringArray[arrayCounter][temp] = xhr[i].response.split("\n")[j+1].split(";")[temp] ;

			arrayCounter+=1;
		}
		
	}

	stringArray.sort(function(a,b){
		    return a[timestamp] - b[timestamp];
	});


	lastFileTime = getMinMaxOf2DIndex(stringArray, timestamp).max;
	firstFileTime = getMinMaxOf2DIndex(stringArray, timestamp).min;
}


function printArray()
{
	myString = "";

	var div = document.getElementById('output');

	//alert("stringArray:"+stringArray.length);

	for(i=0; i<stringArray.length; i++)
	{
		console.log(" myString: "+ stringArray[i][timestamp]);
		myString += stringArray[i][timestamp] + ": ";
		myString += stringArray[i][pac] + " - ";
		myString += stringArray[i][pdc] + " - ";
		myString += stringArray[i][udc] + " - ";
		myString += stringArray[i][temp] + "<br>";
	}
	div.innerHTML = myString;
}


function getFilenameByTimestamp(stringName, jsTimestamp)
{
	var date = new Date(jsTimestamp);
	month = date.getMonth()+1;
	days = date.getDate();
	year = date.getFullYear();
	var filename = stringName + "_global_" + month + "_" + days + "_" + year + ".txt";
	return filename;
}


function loadFiles()
{
	//countFiles = 6;
	countFiles = ( lastFileTime - startTime ) / day;
	console.log("CountFiles: "+countFiles + " = " + lastFileTime + " - " + startTime + " day: " + day);

	if (countFiles>10) return;

	for (i=0; i<countFiles; i++)
	{
		{
			Day = lastFileTime - i * day;
			console.log("Day: "+Day+"=lastFileTime: "+lastFileTime);
			file = loadFile( Day );
			if (file != null)
				xhr.push( file );
		}
	}
}

var string = "B2_A2_S2";

function loadFile(unixTimestamp)
{	
	//Hinweis, allenfalls fetch und promise verwenden
	xhttpr = new XMLHttpRequest();
	filename = getFilenameByTimestamp(string, unixTimestamp*1000);
	
	for(i=0; i<xhr.length; i++)
		if (xhr[i].filename == filename)
		{
			console.log("xhr[i].file==file");
			return null;
		}
	nFiles++;

	xhttpr.open('POST', filename, true);
	xhttpr.filename = filename;
	xhttpr.onload = function () {
		count++;
		if (count==nFiles) {
			createArray();
			//anzeige auf letzten Timestamp stellen
			//endTime = getMinMaxOf2DIndex(stringArray, timestamp).max-1;
			//startTime = getMinMaxOf2DIndex(stringArray, timestamp).min;
			printArray();
			startup();
		}
	}; //hier darf man keine parameter übergeben wie (xhr[i], msg) sonst funktioniert das blöde XMLHttpRequest nicht richtig 
	xhttpr.send(null);
	return xhttpr;
}
