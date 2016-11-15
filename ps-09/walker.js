canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');

var randomWalker = (function () {
  var position = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var stepSize = 5;
  var points = [];
  var numPoints = 25;
  var height = 3000;
var width = 3000;

var clearScreen = function() {
  ctx.fillStyle = '#141414';
  // ctx.fillRect(500, 0, 500, 500);
};

 var init = function (configuration) {

    if(configuration && configuration.stepSize) {
      stepSize = configuration.stepSize;
    }





    document.body.appendChild(canvas);

    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.background = '#141414';

    animate();
  }

  var move = function(p) {
  var speed = p.speed;
  var direction = Math.random();
  if (direction < 0.60) { // move up
    p.y = p.y - speed;
  } else if (direction < 0.8) {
    p.x = p.x - speed;
  } else if (direction < 0.9) {
    p.y = p.y + speed;
  } else {
    p.x = p.x + speed;
  }
}

var makeColor = function(hue, sat, light, alph) {
  return "hsla(" + hue + "," + sat + "%," + light + "%," + alph + ")";
};


var drawPoints = function() {
  clearScreen();

  ctx.strokeStyle = '';

var wrap = function(point) {
  if (point.x > width) {
    point.x = 0;
    point.y = point.y + 10;
  }
  if (point.y > height) {
    point.y = 0;
  }
  if (point.y < 0) {
    point.y = height;
  }

};



  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    var hue = point.y / 5 + 100;
    move(point);
    wrap(point);
    ctx.fillStyle = makeColor(hue, 50, 50, 0.3);
    ctx.fillRect(point.x, point.y, point.size, point.size);
  }
  requestAnimationFrame(drawPoints);
};

var makePoints = function() {
  for (var i = 0; i < numPoints; i++) {
    var size = Math.random() * 5;
    var x = Math.random() * width;
    var speed = 10 - size;
    points.push({
      x: x,
      y: 500,
      size: size,
      speed: speed
    });
  }
};

makePoints();
requestAnimationFrame(drawPoints);

  var step = function () {
    var direction = ["left", "right", "up", "down"][~~(Math.random() * 10)];

    var makeColor = function(hue, sat, light, alph) {
    return "hsla(" + hue + "," + sat + "%," + light + "%," + alph + ")";

    };

    var hue = position.y / 20 + 100;

    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.strokeStyle =  makeColor(hue, 20, 50, 0.4);

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

randomWalker.init({ stepSize: 30 });
