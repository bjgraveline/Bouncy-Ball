var el = document.getElementById("main"),
	two = new Two({
		fullscreen: true
	});

two.appendTo(el); //Attach two.js to html element

var ground = two.height * 15 / 16; //Where the red line (ground) should be
var ceiling = 100; //Same as radius of circle so that the top reaches the edge of the screen
var xVel = 3; // simple x velocity
var yVel = 3;// simple y velocity
var score = 0;
var count = 0;
var frameCount = 0

/*****************Object creation****************************/
//Make ground
var line = two.makeLine(0, ground, two.width, ground);
line.linewidth = 10;
line.stroke = "red";

//Make ball
var ball = two.makeCircle(two.width / 2, two.height / 2, 100);
ball.noStroke();
ball.fill = "blue";
/************************************************************/
function isInBall(event) {
	var inBall = false;
	var x = event.clientX;
	var y = event.clientY;
	var coords = "Coordinates: " + x + ", " + y;
	// Distance Formula
	if (Math.pow((x - ball.translation.x), 2) + Math.pow((y - ball.translation.y), 2) <= 10000) {
		xVel = (ball.translation.x - x) / 5;
		yVel = (ball.translation.y - y) / 10;
	}
	count++;	
	return xVel, yVel;
}

function move() {
	if(ball.translation.y > ground - 105) {
		ball.translation.y = ground - 105;
		yVel = -yVel + 2; //Energy loss when ball bounces
		alert("You scored: " + count);
		count = 0;
		frameCount = 0;
		yVel = -1;
	} else {
		ball.translation.y = ball.translation.y + yVel;
	}
	if (ball.translation.x > two.width - 100) {
		ball.translation.x = two.width - 100;
		xVel = -xVel;
	} else if (ball.translation.x < 100) {
		ball.translation.x = 100;
		xVel = -xVel;
	} else {
		ball.translation.x = ball.translation.x + xVel;
	}
	yVel = yVel + (frameCount / 6000); //gravity
	frameCount++;
}

two.bind("update", function(frameCount) {
	move();
});
two.play();
