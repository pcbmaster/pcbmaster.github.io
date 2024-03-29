var mic;
var active;
var inactive;
var thresh = 0.005;
var usingLocal = false;
var localActive = "";
var localNeutral = "";

const ACTIVE_IMAGE = "uploadActive";
const NEUTRAL_IMAGE = "uploadNeutral";

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
	createCanvas(1100, 1300);
	mic = new p5.AudioIn();
	mic.start();
	lookForLocal();
	
	if(getCookieValue("thresh") != "") {
		thresh = parseFloat(getCookieValue("thresh"));
		document.getElementById("slider").value = thresh;
	}
	if (usingLocal) {
		active = loadImage(localActive);
		inactive = loadImage(localNeutral);
	} else {
		active = loadImage('vtuber-joey1-open.png');
		//active.play();
		//active.loop();
		inactive = loadImage('vtuber-joey1-closed.png');
	}
}

function lookForLocal() {
	var tempActive = localStorage.getItem(ACTIVE_IMAGE);
	var tempNeutral = localStorage.getItem(NEUTRAL_IMAGE);
	
	if (tempActive != null && tempNeutral != null) {
		usingLocal = true;
		localActive = tempActive;
		localNeutral = tempNeutral;
	}
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

function showSettings() {
	var x = document.getElementById("settings");
  	if (x.style.display === "none") {
    		x.style.display = "block";
  	} else {
    		x.style.display = "none";
  	}
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log(e.target.result);
			localStorage.setItem(input.id, e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
