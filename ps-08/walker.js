var randomWalker = (function () {
  var position = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  var stepSize = 5;

 var init = function (configuration) {

    if(configuration && configuration.stepSize) {
      stepSize = configuration.stepSize;
    }

    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.body.appendChild(canvas);

    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.background = '#141414';

    animate();
  }

  var step = function () {
    var direction = ["left", "right", "up", "down"][~~(Math.random() * 10)];

    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.strokeStyle =  "hsla(0,10%,100%,0.1)";

    switch(direction) {
      case "left":
        position.x -= stepSize;
        break;
      case "right":
        position.x += stepSize;
        break;
      case "up":
        position.y -= stepSize;
        break;
      case "down":
        position.y += stepSize;
    }

    return position;
  };

  var draw = function () {
    var next = step();
    ctx.lineTo(next.x, next.y);
    ctx.stroke();

  };

  function animate() {
    draw();
    requestAnimationFrame(animate);
  };

  return {
    init: init
  }

}());

randomWalker.init({ stepSize: 20 });
