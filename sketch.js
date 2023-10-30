var scl = 20;
var cols, rows;

var fr;

var speedSlider;

let main_graphics;
var main_particles = [];
var main_flow = [];

let secondary_graphics;
var secondary_particles = [];
var secondary_flow = [];

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  speedSlider = createSlider(1, 10, 3);

  main_graphics = createGraphics(windowWidth, windowHeight);
  for (var i = 0; i < 50; i++) {
    main_particles[i] = new Particle(color(255, 255, 255), color(59, 43, 102), 0.005, 1, main_graphics);
  }
  for (var i = 50; i < 60; i++) {
    main_particles[i] = new Particle(color(226, 78, 29), color(234, 197, 9), 0.005, 1, main_graphics);
  }

  secondary_graphics = createGraphics(windowWidth, windowHeight);
  for (var i = 0; i < 5; i++) {
    secondary_particles[i] = new Particle(color(255, 255, 255), color(255, 255, 255), 0.1, 20, secondary_graphics);
  }

  main_flow = setup_flowfield(0.01);
  secondary_flow = setup_flowfield(0.005);
  //main_graphics.background(0);
  secondary_graphics.background(0);
}
function draw() {
  update_particles(secondary_particles, secondary_flow);
  image(secondary_graphics, 0, 0);
  //leaves behind a trace for some reason.
  secondary_graphics.background(0, 45);
  //secondary_graphics.background(0);

  update_particles(main_particles, main_flow);
  image(main_graphics, 0, 0);
  fr.html('Frame Rate:' + floor(frameRate()));
}

function update_particles(particles, field){
  for (var i = 0; i < particles.length; i++) {
    particles[i].maxspeed = speedSlider.value();
    particles[i].follow(field);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

function setup_flowfield(inc){
  print("hi");
  var flowfield = new Array(cols * rows);
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      // var index = (x + y * width) * 4;
      var index = x + y * cols;
      var angle = noise(xoff, yoff) * TWO_PI * 4;

      //var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      stroke(0, 50);
      
      pop();
      xoff += inc;
    }
    yoff += inc;
    //zoff += 0.0005;
  }
  return flowfield;
}
