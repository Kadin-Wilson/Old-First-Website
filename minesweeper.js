var c = document.getElementById("game");
var ctx = c.getContext("2d");
draw_grid(c.width, c.height, 50);

var row_size = c.width/50;
var column_size = c.height/50;

var squares = [];

make_boxes();
c.addEventListener("click", check_hit, false);

function draw_grid(width, height, size){
	for (i = 0; i < width/size; i++) {
		ctx.moveTo(i * size, 0);
		ctx.lineTo(i * size, height);
	}
	for (i = 0; i < height/size; i++) {
		ctx.moveTo(0, i * size);
		ctx.lineTo(width, i * size);
	}

	ctx.stroke();
}

function box(pos){
	this.pos = pos;
	this.ismine = 0;
        this.ishit = 0;
        this.minectr = 0;
	this.centerx = this.pos[0]*50 -25;
	this.centery = this.pos[1]*50 -25;
	this.hit = function(){
		if(this.ismine == 1){
			ctx.beginPath();
                        ctx.fillStyle='red';
			ctx.arc(this.centerx, this.centery, 10, 0, Math.PI*2, true); 
			ctx.closePath();
			ctx.fill();
                        ctx.fillStyle='black';
		}
		if(this.ismine == 0){
                        this.ishit =1;
                        this.minectr = 0;
                        if(this.pos[0]<this.row_size){
                                for(p=0; p<squares.length; p++){
			               if(JSON.stringify(squares[p].pos) == JSON.stringify([this.pos[0]+1, this.pos[1]])){
                                                 if(squares[p].ismine==1){this.minectr+=1;}
			}
                        }
                        }
                         if(this.pos[0]>0){
                                for(p=0; p<squares.length; p++){
			               if(JSON.stringify(squares[p].pos) == JSON.stringify([this.pos[0]-1, this.pos[1]])){
                                                 if(squares[p].ismine==1){this.minectr+=1;}
			}
                        }
                        }
                         if(this.pos[1]<this.column_size){
                                for(p=0; p<squares.length; p++){
			               if(JSON.stringify(squares[p].pos) == JSON.stringify([this.pos[0], this.pos[1]+1])){
                                                 if(squares[p].ismine==1){this.minectr+=1;}
			}
                        }
                        }
                         if(this.pos[1]>0){
                                for(p=0; p<squares.length; p++){
			               if(JSON.stringify(squares[p].pos) == JSON.stringify([this.pos[0], this.pos[1]-1])){
                                                 if(squares[p].ismine==1){this.minectr+=1;}
			}
                        }
                        }
                        ctx.fillText(this.minectr.toString(),this.centerx-10,this.centery-10);
		}}
            }

function make_boxes(){
	for(i=0; i<row_size; i++){
		for(p=0; p<column_size; p++){
			squares.push(new box([i+1,p+1]));
		}
	}
	var rands = [];
	for(i=0; i<Math.floor(row_size*column_size/6); i++){
		var rand_cor=[];
		rand_cor.push(Math.floor((Math.random()*row_size)+1));
		rand_cor.push(Math.floor((Math.random()*column_size)+1));
		rands.push(rand_cor);
	}
	for(i=0; i<rands.length; i++){
		for(p=0; p<squares.length; p++){
			if(JSON.stringify(squares[p].pos) == JSON.stringify(rands[i])){
				squares[p].ismine = 1;
			}
		}
	}
}
function check_hit(event){
	var rect = c.getBoundingClientRect();
	var xclk = Math.round((event.clientX-rect.left)/(rect.right-rect.left)*c.width);
	var yclk = Math.round((event.clientY-rect.top)/(rect.bottom-rect.top)*c.height);
	for(i=0; i<squares.length; i++){
		if(xclk<squares[i].pos[0]*50 && xclk>squares[i].pos[0]*50-50 && yclk<squares[i].pos[1]*50 && yclk>squares[i].pos[1]*50-50){
			squares[i].hit();
		}
	}
}