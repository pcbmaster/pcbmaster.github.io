var mic;
var active;
var inactive;
var slider;
var thresh = 0.005;

function setup(){
	createCanvas(700, 700);
	mic = new p5.AudioIn();
	mic.start();
	slider = document.getElementById("slider");
	slider.onInput = sliderMoved();
	
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

function sliderMoved() {
	thresh = slider.value;
	document.getElementById("val").innerHTML = thresh;
}

function touchStarted() {
  getAudioContext().resume();
}
