//global variabeln
var nFiles=0;	//TODO
var xhr=[];
var count=0;

//spaltenbenennung fürs array <-> csv
var timestamp=0;
var pac=5;
var pdc=6;
var udc=7;
var temp=8;

var min = 60;
var hour = 60 * min;
var day = 24 * hour;
var week = 7 * day;
var month = 30 * day;
var year = 365 * day;

var totalLength = 0;

var startTime = Math.floor( new Date() /1000 ) - 4 * day;		//TODO: doppelt
var endTime = Math.floor( new Date() / 1000) -1 * day;


var alreadyLoaded = Math.floor( new Date()  );

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
	 // Do stuff...
	alert("START");
	document.getElementById("startTime").value = startTime;
	document.getElementById("endTime").value = endTime;
	loadFiles();
});


function addCounters()
{
	var pdcMax=0;	
	
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
	for (i=0; i<nFiles; i++)
	{
		totalLength += xhr[i].count;
	}
}


var stringArray;

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

}

var myString;


function printArray()
{
	myString = "";

	var div = document.getElementById('output');

	alert("stringArray:"+stringArray.length);

	for(i=0; i<stringArray.length; i++)
	{
		myString += stringArray[i][timestamp] + ": ";
		myString += stringArray[i][pac] + " - ";
		myString += stringArray[i][pdc] + " - ";
		myString += stringArray[i][udc] + " - ";
		myString += stringArray[i][temp] + "<br>";
	}
	div.innerHTML = myString;
	//console.log(myString);
	//console.log(Date.getUnixTime());
	console.log(new Date().getTime());
}

//for (i=0; i<10; i++)
//getFileByTimestamp("B2_A2_S2", Math.floor( new Date() ) );

function getFileByTimestamp(stringName, jsTimestamp)
{
	var date = new Date(jsTimestamp);
	month = date.getMonth()+1;
	day = date.getDate();
	year = date.getFullYear();
	var filename = stringName + "_global_" + month + "_" + day + "_" + year + ".txt";
	//alert(filename);
	return filename;
}



function loadFiles()
{
	countFiles = parseInt(( endTime - startTime ) / day );
	alert("endtime: "+endTime+" startTime: "+startTime+" countFile: "+countFiles);
	for (i=0; i<countFiles; i++)
	{
		Day = Math.floor ( new Date()/1000 ) - i*24*hour ;	//TODO: Anderer Variabelname
		if (Day<alreadyLoaded)
		{
			alreadyLoaded=Day;
			xhr.push( loadFile( Day ) );
		}
	}
}



function loadFile(timestamp)
{	

	nFiles++;
	//alert("loadFile: " + timestamp);
		//Hinweis, allenfalls fetch und promise verwenden
		xhttpr = new XMLHttpRequest();
		filename = getFileByTimestamp("B2_A2_S2", timestamp*1000);
		xhttpr.open('POST', filename, true);

		xhttpr.onload = function () {
			count++;
			if (count==nFiles) {
				alert("TODO: "+ nFiles);	//if all files loaded continue
				createArray();
				printArray();
				startup();
			}
		}; //hier darf man keine parameter übergeben wie (xhr[i], msg) sonst funktioniert das blöde XMLHttpRequest nicht richtig 
	xhttpr.send(null);
	return xhttpr;
}
