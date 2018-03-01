
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

	this.site;
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
		return (time - startTime)/(endTime-startTime)*width;
	}


	moveLeft() {
		this.loader.startTime-=hour*6;
		this.loader.endTime-=hour*6;
		this.loader.loadFiles();
		//this.loader.createArray();
		this.startup();
	}

	
	moveRight() {
		this.loader.startTime+=hour*6;
		this.loader.endTime+=hour*6;
		this.loader.loadFiles();
		//this.loader.createArray();
		this.startup();
	}


	startup() {
		this.arrayStart = this.find(this.loader.stringArray, timestamp, this.loader.startTime);
		this.arrayEnd = this.find(this.loader.stringArray, timestamp, this.loader.endTime);
		this.printGraph();
	}


	getYmax()
	{
		this.yMax=this.getMinMaxOf2DIndex(this.loader.stringArray.slice(this.arrayStart, this.arrayEnd), pdc).max;
		this.site.setYmax(yMax);	
	}
	
	printGraph() {

		//this.canvas = document.getElementById("myCanvas");
		this.context = this.canvas.getContext("2d");
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		var width=this.width*10/12;
		var height=this.height*10/12;

		var offsetX = this.width/12;
		var offsetY = this.height/12;

		//this.yMax=this.getMinMaxOf2DIndex(this.loader.stringArray.slice(this.arrayStart, this.arrayEnd), pdc).max;
		this.yMax = this.loader.site.yMax;

		this.context.lineWidth = 1;
		this.makeGridHorizontal(offsetX, offsetY, width, height);
		this.makeGridVertical(offsetX, offsetY, width, height);

		this.printSubGraph(pac, "#FF0000", true, "rgba(255, 0, 0, 0.6)");
		this.printSubGraph(pdc, "#FFFF00", true, "rgba(255, 255, 0, 0.6)");
		this.printSubGraph(udc, "#0000FF", false, "" );
		this.printSubGraph(temp, "#555555", false, "" );

		this.makeAxis(offsetX, offsetY, width, height);
	}

	printSubGraph(value, color, solid, fill)
	{
		var width=this.width*10/12;
		var height=this.height*10/12;

		var offsetX = this.width/12;
		var offsetY = this.height/12;


		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';

		this.context.setLineDash([]);
		this.context.strokeStyle = color;
		this.context.lineWidth=1;


		this.context.beginPath();


		if (solid==true)
		this.context.moveTo( offsetX + this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.startTime, width ),
		 		 this.height - offsetY  );
		 		 //this.height - offsetY - this.loader.stringArray[this.arrayStart][value] / this.yMax * height );


		for (var i=this.arrayStart; i<this.arrayEnd; i++)
		{
		this.context.lineTo( offsetX + this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.stringArray[i][timestamp], width ),
					this.height - offsetY - this.loader.stringArray[i][value] / this.yMax * height);
		}
		

		if (solid==true)
		{

			this.context.lineTo( offsetX + this.timeToPixel ( this.loader.startTime, this.loader.endTime, this.loader.stringArray[this.arrayEnd-1][timestamp], width), this.height - offsetY );

			this.context.closePath();
			this.context.fillStyle = fill;
			this.context.fill();
		}
		this.context.stroke();
	}

	makeGridHorizontal(startX, startY, endX, endY)
	{
		for (var i=2; i<11; i++)
		{
			this.drawLine( this.width/12, this.height/12*i, this.width/12*11, this.height/12*i );
		}
	}

	makeGridVertical(startX, startY, endX, endY)
	{
		var drawWidth=this.width/12*10;
		var drawBegin=this.width/12;
		var days = (this.loader.endTime - this.loader.startTime) / day;
		var hours = Math.round(24 * days);
		var steps;
		var datum = new Date(this.loader.startTime*1000);
		var startDay = datum.getDate();
		var offsetDays = datum.getHours()/24;
		var startHour = datum.getHours();
		var offsetHours = datum.getMinutes()/60;

		if (days>1 && days<8) {
			steps = days;
		for (var i=0; i<steps; i++)
			{
				this.drawLine(   drawBegin+drawWidth/steps*(i+1) - offsetDays * drawWidth / steps, this.height/12*1, 
						 drawBegin+drawWidth/steps*(i+1) - offsetDays * drawWidth / steps, this.height/12*11);
				this.drawLabelX( drawBegin+drawWidth/steps*(i+1) - offsetDays * drawWidth / steps, this.height/12*11,
						 ((1+startDay+i)%31).toFixed(0));
			}
			return;
		}
		
		if (days<1) {
			steps = hours;
			for (var i=0; i<steps; i++)
			{
				this.drawLine(   drawBegin+drawWidth/steps*(i+1) - offsetHours * drawWidth / steps, this.height/12*1, 
					         drawBegin+drawWidth/steps*(i+1) - offsetHours * drawWidth / steps, this.height/12*11);
				this.drawLabelX( drawBegin+drawWidth/steps*(i+1) - offsetHours * drawWidth / steps, this.height/12*11,
						 ((1+startHour+i)%24).toFixed(0));
			}
			return;
		}
		
		if (days<8) {
			steps = days;
		}
	}

	makeAxis(startX, startY, endX, endY)
	{

		this.context.beginPath();
		this.context.rect(startX,startY,endX,endY);
		this.context.lineWidth = 3;
		this.context.strokeStyle = "#000000";
		this.context.stroke();
		this.context.closePath();

		this.drawLegendY();
		//this.drawLegendX();
	}
	
	drawLegendY()
	{
		for (var i=2; i<11; i++)
		{
			var label = (12-i)/12 * this.yMax;
		//	alert(this.yMax);
			this.drawLabelY(this.width/12, this.height/12*i, (label/1000).toFixed(1.0));
		}
	}

	drawLegendX()
	{
		for (var i=2; i<11; i++)
		{
			var label = new Date(this.loader.startTime+i*hour).getHours();
			////alert(label);
			this.drawLabelX(this.width/12*i, this.height/12*11, label.toFixed(0));
		}
	}
	

	drawLabelX(x, y, value)
	{
		this.drawLine( x, y-5, x, y+5 );
		
		this.context.beginPath();
		this.context.strokeStyle = "#000000";
		this.context.lineWidth = 0;
		this.context.fillStyle = "#000000";
		this.context.font = "20px Arial";
		this.context.fillText(value,x-20,y+30);
		this.context.closePath();
	}

	drawLabelY(x, y, value)
	{
		this.drawLine( x-5, y, x+5, y );
		
		this.context.beginPath();
		this.context.strokeStyle = "#000000";
		this.context.lineWidth = 0;
		this.context.fillStyle = "#000000";
		this.context.font = "20px Arial";
		this.context.fillText(value,x-50,y);
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
