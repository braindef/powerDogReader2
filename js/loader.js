
//nFiles=0;
//count=0;



class Loader {
	constructor(stringID, canvas, site) {

		this.stringID = stringID;
		this.canvas = canvas;
		this.site = site;
	

		//File Hander Stuff
		this.nFiles=0;
		this.xhr=[];
		this.count=0;

		this.totalListLength = 0;


		this.firstFileTime = Math.floor( new Date() /1000 ) - 0.5 * day;
		this.lastFileTime = Math.floor( new Date() / 1000);

		this.alreadyLoaded = Math.floor( new Date() / 1000  );

		this.stringArray=[];

		this.myString;

		this.startTime = this.firstFileTime+1;
		this.endTime = this.lastFileTime-1;

		this.grapher;

	}




	addCounters()
	{
		for (var i=0; i<this.nFiles; i++)
		if (this.xhr[i].status==200)
		{
			this.xhr[i]["count"]=this.xhr[i].response.split("\n").length -1 - 1;  //schneidet CSV Header ab, zweites -1 berücksichtigt dass arrayfeld bei 0 beginnt
		}
		else
		{
			this.xhr[i]["count"]=0;
		}
	}

	countTotalRows()
	{
		this.totalListLength=0;
		for (var i=0; i<this.nFiles; i++)
		{
			console.log("X totalListLength: "+this.xhr[i].count);
			this.totalListLength += this.xhr[i].count;
		}
	}



	createArray()
	{
		this.addCounters();
		this.countTotalRows();

		this.stringArray = [this.totalListLength];

		for (var i=0; i<this.totalListLength; i++)
		{
			this.stringArray[i]=[];
			for (j=0; j<temp+1; j++)
				this.stringArray[i][j]=0;
		}

		var arrayCounter = 0;

		for (i=0; i<this.nFiles; i++)
		{
			for (var j=0; j<this.xhr[i].count; j++)
			{
				console.log("NOT ZERO:"+this.xhr[i].response.split("\n")[j+1].split(";")[timestamp] +"nFiles: "+this.nFiles + "totalListLength: "+this.totalListLength) ;
				this.stringArray[arrayCounter][timestamp] = this.xhr[i].response.split("\n")[j+1].split(";")[timestamp] ;
				this.stringArray[arrayCounter][pac] = this.xhr[i].response.split("\n")[j+1].split(";")[pac] ;
				this.stringArray[arrayCounter][pdc] = this.xhr[i].response.split("\n")[j+1].split(";")[pdc] ;
				this.stringArray[arrayCounter][udc] = this.xhr[i].response.split("\n")[j+1].split(";")[udc] ;
				this.stringArray[arrayCounter][temp] = this.xhr[i].response.split("\n")[j+1].split(";")[temp] ;

				arrayCounter+=1;
			}
		
		}

		this.stringArray.sort(function(a,b){
			    return a[timestamp] - b[timestamp];
		});


		this.lastFileTime = this.getMinMaxOf2DIndex(this.stringArray, timestamp).max;
		this.firstFileTime = this.getMinMaxOf2DIndex(this.stringArray, timestamp).min;
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
			console.log(" myString: "+ this.myString);
			this.myString += this.stringArray[i][timestamp] + ": ";
			this.myString += this.stringArray[i][pac] + " - ";
			this.myString += this.stringArray[i][pdc] + " - ";
			this.myString += this.stringArray[i][udc] + " - ";
			this.myString += this.stringArray[i][temp] + "<br>";
		}
		//div.innerHTML = myString;
	}


	getFilenameByTimestamp(stringName, jsTimestamp)
	{
		var date = new Date(jsTimestamp);
		var month = date.getMonth()+1;
		var days = date.getDate();
		var year = date.getFullYear();
		var filename = stringName + "_global_" + month + "_" + days + "_" + year + ".txt";
		return filename;
	}


	loadFiles()
	{
		//countFiles = 6;
		var countFiles = ( this.lastFileTime - this.startTime ) / day + 1;
		console.log("CountFiles: "+countFiles + " = " + this.lastFileTime + " - " + this.startTime + " day: " + day);

		//if (countFiles>10) return;

		var i=0;
		for (i=0; i<countFiles; i++)
		{
			{
				var Day;
				Day = this.lastFileTime - i * day;
				console.log("Day: "+Day+"=lastFileTime: "+this.lastFileTime);
				var file = this.loadFile( Day );
				if (file != null)				//file heisst versuch zu öffnen
					this.xhr.push( file );
			}
		}
	}


	loadFile(unixTimestamp)
	{	
		//Hinweis, allenfalls fetch und promise verwenden
		var xhttpr = new XMLHttpRequest();
		var filename = this.getFilenameByTimestamp(this.stringID, unixTimestamp*1000);
	
		for(var i=0; i<this.xhr.length; i++)
			if (this.xhr[i].filename == filename)
			{
				console.log("this.xhr[i].file==file");
				return null;
			}
		this.nFiles++;

		var me = this;

		xhttpr.open('POST', filename, true);
		xhttpr.filename = filename;
		xhttpr.onload = function () {
			me.count++;
			if (me.count==me.nFiles) {
				me.createArray();
				me.printArray();
				me.site.setYmax (me.getMinMaxOf2DIndex(me.stringArray, pdc).max);
				me.site.incCounter();
				me.grapher.startup();
			}
		}; //hier darf man keine parameter übergeben wie (this.xhr[i], msg) sonst funktioniert das blöde XMLHttpRequest nicht richtig 
		xhttpr.send(null);
		return xhttpr;
	}
}
