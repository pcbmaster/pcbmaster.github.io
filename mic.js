var mic;
var active;
var inactive;
var thresh = 0.005;

const getCookieValue = (name) => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function setup(){
	createCanvas(700, 700);
	mic = new p5.AudioIn();
	mic.start();
	
	if(getCookieValue("thresh") != "") {
		thresh = parseFloat(getCookieValue("thresh"))
	}
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
	setCookie("thresh", slider.value, 15)
}
