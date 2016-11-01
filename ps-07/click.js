var canvas = document.getElementById('canvas');
canvas.addEventListener("mousedown", doMouseDown, false);

var ctx = canvas.getContext('2d');


function doMouseDown(event){
ctx.clearRect(0, 0, 500, 500);

var circleX = event.clientX - canvas.offsetLeft;
var circleY = event.clientY - canvas.offsetTop;

ctx.beginPath();
ctx.arc(circleX, circleY, 50, 0, Math.PI*2, true);
ctx.fillStyle = "#000000";
ctx.fill();
}
