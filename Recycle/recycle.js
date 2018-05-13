var c = document.getElementById("game");
var ctx = c.getContext("2d");

var keys = [];
var obs = [];
var obs_ctr = 0;
var gone_ctr = 0;

var p1 = new player(272/2, 500/2);

var inter = setInterval(draw_game, 10);
var obs_inter = setInterval(create_obj, 2500);


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

function draw_game(){
	ctx.clearRect(0, 0, c.width, c.height);
	move_obs();
	p1.change_pos();
}
function player(height, width){
	this.height = height;
	this.width = width;
	this.xcor = c.width/2;
	this.ycor = c.height - this.height;
	this.lives = 3;
	this.score = 0;
	this.img = new Image();
	this.img.src = "bin_vector.png";

	this.change_pos = function(){
		if(keys.indexOf(65)>-1){
			this.xcor-=8;
		}
		if(keys.indexOf(68)>-1){
			this.xcor+=8;
		}
		if(this.xcor >= c.width - this.width){
			this.xcor= c.width-this.width;
		}
		if(this.xcor <= 0){
			this.xcor = 0;
		}
		ctx.drawImage(this.img, this.xcor, this.ycor, this.width, this.height);
	}
}
function obj(xcor, pos, type){
	this.pos = pos;
	this.xcor = xcor;
	this.ycor = 0;
	this.type = type;
	this.img1 = new Image();
	this.img1.src = "pop_can.png"
	this.img2 = new Image();
	this.img2.src = "plastic_bottle.png";
	this.move = function(){
		if(this.type == 1){
			this.width = 30;
			this.ycor += 4;
			ctx.drawImage(this.img1, this.xcor, this.ycor, 30, 45);
		}
		else if(this.type == 2){
			this.width = 50;
			this.ycor += 4;
			ctx.drawImage(this.img2, this.xcor, this.ycor, 50, 75);
		}
	}
	this.check_gone = function(){
		if(p1.xcor + p1.width >= this.xcor && p1.xcor <= this.xcor+this.width && this.ycor >= c. height -p1.height){
			obs.splice(this.pos - gone_ctr, 1);
			gone_ctr += 1;
			p1.score += 1;
			document.getElementById("score").innerHTML ='score: '+(p1.score).toString();
		}
		else if(this.ycor >= c.height){
			obs.splice(this.pos - gone_ctr, 1);
			gone_ctr += 1;
			p1.lives -= 1;
			document.getElementById("lives").innerHTML ='lives: '+(p1.lives).toString();
			if(p1.lives <= 0){
				clearInterval(inter);
				clearInterval(obs_inter);
				window.alert("Game Over\n\nscore: " + (p1.score).toString());
			}
		}
	}
}
function create_obj(){ 
	var x = Math.floor((Math.random() * c.width) + 1);
	var type = Math.floor((Math.random()*2) + 1);
	obs.push(new obj(x, obs_ctr, type));
	obs_ctr += 1;
}

function move_obs(){
	for(i=0; i<obs.length; i++){
		obs[i].move();
		obs[i].check_gone();
	}
}



