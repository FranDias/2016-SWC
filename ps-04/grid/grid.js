
    var canvas = document.getElementById('canvas');
    var drawingPad = canvas.getContext('2d');

    drawingPad.fillStyle = "#E5E5E5";

    drawingPad.fillRect(90, 90, 62, 62);
    drawingPad.fillRect(90, 165, 62, 62);
    drawingPad.fillRect(90, 240, 62, 62);

    drawingPad.fillRect(165, 90, 62, 62);
    drawingPad.fillRect(165, 165, 62, 62);
    drawingPad.fillRect(165, 240, 62, 62);

    drawingPad.fillRect(240, 90, 62, 62);
    drawingPad.fillRect(240, 165, 62, 62);
    drawingPad.fillRect(250, 240, 92, 92);


    var color;
    var setColor = function(hue, saturation, lightness, alpha) {
      var colorString = "hsl("+hue+", "+saturation+"%,"+lightness+"%,"+alpha+")";
      drawingPad.fillStyle = colorString;
    };

    // drawingPad.fillRect(0, 0, 20, 20);
    for (var x = 0 ; x <= 50; x++) {
      // lightness = (10 * x) + "%";
      for (var y = 0 ; y <= 115; y++) {
        setColor(0, 0, 0, 0.5)
      drawingPad.fillRect(x * 15, y * 15, 2, 2);


    }
    }
