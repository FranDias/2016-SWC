
  var canvas = document.getElementById('canvas');
  var drawingPad = canvas.getContext('2d');

  drawingPad.fillStyle = "#E5E5E5";

  var color;
  var setColor = function(hue, saturation, lightness) {
    var colorString = "hsl("+hue+", "+saturation+"%,"+lightness+"%)";
    drawingPad.fillStyle = colorString;
  };
  // drawingPad.fillRect(0, 0, 20, 20);
  for (var x = 0 ; x <= 32; x++) {
    // lightness = (10 * x) + "%";
    for (var y = 0 ; y <= 32; y++) {
      setColor(0, 0, x*3)
    drawingPad.fillRect(x * 15, y * 10, 1, 300);


  }
  }
