  var cx = document.querySelector("canvas").getContext("2d");
  var drawingPad = canvas.getContext('2d');

  drawingPad.strokeStyle = "#000000";


cx.beginPath();
for (var y = 10; y <= 333; y+=15){
  cx.moveTo(0+y,y);
  cx.lineTo(150+y,y);
  cx.moveTo(0+y,195+y);
  cx.lineTo(195+y,195+y);
  cx.lineWidth=5;

}

cx.stroke();
