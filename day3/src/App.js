import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Sketch from "react-p5";
import Particle from './Particle'


var inc = 0.01;
var scl = 25;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

function setup(p5) {
  p5.createCanvas(p5.windowWidth, p5.windowHeight);
  cols = p5.floor(p5.width / scl);
  rows = p5.floor(p5.height / scl);
  // fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle(p5);
  }
  p5.background('rgb(24, 38, 97)');
}

function draw(p5) {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = p5.noise(xoff, yoff) * p5.TWO_PI * 2;
      var v = p5.constructor.Vector.fromAngle(angle);
      v.setMag(1.5);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;

    // zoff += 0.0004;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(p5,flowfield,scl,cols);
    particles[i].update();
    particles[i].edges(p5);
    particles[i].show(p5);
  }

  // fr.html(floor(frameRate()));
}

function windowResized(p5) {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
}

function App() {
  return (
    <div className="App">
      <div className='container'>
        <Sketch setup={setup} draw ={draw} windowResized={windowResized}/>
      </div>
    </div>
  );
}

export default App;
