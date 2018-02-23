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


function timeToPixel(startTime, endTime, time, width)
{
	//alert((time - startTime)/(endTime-startTime)*width);
	return (time - startTime)/(endTime-startTime)*width;
}


function moveLeft() {
	arrayStart-=5;
	arrayEnd-=5;
	printGraph();
}

function moveRight() {
	arrayStart+=5;
	arrayEnd+=5;
	printGraph();
}

function startup() {
	startTime = document.getElementById("startTime").value;
	endTime = document.getElementById("endTime").value;
	
	arrayStart = find(stringArray, timestamp, startTime);
	arrayEnd = find(stringArray, timestamp, endTime);

	printGraph();
}


function printGraph(startTime, endTime)
{

	var udcMax=getMinMaxOf2DIndex(stringArray, udc).max;
	var pacMax=getMinMaxOf2DIndex(stringArray, pac).max;	//ich verwende dieses nicht, der PDC ist immer ähnlich wie der PAC, verwendet man nur einen Skalierungsfaktor braucht man nur eine Skala
	var pdcMax=getMinMaxOf2DIndex(stringArray, pdc).max;
	var tempMax=getMinMaxOf2DIndex(stringArray, temp).max*2;


	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.lineCap = 'round';
	context.lineJoin = 'round';


	// -------------- PAC ------------------
	
	context.setLineDash([]);
	context.strokeStyle = '#000000';
	context.lineWidth=2;

	context.beginPath();
	context.moveTo(  timeToPixel ( stringArray[arrayStart][timestamp], stringArray[arrayEnd][timestamp], stringArray[arrayStart][timestamp], width )
	 		,height-stringArray[arrayStart][pac]);

	for (i=arrayStart; i<arrayEnd; i++)
	{	
		context.lineTo( timeToPixel ( stringArray[arrayStart][timestamp], stringArray[arrayEnd][timestamp], stringArray[i][timestamp], width ),
				height-(stringArray[i][pac]/pdcMax*0.9*height));
	}
		context.lineTo( timeToPixel ( stringArray[arrayStart][timestamp], stringArray[arrayEnd][timestamp], stringArray[arrayEnd][timestamp], width ), 
				height-(stringArray[i][pac]/pdcMax*0.9*height));
		context.lineTo( timeToPixel ( stringArray[arrayStart][timestamp], stringArray[arrayEnd][timestamp], stringArray[arrayEnd][timestamp], width ), 
				height);
		context.lineTo(0, height);
	context.closePath();
	context.stroke();
	context.fillStyle = "rgba(255, 0, 0, 0.6)";
	context.fill();


}

