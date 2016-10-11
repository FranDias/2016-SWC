
  var cx = document.querySelector("canvas").getContext("2d");
  var drawingPad = canvas.getContext('2d');

  drawingPad.strokeStyle = "#828282";

  cx.beginPath();
  for (var x = 0; x<3333; x+=10){
     cx.moveTo(0+x,0);
     cx.lineTo(0+x,200+x);
     cx.lineTo(200+x,200+x);
     cx.lineTo(200+x,600);
     cx.lineTo(600+x,400+x);
     cx.lineTo(500+x,500+x);
    //  cx.lineTo(500+x,500);

     cx.lineWidth=1;
  }
  cx.stroke();
