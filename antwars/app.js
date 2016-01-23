function startGame() {
  var request = new Object();
  request.playerName = "Erwin";
  request.botName="jsBot",
  request.botVersion="0.1";
  sendRequest("https://antwars.azurewebsites.net/api/game/start",request,function(response){
		log(response);
		calculateMoves(response); 
  });
}

function calculateMoves(response){
	var moves = response.units.map(function(unit){
		return {
			unitId: unit.id,
			order: getMove(unit)
		};
	});	
	log(moves);
	
	if(response.state < 3){
		sendRequest(response.links.move.href,moves,function(response){
			log(response);
			calculateMoves(response); 
		});
	} else {
		log('DONE');
	}
}

function getMove(unit){
	if(unit.type == 'AntHill'){
		return getAntHillMove(unit);
	} else if(unit.type == 'Ant'){
		return getAntMove(unit);
	}
}

function log(text){
	//document.getElementById("demo").innerHTML = text;
	console.log(text);
}

function sendRequest(url,request,callback){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	 if (xhttp.readyState == 4 && xhttp.status == 200) {
		callback(JSON.parse(xhttp.responseText));
	 }
   };
    
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhttp.send(JSON.stringify(request));
}