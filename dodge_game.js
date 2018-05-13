var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var xmove_value = 2;
var ymove_value = 2;

var xcor = 200;
var ycor = 100;
var inter = setInterval(draw_circle, 10);
var level_inter = setInterval(new_level, 10000);
var obs_vars = ['obs1', 'obs2', 'obs3', 'obs4', 'obs5', 'obs6', 'obs7', 'obs8', 'obs9', 'obs10', 'obs11', 'obs12', 'obs13', 'obs14'];
var keys = [];
var key_prs = 0;
var colors = ['black', 'blue', 'green', 'yellow', 'pink', 'orange'];
var col_ctr = 2;
var lvl_ctr = 0;
var life_ctr = 20;
new_level();
var is_coin = 1;
var score = 0;

window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = e.keyCode;
    },
false);

window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);

window.addEventListener('keydown',
    function(e){
        key_prs = e.keyCode;
    },
false);

function draw_circle(){
    ctx.clearRect(0, 0, 800, 500);
    give_values(0);
    check_position();
    check_color();
    coin();
    ctx.beginPath();
    ctx.arc(xcor, ycor, 20, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fillStyle= colors[col_ctr];
    give_values(1);
    ctx.fill();
}

function check_position(){
    if(keys.indexOf(65) > -1){
        xcor -= 4;
}
    if(keys.indexOf(87) > -1){
        ycor -= 4;
}
    if(keys.indexOf(68) > -1){
        xcor += 4;
}
   if(keys.indexOf(83) > -1){
        ycor += 4;
}
   if(xcor >= 775){
        xcor = 775;
}
   else if(xcor <= 25){
        xcor = 25;
}
   if(ycor >= 475){
        ycor = 475;
}
   else if(ycor <= 25){
        ycor = 25;
}
}

function check_color(){
   if(key_prs == 81){
        col_ctr -= 1;
}
   else if(key_prs == 69){
        col_ctr += 1;
}
    if(col_ctr > 6){
        col_ctr =0;
}
   else if(col_ctr < 0){
        col_ctr =6;
}
    if(key_prs == 82){
        first_rec.height += 10;
        first_rec.width += 10;
}
key_prs = 0;
}

function obstical(xcord, ycord, width, height){
	this.xcord = xcord;
	this.ycord = ycord;
	this.width = width;
	this.height = height;
	this.xmove = xmove_value;
	this.ymove = ymove_value;
	this.make = function() {
		ctx.fillRect(this.xcord, this.ycord, this.width, this.height);
	};
	this.movex = function() {
		this.xcord += this.xmove;
		if(this.xcord > c.width - this.width || this.xcord < 0){
			this.xmove = -this.xmove;
		}
	};
	this.movey = function() {
		this.ycord += this.ymove;
		if(this.ycord > c.height - this.height || this.ycord < 0){
			this.ymove = -this.ymove;
		}
	};
this.check_hit = function() {
		if((xcor > this.xcord - 20 && xcor < this.xcord + this.width + 15)&&(ycor > this.ycord - 20 && ycor < this.ycord + this.height + 15)){
			ctx.fillStyle = 'red';
			life_ctr -= 1;
			document.getElementById("lives").innerHTML ='lives remaining: ' + (life_ctr).toString();
			if(life_ctr <= 0){
				ctx.clearRect(0, 0, 800, 500);
				clearInterval(inter);
				clearInterval(level_inter);
				document.getElementById("over").innerHTML ="game over";
			}
		}
	};
}
function make_obsticals(){
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].make();
		arguments[i].movex();
		arguments[i].movey();
  	}
}
function check_hits(){
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].check_hit();
  	}
}
function new_level(){
        is_coin = 0;
	x = Math.floor((Math.random() * 800) + 1); 
	y = Math.floor((Math.random() * 500) + 1);
	window[obs_vars[lvl_ctr]] = new obstical(x, y, 30, 30);
	document.getElementById("Level").innerHTML ='current level: ' + (lvl_ctr + 1).toString();
	if(lvl_ctr == 14){
		document.getElementById("Level").innerHTML ='current level: ' + (lvl_ctr + 1).toString() + ' Max Level';
	}
	else{
		lvl_ctr += 1;
}
}
function give_values(TF){
	if(TF == 1){
		for (var i = 0; i < lvl_ctr; i++) {
			window[obs_vars[i]].check_hit();
  		}
	}
	else if(TF == 0){
		for (var i = 0; i < lvl_ctr; i++) {
			make_obsticals(window[obs_vars[i]]);
  		}
	}
}
function coin(){
if(is_coin == 1){
	x = Math.floor((Math.random() * 800) + 1); 
	y = Math.floor((Math.random() * 500) + 1);
	is_coin = 0;
}
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fillStyle= 'yellow';
	ctx.fill();
	ctx.fillStyle= colors[col_ctr];

 if((xcor + 20 > x - 10)&&(xcor - 20 < x + 10)&&(ycor + 20 > y - 10)&&(ycor - 20 < y + 10)){
		score += 1;
		is_coin += 1;
		document.getElementById("score").innerHTML ='score: ' + (score).toString();
	}
}
