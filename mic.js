var mic;
var active;
var inactive;

function setup(){
	createCanvas(700, 700);
	mic = new p5.AudioIn();
	mic.start();
	
	active = loadImage('active.png');
	//active.play();
	//active.loop();
	inactive = loadImage('inactive.png');
}

function draw(){
	
	vol = mic.getLevel();
	background(0, 255, 0);
	image(inactive, 10, 10);
	if (vol >= 0.003) {
		image(active, 10, 10);
	}
}

function touchStarted() {
  getAudioContext().resume();
}
