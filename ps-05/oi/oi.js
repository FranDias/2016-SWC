
    var canvas = document.getElementById('canvas');
    var drawingPad = canvas.getContext('2d');

    drawingPad.fillStyle = "#000000";

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
      drawingPad.fillRect(x * 75, y * 75, 60, 60);


    }
    }
