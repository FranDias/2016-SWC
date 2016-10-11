  var cx = document.querySelector("canvas").getContext("2d");
  var drawingPad = canvas.getContext('2d');

cx.strokeStyle="hsl(10,10%,90%)";


  cx.beginPath();
  for (var y = 100; y < 3334; y += 10) {
    cx.moveTo(1000, y);
    cx.lineTo(10, 1000);
    cx.moveTo(1000, y);
    cx.lineTo(100, 100);

cx.stroke();
}
