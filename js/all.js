

document.body.innerHTML += '
	<div width="800">
		<canvas id="'+stringID+'" width="500" height="400" style="border:2px solid #d3d3d3; background-color: #FFFFFF">
		Your browser does not support the HTML5 canvas tag.</canvas><br>
		<button onclick="moveLeft()">&lt;</button>	
		<button onclick="moveRight()">&gt;</button>
		<input type="text" id="startTime" value="1518865004">
		<input type="text" id="endTime" value="1519008665">
		<button id="update" onclick="startup();">Update</button>
	</div>
':

