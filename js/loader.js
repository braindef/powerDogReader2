//global variabeln
var nFiles=6;
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


//MAIN:
loadFiles();

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
	
	for(i=0; i<stringArray.length; i++)
	{
		myString += stringArray[i][timestamp] + ": ";
		myString += stringArray[i][pac] + " - ";
		myString += stringArray[i][pdc] + " - ";
		myString += stringArray[i][udc] + " - ";
		myString += stringArray[i][temp] + "<br>";
	}
	//div.innerHTML = myString;
	console.log(myString);
	//console.log(Date.getUnixTime());
	console.log(new Date().getTime());
}


function loadFiles()
{
	for (i=0; i<nFiles; i++)
	{
	
		//Hinweis, allenfalls fetch und promise verwenden
		xhr[i] = new XMLHttpRequest();
		xhr[i].open('POST', i+'.txt', true);

		xhr[i].onload = function () {
			count++;
			if (count==nFiles) {
				createArray();
				printArray();
				startup();
				printGraph();
			}
		}; //hier darf man keine parameter übergeben wie (xhr[i], msg) sonst funktioniert das blöde XMLHttpRequest nicht richtig 
	xhr[i].send(null);
	}
}

