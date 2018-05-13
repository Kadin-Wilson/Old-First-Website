var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var xcor = 200;
var ycor = 100;
var inter = setInterval(draw_circle, 10);
var keys = [];
var key_prs = 0;
var colors = ['black', 'blue', 'green', 'yellow', 'pink', 'orange'];
var col_ctr = 2;

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
    draw_terrain();
    check_position();
    var check = check_crash();
    check_color();
    ctx.beginPath();
    ctx.arc(xcor, ycor, 20, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fillStyle= colors[col_ctr];
    ctx.fill();
    if(check == 0){
        ctx.beginPath();
        ctx.arc(xcor, ycor, 10, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fillStyle= 'red';
        ctx.fill();
}
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
key_prs = 0;
}

function check_crash(){
    if(xcor > 475 && xcor < 625){
        return 0;
}
    else{
        return 1;
}
}

function draw_terrain(){
    ctx.fillStyle= colors[0];
    ctx.fillRect(500, 0, 100, 500);
    ctx.fillStyle= colors[col_ctr];
}