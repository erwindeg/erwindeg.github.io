var moveUrl;

function startGame() {
  var request = new Object();
  request.playerName = "Erwin";
  request.botName="jsBot",
  request.botVersion="0.1";
  sendRequest("https://antwars.azurewebsites.net/api/game/start",request,function(response){
		console.log(response);
		moveUrl = response.links.move.href;
		console.log(moveUrl);  
  });
}

function move(){
		
}

function Ant(id,pos) {
	this.id = id;
	this.pos = pos;
}

function AntHill(id,pos) {
	this.id = id;
	this.pos = pos;
}

function pos(x,y){
	this.x=x;
	this.y=y;
}

function sendRequest(url,request,callback){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	 if (xhttp.readyState == 4 && xhttp.status == 200) {
		var response = JSON.parse(xhttp.responseText);
		callback(response);
	 }
   };
    
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhttp.send(JSON.stringify(request));
}