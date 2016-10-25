var myCanvas = document.getElementById('corpse');
var drawingPad = myCanvas.getContext('2d');
var circleDegrees = 2 * Math.PI;
var y0  = 0;
var y1 = 240;
var y2 = 480;
var height = y3 = 720;
var x0 = 0;
var x1 = 125; // left connection
var x2 = 275; // right connection
var width = x3 = 400;
var horizontalCenter = 200; // centerLine

var kateterrado = {};

var drawImage = function(filename, ctx, x, y) {
  var img = document.createElement("img");
  img.src = filename;
  img.addEventListener("load", function() {
    ctx.drawImage(img, x, y);
  });
}

kateterrado.drawGrid = function(ctx) {
  ctx.beginPath();
  ctx.moveTo(x1,y0);
  ctx.lineTo(x1,y3);

  ctx.moveTo(x2,y0);
  ctx.lineTo(x2,y3);

  ctx.moveTo(x1,y0);
  ctx.lineTo(x1,y3);

  ctx.moveTo(x0,y1);
  ctx.lineTo(x3,y1);

  ctx.moveTo(x0,y2);
  ctx.lineTo(x3,y2);
  ctx.stroke();
}


kateterrado.drawTop = function(ctx) {
  drawImage('head.jpg', ctx, 0, 0);
};

kateterrado.drawMiddle = function(ctx) {
  drawImage('arms.jpg', ctx, 0, 240);
  // draw the rest of the body...
};

kateterrado.drawBottom = function(ctx) {
  drawImage('legs.jpg', ctx, 0, 480);
};

kateterrado.drawCorpse = function(ctx) {
  kateterrado.drawTop(ctx);
  kateterrado.drawMiddle(ctx);
  kateterrado.drawBottom(ctx);
  kateterrado.drawGrid(ctx);
};

window.kateterrado = kateterrado;
