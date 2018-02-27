
class Grapher {
	constructor(loader) {

	this.loader=loader;
	this.loader.grapher=this;

	//grafik parameter
	//	this.height=loader.canvas.height;
	//	this.width=loader.canvas.width;
	this.height=600;
	this.width=800;


	this.arrayStart=0;
	this.arrayEnd=0;

	this.canvas=this.loader.canvas;
	this.context;


	}



	find(array, index, value) {
		for (var i=0; i<array.length; i++)
			if (array[i][index] > value)
			{	
				return i;
			}
		return array.length;
	}

	getMinMaxOf2DIndex (arr, idx) {
	    return {
		    min: Math.min.apply(null, arr.map(function (e) { return e[idx]})),
		    max: Math.max.apply(null, arr.map(function (e) { return e[idx]}))
		}
	} 


	timeToPixel(startTime, endTime, time, width)
	{
		return (time - this.loader.startTime)/(this.loader.endTime-this.loader.startTime)*width;
	}


	moveLeft() {
		this.loader.startTime-=hour;	
		this.loader.endTime-=hour;	
		console.log("Endtime: " + this.loader.endTime + " -- StartTime: " + this.loader.startTime);
		this.arrayStart = find(this.loader.stringArray, timestamp, loader.startTime);
		this.arrayEnd = find(this.loader.stringArray, timestamp, loader.endTime);
		this.loader.loadFiles();	
		this.printGraph();
	}


	moveRight() {
		loader.startTime+=hour;	
		endTime+=hour;
		console.log("Endtime: " + endTime + " -- StartTime: " + startTime);
		if (endTime>lastFileTime) endTime=lastFileTime;
		if (endTime>lastFileTime) startTime=lastFileTime - day;
		arrayStart = find(stringArray, timestamp, startTime);
		arrayEnd = find(stringArray, timestamp, endTime);
		loadFiles();
		printGraph();
	}


	startup() {
		this.arrayStart = this.find(this.loader.stringArray, timestamp, this.loader.startTime);
		this.arrayEnd = this.find(this.loader.stringArray, timestamp, this.loader.endTime);
		this.printGraph();
	}



	printGraph() {

		//this.canvas = document.getElementById("myCanvas");
		this.context = this.canvas.getContext("2d");
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
		this.printSubGraph(pac, "#FF0000", true, "rgba(255, 0, 0, 0.6)");
		this.printSubGraph(pdc, "#FFFF00", true, "rgba(255, 255, 0, 0.6)");
		this.printSubGraph(udc, "#0000FF", false, "" );
		this.printSubGraph(temp, "#555555", false, "" );
	}

	printSubGraph(value, color, solid, fill)
	{
		var width=this.width*10/12;
		var height=this.height*10/12;

		var offsetX = this.width/12;
		var offsetY = this.height/12;

		this.makeAxis(offsetX, offsetY, width, height);


		var yMax=this.getMinMaxOf2DIndex(this.loader.stringArray.slice(this.arrayStart, this.arrayEnd), value).max;

		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';

		this.context.setLineDash([]);
		this.context.strokeStyle = color;
		this.context.lineWidth=1;

		this.context.beginPath();
		//this.context.moveTo( offsetX + this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.startTime, width ),
		// 		 this.height - offsetY - this.loader.stringArray[this.arrayStart][value] / yMax * height );
	

		for (var i=this.arrayStart; i<this.arrayEnd; i++)
		{
			this.context.lineTo( offsetX + this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.stringArray[i][timestamp], width ),
					this.height - offsetY - this.loader.stringArray[i][value] / yMax * height);
		}

		if (solid==true)
		{
		this.context.lineTo( this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.stringArray[this.arrayEnd-1][timestamp], width ),
			this.height - offsetY - this.loader.stringArray[this.arrayEnd-1][value] / yMax * height);
	
		this.context.lineTo( this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.stringArray[this.arrayEnd-1][timestamp], width ),
			this.height - offsetY );
	
		this.context.lineTo(offsetX, this.height - offsetY );
			this.context.closePath();
			this.context.fillStyle = fill;
			this.context.fill();
		}
		this.context.stroke();
	}


	makeAxis(startX, startY, endX, endY)
	{

		this.context.beginPath();
		this.context.rect(startX,startY,endX,endY);
		this.context.lineWidth = 3;
		this.context.strokeStyle = "#000000";
		this.context.stroke();
		this.context.closePath();

		this.context.beginPath();
		this.context.strokeStyle = "#000000";
		this.context.lineWidth = 0;
		this.context.fillStyle = "#000000";
		this.context.font = "10px Arial";
		this.context.fillText("Hello World",10,50);
		this.context.closePath();
	}

	drawLine(x0, y0, x1, y1)
	{
		this.context.beginPath();
		this.context.strokeStyle = "#000000";
		this.context.moveTo( x0, y0 );
		this.context.lineTo( x1, y1 );
		this.context.stroke();
	}

}
