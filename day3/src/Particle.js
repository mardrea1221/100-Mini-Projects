import "react-p5";


export default class Particle {
    constructor(p5) {
      this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
      this.vel = p5.createVector(0, 0);
      this.acc = p5.createVector(0, 0);
      this.maxspeed = 4;
      this.prevPos = this.pos.copy();
    }
  
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    follow(p5,vectors,scl,cols) {
      var x = p5.floor(this.pos.x / scl);
      var y = p5.floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    show(p5) {
        let colors = [[214, 137, 86], [86, 173, 214], [214, 116, 86], [86, 127, 214], [255, 255, 255]];
        let is = Math.floor(Math.random() * colors.length)
        let j1 = colors[is][0];
        let j2 = colors[is][1];
        let j3 = colors[is][2];
        p5.stroke(j1,j2,j3);
        p5.strokeWeight(1.5);
        p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();

    }
    
  
    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
  
    edges(p5) {
      if (this.pos.x > p5.width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = p5.width;
        this.updatePrev();
      }
      if (this.pos.y > p5.height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = p5.height;
        this.updatePrev();
      }
  
    }
  
  }