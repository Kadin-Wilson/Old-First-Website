

function start_strobe(){
var Loop;
strobe();

Loop = setInterval(strobe, 4000);

}

function strobe(){

   strobe_light.style.backgroundColor = "blue";

   setTimeout(function(){ strobe_light.style.backgroundColor = "red"; }, 1000);

   setTimeout(function(){ strobe_light.style.backgroundColor = "green"; }, 2000);

   setTimeout(function(){ strobe_light.style.backgroundColor = "orange"; }, 3000);

}
