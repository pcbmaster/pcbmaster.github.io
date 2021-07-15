var mic;
var active;
var inactive;
var thresh = 0.005;

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
	var vol = mic.getLevel();
	background(0, 255, 0);
	image(inactive, 10, 10);
	if (vol >= thresh) {
		image(active, 10, 10);
	}
}

function touchStarted() {
  getAudioContext().resume();
}

function getSlider() {
	var slider = document.getElementById("slider")
	thresh = slider.value;
	document.getElementById("val").innerHTML = thresh;
}
