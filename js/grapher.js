
class Grapher {
	constructor(loader) {

	this.loader=loader;
	this.loader.grapher=this;

	//grafik parameter
	this.height=500;
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
		var yMax=this.getMinMaxOf2DIndex(this.loader.stringArray.slice(this.arrayStart, this.arrayEnd), value).max;

		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';

		this.context.setLineDash([]);
		this.context.strokeStyle = color;
		this.context.lineWidth=1;

		this.context.beginPath();
		this.context.moveTo(  this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.startTime, this.width ),
		 		 this.height - this.loader.stringArray[this.arrayStart][value] / yMax*0.9*this.height );

		for (var i=this.arrayStart; i<this.arrayEnd; i++)
		{
			this.context.lineTo( this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.stringArray[i][timestamp], this.width ),
					this.height-(this.loader.stringArray[i][value]/yMax*0.9*this.height));
		}

		if (solid==true)
		{
		this.context.lineTo( this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.stringArray[this.arrayEnd-1][timestamp], this.width ),
			this.height-(this.loader.stringArray[this.arrayEnd-1][value]/yMax*0.9*this.height));
	
		this.context.lineTo( this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.stringArray[this.arrayEnd-1][timestamp], this.width ),
			this.height);
	
		this.context.lineTo(0, this.height);
			this.context.closePath();
			this.context.fillStyle = fill;
			this.context.fill();
		}
		this.context.stroke();
	}
}
