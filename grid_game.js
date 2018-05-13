var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");
draw_grid(800, 500);
c.addEventListener("click", place_rect, false);

function draw_grid(width, height){

for (i = 0; i < width/100; i++) {
    ctx.moveTo(i * 100,0);
    ctx.lineTo(i * 100,500);
}
for (i = 0; i < height/100; i++) {
    ctx.moveTo(0, i * 100);
    ctx.lineTo(800, i * 100);
}
ctx.stroke();
}

function clear_cvs(){
    ctx.clearRect(0, 0, 800, 500);
}

function place_rect(event){
var rect = c.getBoundingClientRect();
var xcor = Math.round((event.clientX-rect.left)/(rect.right-rect.left)*c.width);
var ycor = Math.round((event.clientY-rect.top)/(rect.bottom-rect.top)*c.height);
var xplace;
var yplace;
clear_cvs();

if (xcor > 0 && xcor < 100){
    xplace = 0;
}
if (xcor > 100 && xcor < 200){
    xplace = 100;
}
if (xcor > 200 && xcor < 300){
    xplace = 200;
}
if (xcor > 300 && xcor < 400){
    xplace = 300;
}
if (xcor > 400 && xcor < 500){
    xplace = 400;
}
if (xcor > 500 && xcor < 600){
    xplace = 500;
}
if (xcor > 600 && xcor < 700){
    xplace = 600;
}
if (xcor > 700 && xcor < 800){
    xplace = 700;
}

if (ycor > 0 && ycor < 100){
    yplace = 0;
}
if (ycor > 100 && ycor < 200){
    yplace = 100;
}
if (ycor > 200 && ycor < 300){
    yplace = 200;
}
if (ycor > 300 && ycor < 400){
    yplace = 300;
}
if (ycor > 400 && ycor < 500){
    yplace = 400;
}
ctx.fillRect(xplace, yplace, 100, 100);
ctx.stroke();
};
