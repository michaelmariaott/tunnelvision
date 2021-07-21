var w = window.innerWidth;
var h = window.innerHeight;

let r;
let d;
let i=1;
let mic;
let micLevel = 0;

function setup() {
  createCanvas(w, h);
  getAudioContext().suspend();
  mic = new p5.AudioIn();
  textFont("Courier New",10);
  r = 2*width;
}

function draw() {
  background(0);
  if(getAudioContext().state == "suspended") {
    text("klick starts listening / f controls fullscreen", 5, 15);
    micLevel = 0;
  } else {
    text("klick stops listening / f controls fullscreen", 5, 15);
    micLevel = mic.getLevel();
  }
  noFill();
  stroke(255);
  
  
  print(micLevel);
  
  if (r<2*width*1.3333) {
    r=r+i+pow((micLevel*150),2);
  } else {
    r=2*width;
  }
  ellipse(width/2,height/2,r+r*pow((micLevel*10),2),r);
  noFill();
  stroke(255);
  d = r;
  while (d>1) {
    d = d*0.75;
    ellipse(width/2,height/2,d+d*pow((micLevel*10),2),d);
    noFill();
    stroke(255);
  }
  i = i+0.0003;

}

window.onresize = function () {
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
};

function mousePressed() {
  if(getAudioContext().state == "suspended") {
    userStartAudio();
    mic.start(errorCallback);
    mic.amp(1);

  } else {
    mic.amp(0);
    mic.stop();
    getAudioContext().suspend();
  }
  
}

function keyPressed() {
  if(keyCode == 70) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function errorCallback() {
  text("browser does not allow microphone access", width/2, height/2);
}