
var canvas = document.getElementById("canvas");
var cx = canvas.getContext("2d");
cx.beginPath();
for (var y = 100; y<425; y+=10){
   cx.moveTo(140,y);
   cx.lineTo(155,y+20);

   cx.moveTo(160,y+40);
   cx.lineTo(175,y+20);

   cx.moveTo(190,y+60);
   cx.lineTo(205,y+40);

   cx.moveTo(210,y);
   cx.lineTo(225,y+20);

   cx.moveTo(235,y+40);
   cx.lineTo(250,y+20);

   cx.moveTo(255,y+40);
   cx.lineTo(270,y+20);

   cx.moveTo(300,y+40);
   cx.lineTo(285,y+20);

   cx.moveTo(305,y+40);
   cx.lineTo(320,y+20);

   cx.moveTo(330,y+40);
   cx.lineTo(345,y+20);

   cx.moveTo(365,y+40);
   cx.lineTo(350,y+20);

}
cx.stroke();
