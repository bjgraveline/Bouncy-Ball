var el = document.getElementById("main"),
	two = new Two({
		fullscreen: true
	});

two.appendTo(el);

var line = two.makeLine(0, two.height * 3 / 4, two.width, two.height * 3 / 4); //371
line.linewidth = 10;
line.stroke = "red";

var ball = two.makeCircle(two.width / 2, 100, 100);
ball.noStroke();
ball.fill = "blue";

var isFalling = true;

function moveUp(){
	ball.translation.y = ball.translation.y - 5;
}

function moveDown(){
	ball.translation.y = ball.translation.y + 5;
}

two.bind("update", function(frameCount) {
	if(ball.translation.y <= 550 && isFalling) {
		moveDown();
	} else if (ball.translation.y > 100 && !isFalling) {
		moveUp();
		console.log(isFalling);
	} else if (ball.translation.y <= 100) {
		isFalling = true;
	} else if (ball.translation.y >= 550) {
		isFalling = false;
	}

});

two.play();