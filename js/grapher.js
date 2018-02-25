//grafik parameter
var height=500;
var width=800;

//var startTime = 0;

var arrayStart=0;
var arrayEnd=0;


function find(array, index, value) {
	for (i=0; i<array.length; i++)
		if (array[i][index] > value)
		{	
			return i;
		}
	return array.length;
}

function getMinMaxOf2DIndex (arr, idx) {
    return {
            min: Math.min.apply(null, arr.map(function (e) { return e[idx]})),
            max: Math.max.apply(null, arr.map(function (e) { return e[idx]}))
        }
} 


function timeToPixel(startTime, endTime, time, width)
{
	return (time - startTime)/(endTime-startTime)*width;
}


function moveLeft() {
	startTime-=hour;	
	endTime-=hour;	
	console.log("Endtime: " + endTime + " -- StartTime: " + startTime);
	arrayStart = find(stringArray, timestamp, startTime);
	arrayEnd = find(stringArray, timestamp, endTime);
	loadFiles();	
	printGraph();
}


function moveRight() {
	startTime+=hour;	
	endTime+=hour;
	console.log("Endtime: " + endTime + " -- StartTime: " + startTime);
	if (endTime>lastFileTime) endTime=lastFileTime;
	if (endTime>lastFileTime) startTime=lastFileTime - day;
	arrayStart = find(stringArray, timestamp, startTime);
	arrayEnd = find(stringArray, timestamp, endTime);
	loadFiles();
	printGraph();
}


function startup() {

	arrayStart = find(stringArray, timestamp, startTime);
	arrayEnd = find(stringArray, timestamp, endTime);
	//alert(arrayEnd);	
	printGraph();
}


var canvas;
var context;

function printGraph() {
	
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	printSubGraph(pac, "#FF0000", true, "rgba(255, 0, 0, 0.6)");
	printSubGraph(pdc, "#FFFF00", true, "rgba(255, 255, 0, 0.6)");
	printSubGraph(udc, "#0000FF", false, "" );
	printSubGraph(temp, "#555555", false, "" );
}



function printSubGraph(value, color, solid, fill)
{
	var yMax=getMinMaxOf2DIndex(stringArray.slice(arrayStart, arrayEnd), value).max;

	context.lineCap = 'round';
	context.lineJoin = 'round';

	context.setLineDash([]);
	context.strokeStyle = color;
	context.lineWidth=1;

	context.beginPath();
	context.moveTo(  timeToPixel ( startTime, endTime, startTime, width ),
	 		 height - stringArray[arrayStart][value] / yMax*0.9*height );

	for (i=arrayStart; i<arrayEnd; i++)
	{
		context.lineTo( timeToPixel ( startTime, endTime, stringArray[i][timestamp], width ),
				height-(stringArray[i][value]/yMax*0.9*height));
	}

	if (solid==true)
	{
	context.lineTo( timeToPixel ( startTime, endTime, stringArray[arrayEnd-1][timestamp], width ),
		height-(stringArray[arrayEnd-1][value]/yMax*0.9*height));
	
	context.lineTo( timeToPixel ( startTime, endTime, stringArray[arrayEnd-1][timestamp], width ),
		height);
	
	context.lineTo(0, height);
		context.closePath();
		context.fillStyle = fill;
		context.fill();
	}
	context.stroke();
}

