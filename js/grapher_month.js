
class Grapher {
	constructor(loader) {

	this.loader=loader;
	this.loader.grapher=this;

	this.height=600;
	this.width=800;

	this.canvas=this.loader.canvas;
	this.context;


	this.arrayStart=0;
	this.arrayEnd=28;

	this.days;

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


	moveLeft() {
		this.loader.timestamp = this.loader.timestamp - month;
		this.loader.loadFile(this.loader.timestamp);
		this.startup();
	}

	
	moveRight() {
		this.loader.timestamp = this.loader.timestamp + month;
		this.loader.loadFile(this.loader.timestamp);
		this.startup();
	}


	startup() {
		this.printGraph();
	}


	getYmax()
	{
		this.yMax=this.getMinMaxOf2DIndex(this.loader.stringArray.slice(this.arrayStart, this.arrayEnd), pac_max).max;
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

		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		var title = months[new Date(this.loader.timestamp*1000).getMonth()] +" "+ new Date(this.loader.timestamp*1000).getFullYear();

		this.context.beginPath();
		this.context.strokeStyle = "#000000";
		this.context.lineWidth = 0;
		this.context.fillStyle = "#0000FF";
		this.context.font = "30px Arial";
		this.context.fillText(title,width/2, 35);
		this.context.closePath();

		this.yMax = this.loader.site.yMax;

		this.context.lineWidth = 1;
		this.makeGridHorizontal(offsetX, offsetY, width, height);
		this.makeGridVertical(offsetX, offsetY, width, height);

		this.printSubGraph(produces_day, "#FF0000", true, "rgba(255, 0, 0, 0.6)");
		this.printSubGraph(pac_max, "#FFFF00", true, "rgba(255, 255, 0, 0.6)");

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
		this.context.moveTo( offsetX , offsetY + height);


		this.days = this.daysInMonth(new Date(this.loader.timestamp*1000).getMonth()+1, new Date(this.loader.timestamp*1000).getFullYear()); 


		for (var i=this.arrayStart; i<this.days; i++)
		{
			if (i<this.arrayEnd-1) {
				this.context.lineTo( offsetX + i * width/(this.days), this.height - offsetY - this.loader.stringArray[i][value] / this.yMax * height * 0.9);
			}
			if (i>this.arrayEnd-1) {
				this.context.lineTo( offsetX + (i-1) * width/(this.days), this.height - offsetY );
			//	alert(( offsetX + (i-1) * width/(this.days), this.height - offsetY ));
			}
			
		}

		
		this.context.lineTo( offsetX + width, this.height - offsetY );

		this.context.closePath();
		
		this.context.fillStyle = fill;
		
		this.context.fill();
	
		this.context.stroke();
	}

		makeGridHorizontal(startX, startY, endX, endY)
	{
		for (var i=2; i<11; i++)
		{
			this.drawLine( this.width/12, this.height/12*i, this.width/12*11, this.height/12*i );
		}
	}

	daysInMonth (month, year) {
	    return new Date(year, month, 0).getDate();
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



		steps = this.days; 
		for (var i=0; i<this.days; i++)
			{
				this.drawLine(   drawBegin+drawWidth/steps*(i+1), this.height/12*1, 
						 drawBegin+drawWidth/steps*(i+1), this.height/12*11);
				this.drawLabelX( drawBegin+drawWidth/steps*(i+1), this.height/12*11+(i%2)*20-10,
						 i+1);
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
			this.drawLabelY(this.width/12, this.height/12*i, ((label/1000)/0.9).toFixed(0)+" kWh");
		}
	}

	drawLegendX()
	{
		for (var i=0; i<11; i++)
		{
			var label = new Date(this.loader.startTime+i*hour).getHours();
			////alert(label);
			this.drawLabelX(this.width/12*i, this.height/12*11, 4);
		}
	}
	

	drawLabelX(x, y, value)
	{
		//this.drawLine( x, y-5, x, y+5 );
		
		this.context.beginPath();
		this.context.strokeStyle = "#000000";
		this.context.lineWidth = 0;
		this.context.fillStyle = "#000000";
		this.context.font = "15px Arial";
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
		this.context.font = "15px Arial";
		this.context.fillText(value,x-60,y);
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
