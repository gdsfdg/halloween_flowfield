// Rain effect: https://www.youtube.com/watch?v=eFaVK3_mWkM
function Drop() {
  this.x = random(0, width);
  this.y = random(0, -height);

  this.show = function () {
    noStroke();
    fill(11, 120, 237, 200);
    ellipse(this.x, this.y, 2, 10);
  };

  this.update = function () {
    this.speed = random(5, 300);
    this.gravity = 1.05;
    this.y = this.y + 8 + this.speed * this.gravity;

    if (this.y > height) {
      this.y = random(0, -height);
      this.gravity = 0;
    }
  };
}
