//grafik parameter
var height=500;
var width=800;

var startTime = 0;
var endTime = 0;

var arrayStart=0;
var arrayEnd=100;


function find(array, index, value) {
	for (i=0; i<array.length; i++)
		if (array[i][index] > value)
		{	
			return i;
		}
}

function getMinMaxOf2DIndex (arr, idx) {
    return {
            min: Math.min.apply(null, arr.map(function (e) { return e[idx]})),
            max: Math.max.apply(null, arr.map(function (e) { return e[idx]}))
        }
} 

function getArrayFromTimestamp(startTime, endTime)
{

}


function timeToPixel(startTime, endTime, time, width)
{
	return (time - startTime)/(endTime-startTime)*width;
}


function moveLeft() {
	startTime-=600;	
	endTime-=600;	
	arrayStart = find(stringArray, timestamp, startTime);
	arrayEnd = find(stringArray, timestamp, endTime);
	//alert(startTime + " " + endTime + " -- " + arrayStart + " " + arrayEnd);
	printGraph();
}


function moveRight() {
	startTime+=600;	
	endTime+=600;	
	arrayStart = find(stringArray, timestamp, startTime);
	arrayEnd = find(stringArray, timestamp, endTime);
	//alert(startTime + " " + endTime + " -- " + arrayStart + " " + arrayEnd);
	printGraph();
}


function startup() {
	startTime = document.getElementById("startTime").value;
	endTime = document.getElementById("endTime").value;
	
	arrayStart = find(stringArray, timestamp, startTime);
	arrayEnd = find(stringArray, timestamp, endTime);

	printGraph();
}


var canvas;
var context;

function printGraph() {
	
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	printSubGraph(pdc, "#FF0000", true, "rgba(255, 0, 255, 0.6)");
	printSubGraph(pac, "#FFFF00", true), "rgba(255, 255, 0, 0.6)";
	printSubGraph(udc, "#0000FF", false, "" );
	printSubGraph(temp, "#555555", false, "" );
}



function printSubGraph(value, color, solid, fill)
{

	var yMax=getMinMaxOf2DIndex(stringArray, value).max;



	context.lineCap = 'round';
	context.lineJoin = 'round';

	context.setLineDash([]);
	context.strokeStyle = color;
	context.lineWidth=2;

	context.beginPath();
	context.moveTo(  timeToPixel ( startTime, endTime, startTime, width ),
	 		 height-stringArray[arrayStart][value]);

	for (i=arrayStart; i<arrayEnd; i++)
	{	
		context.lineTo( timeToPixel ( startTime, endTime, stringArray[i][timestamp], width ),
				height-(stringArray[i][value]/yMax*0.9*height));
	}
		context.lineTo( timeToPixel ( startTime, endTime, stringArray[arrayEnd][timestamp], width ), 
				height-(stringArray[i][value]/yMax*0.9*height));

		context.lineTo( timeToPixel ( startTime, endTime, endTime, width ), 
				height);
	
	context.lineTo(0, height);
	
	context.closePath();
	context.stroke();

	if (solid==true)
	{
		context.fillStyle = fill;
		context.fill();
	}
}

