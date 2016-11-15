var go = true;

window.onload = function(){
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            particles = {},
            particleIndex = 0,
            particleNum = 5;
        document.body.appendChild(canvas);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.id = "canvas";

        var xmin = 1;
        var xmax = canvas.width;
        var bgcolor = "#CCC";
        var canvasheight = canvas.height + 1;
        var deleteheight = canvas.height + 50;


        ctx.fillStyle = bgcolor;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        function Particle(){
            this.x = Math.floor(Math.random() * (xmax - xmin + 1)) + xmin;
            this.y = -60;

            var random1_2 = Math.random() * 4 - 1;
            if(random1_2 <= 2){
              this.vx = Math.random() * 0 - 0.5;
            } else if(random1_2 >= 2){
              this.vx = Math.random() * -0 - -0.5;
            }
            this.vy = 0;

            this.gravity = Math.random() * 9 - 6;
            this.life = 0;
            this.maxlife = 250;

            particleIndex++;
            particles[particleIndex] = this;
            this.id = particleIndex;

            this.size = Math.random() *  5;
            this.color = "rgba(255, 255, 255, 1)";

        }

        Particle.prototype.draw = function(){
			this.x += this.vx;
			this.y += this.vy;


			if(this.x > canvas.width || this.y > deleteheight){
				delete particles[this.id];
			}

        if(this.y >= canvasheight){
          this.life++;
          this.vy = 0;
          this.vx = 0;
          this.y = canvasheight;
        }

        this.vy = this.gravity;

			ctx.fillStyle = this.color;

        if(this.life == this.maxlife){

            delete particles[this.id];

        }

			ctx.fillRect(this.x, this.y, this.size, this.size);

		};


setInterval(function(){
  if(go == true){
  ctx.clearRect(0,0,canvas.width,canvas.height);


  for (var i = 0; i < particleNum; i++){
    new Particle();
  }
  for(var i in particles){
    particles[i].draw();
  }
  }
}, 30);


    };
