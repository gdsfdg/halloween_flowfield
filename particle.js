function Particle(color1, color2, weight_increment, maxweight, graphics_buffer) {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 5;

  this.prevPos = this.pos.copy();

  this.from_color = color1;
  this.to_color = color2;
  this.maximum = maxweight;
  this.increment = weight_increment;
  this.graphics = graphics_buffer;

  //var from_color = color(206, 86, 30);
  //var to_color = color(75, 112, 52);

  this.color = lerpColor(this.from_color, this.to_color, Math.random());

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);  
  };

  this.follow = function (vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  var weight = 0;
  this.show = function () {
    this.graphics.stroke(this.color);
    this.graphics.strokeWeight(weight);
    if(weight < this.maximum){
      weight += this.increment;
    }
    
    // point(this.pos.x, this.pos.y);
    this.graphics.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.graphics.drawingContext.filter = 'blur(5px)';
    this.graphics.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.graphics.drawingContext.filter = 'blur(0px)';
    this.updatePrev();
  };
  
  this.updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  this.edges = function () {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    } else if (this.pos.x < 0) {
      this.reset();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    } else if (this.pos.y < 0) {
      this.reset();
    }
  };

  this.reset = function(){
    weight = 0;
    this.pos.x = random(width);
    this.pos.y = random(height);
    this.prevPos = this.pos.copy();
    this.color = lerpColor(this.from_color, this.to_color, Math.random());
  }
}
