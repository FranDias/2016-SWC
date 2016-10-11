var cx = document.querySelector("canvas").getContext("2d");
var drawingPad = canvas.getContext('2d');

cx.strokeStyle = "#828282";

cx.beginPath();
for (var y = 100; y <= 333; y += 10) {
  cx.moveTo(1000, y);
  cx.lineTo(10, 1000);
  cx.moveTo(1000, y);
  cx.lineTo(100, 100);
cx.stroke();
}
