
var myCanvas = document.getElementById('canvas');
var drawingPad = myCanvas.getContext('2d');
var degToRad = Math.PI/2;

var getColor = function(hue, saturation, lightness, alpha) {
  var colorString = "hsla(" +
    hue + ", "
    + saturation + "%,"
    + lightness  + "%,"
    + alpha + ")";
  return colorString
};


var drawItem = function(ctx, size, rotation) {
 ctx.rotate(rotation * degToRad);
  // ctx.fillStyle = getColor(0,0,10,1);
  ctx.beginPath();
    // ctx.moveTo(0,100);
    // ctx.lineTo(100,100);
    ctx.moveTo(0,100);
    ctx.lineTo(0,-100);
    ctx.moveTo(0,100);
    ctx.lineTo(200,100);
    ctx.moveTo(0,-100);
    ctx.lineTo(200,-100);

    ctx.moveTo(0,0);
    ctx.lineTo(200,0);
    ctx.lineWidth=25;


    ctx.stroke();

};

var grid = function(numX, numY) {
  var gridSize = Math.floor(myCanvas.width / numX);
  var actualWidth = gridSize * numX;
  var extraSpace = myCanvas.width - actualWidth;
  var padding = extraSpace / 2;
  var rotation = 5;

  // translate to distribute the 'extraSpace' as margins.
  drawingPad.translate(padding, padding);

  // translate again to draw from the center of our gridSize
  drawingPad.translate(gridSize * .5, .5 * gridSize);

  for(var y = 2 ; y < numY; y++) {
    for(var x = 0 ; x < numX; x++) {
      var xOffset = x * gridSize;
      var yOffset = y * gridSize;
      var scale = (numY/y) * .02;
      rotation = rotation + 1;
      drawingPad.save();
      drawingPad.translate(xOffset, yOffset);
      drawingPad.scale(scale, scale);
      drawItem(drawingPad, gridSize, rotation);
      drawingPad.restore();
    }
  }
}

grid(12,11);
