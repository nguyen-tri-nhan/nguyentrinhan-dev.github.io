var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreshow = document.getElementById('score');
var gameOver = document.getElementById('gameOver');

var birdimg = new Image();
var mainTheme = new Image();
var topPipe = new Image();
var bottomPipe = new Image();
birdimg.src = "bird.png";
mainTheme.src = "maintheme.png";
topPipe.src = "toppipe.png";
bottomPipe.src = "bottompipe.png";

let score = 0;
var distanceBetweenPipe = 140; 
var distanceToBottomPipe; 
var bird = {
    x: mainTheme.width / 5,
    y: mainTheme.height / 2
}
var pipe = []; 
pipe[0] = {
    x: canvas.width,
    y: 0 
}

function run() {
    context.drawImage(mainTheme, 0, 0);
    context.drawImage(birdimg, bird.x, bird.y);

    for (var i = 0; i < pipe.length; i++) {
        distanceToBottomPipe = topPipe.height + distanceBetweenPipe;
        context.drawImage(topPipe, pipe[i].x, pipe[i].y);
        context.drawImage(bottomPipe, pipe[i].x, pipe[i].y + distanceToBottomPipe);
        pipe[i].x -= 5;
        if (pipe[i].x == canvas.width / 2) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * topPipe.height) - topPipe.height
            })
        }
        if (pipe[i].x == 0) pipe.splice(0, 1);
        if (pipe[i].x == bird.x) {
            score++;
        }
        if (bird.y + birdimg.height == canvas.height ||
            bird.x + birdimg.width >= pipe[i].x && bird.x <= pipe[i].x + topPipe.width
            && (bird.y <= pipe[i].y + topPipe.height ||
                bird.y + birdimg.height >= pipe[i].y + distanceToBottomPipe)
        ) {
            gameOver.innerHTML = "Game over, press F5 to play again!";
            return;
        }
    }

    scoreshow.innerHTML = "score: " + score;
    bird.y += 3;
    requestAnimationFrame(run);
}
document.addEventListener("keydown", function () {
    bird.y -= 60;
})
run();