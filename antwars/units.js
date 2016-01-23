var land = '..';
var water = '~~';
var foodLand = '#.';
var foodWater = '#~';
var ant = 'a1';
var enemyAnt = 'a2';
var antHill = 'h1';
var enemyAntHill = 'h2';
var antOnTop = 'A1';
var enemyOnTop = 'A2';
function getAntHillMove(unit){
	return 'GA';
}

function getAntMove(unit){
	var foodIndex = closestFood(unit.vision);
	console.log('foodIndex',foodIndex);
	if(foodIndex >= 22 && foodIndex <= 24){
		return 'W';
	} else if(foodIndex >= 26 && foodIndex <= 28){
		return 'E';
	} else if(foodIndex >= 29){
		return 'S';
	} else if(foodIndex == 18){
		return 'H';
	}else {
		return 'M';
	}
		
}

function closestFood(vision){
	return vision.indexOf(foodLand)/2;
}