
class Loader {
	constructor(stringID, canvas, site) {

		this.stringID = stringID;
		this.canvas = canvas;
		this.site = site;
	
		//File Hander Stuff
		this.xhttpr;
		this.lines;

		this.stringArray=[];

		this.timestamp;
		
		this.myString;

		this.grapher;

	}


	createArray()
	{	
		this.lines = this.xhttpr.response.split(/\r\n|\r|\n/).length;
		this.grapher.arrayEnd=this.lines-1;

		for (var i=0; i<this.lines-1-1; i++)
			for (var j=0; j<9; j++)
			{
				this.stringArray[i]=[];
				this.stringArray[i][j]=0;
			}
		

			for (var i=0; i<this.lines-1-1; i++)
			{
				this.stringArray[i][date] = this.xhttpr.response.split("\n")[i+1].split(";")[date] ;
				this.stringArray[i][produces_day] = this.xhttpr.response.split("\n")[i+1].split(";")[produces_day] ;
				this.stringArray[i][pac_max] = this.xhttpr.response.split("\n")[i+1].split(";")[pac_max] ;
			}
		
		this.lastFileTime = this.getMinMaxOf2DIndex(this.stringArray, date).max;
		this.firstFileTime = this.getMinMaxOf2DIndex(this.stringArray, date).min;
	}

	getMinMaxOf2DIndex (arr, idx) {
	    return {
		    min: Math.min.apply(null, arr.map(function (e) { return e[idx]})),
		    max: Math.max.apply(null, arr.map(function (e) { return e[idx]}))
		}
	} 


	printArray()
	{
		this.myString = "";

		//var div = document.getElementById('output');

		for(var i=0; i<this.stringArray.length; i++)
		{
			this.myString += this.stringArray[i][date] + ": ";
			this.myString += this.stringArray[i][produces_day] + " - ";
			this.myString += this.stringArray[i][pac_max] + " <br> ";
		}
		console.log(this.myString);
	}


	getFilenameByTimestamp(stringName, jsTimestamp)
	{
		var date = new Date(jsTimestamp);
		var month = date.getMonth()+1;
		var days = date.getDate();
		var year = date.getFullYear();
		var filename = stringName + "_avg_day_" + month + "_" + year + ".txt";
		return filename;
	}


	loadFile(monthTimestamp)
	{	
		//Hinweis, allenfalls fetch und promise verwenden
		
		this.timestamp = monthTimestamp;
		
		this.xhttpr = new XMLHttpRequest();
		var filename = this.getFilenameByTimestamp(this.stringID, monthTimestamp*1000);
		var nothingNew = true;
	
		var me = this;

		this.xhttpr.open('POST', filename, true);

		this.context = this.canvas.getContext("2d");
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.font="80px Calibri";
		this.context.fillStyle = '#FF0000'
		this.context.fillText("Loading Data...", this.grapher.width/5, this.grapher.height/2); //TODO
		this.xhttpr.filename = filename;
		this.xhttpr.onload = function () {
				me.createArray();
				me.printArray();
				me.site.setYmax (me.getMinMaxOf2DIndex(me.stringArray, produces_day).max);
				me.site.incCounter();
				me.grapher.startup();
		}; //hier darf man keine parameter übergeben wie (this.xhr[i], msg) sonst funktioniert das blöde XMLHttpRequest nicht richtig 
		this.xhttpr.send(null);
	}
}
