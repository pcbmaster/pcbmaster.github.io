var mic;
var active;
var inactive;
var slider;
var output;
var thresh = 0.005;

function setup(){
	createCanvas(700, 700);
	mic = new p5.AudioIn();
	mic.start();
	slider = document.getElementById("slider")
	slider.onInput = sliderMoved()
	output = document.getElementById("val")
	
	active = loadImage('active.png');
	//active.play();
	//active.loop();
	inactive = loadImage('inactive.png');
}

function draw(){
	vol = mic.getLevel();
	background(0, 255, 0);
	image(inactive, 10, 10);
	if (vol >= thresh) {
		image(active, 10, 10);
	}
}

function sliderMoved() {
	thresh = slider.value
	output.innerHTML = thresh
}

function touchStarted() {
  getAudioContext().resume();
}
