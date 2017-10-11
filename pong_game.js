
let player_1, player_2;

let ball;
let screenSize;
let gameEnded = false;

var player1PressedU = false;
var player1PressedD = false;

var player2PressedU = false;
var player2PressedD = false;

window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }
    screenSize = [canvas.width, canvas.height];

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 1.0, 0, 1);

    player_1 = new Player( "P_1", vec2(-.85, 0), 0.1, 0.4 );
    player_2 = new Player( "P_2", vec2(+.85, 0), 0.1, 0.4 );
    
    ball = new Ball("ball", vec2(0,0),0.1);
    gameLoop();
}

const updateScore = function(p1_Score, p2_Score){
    console.log("p1: " + p1_Score + " - p2: " + p2_Score);
}

const gameLoop = function(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(!gameEnded)
    {
        // console.log(playerPressedU)
        // console.log(playerPressedD)
        if(!player1PressedU && !player1PressedD )
            player_1.decelerate();
        else 
            player_1.accelerate(player1PressedU);

        if(!player2PressedU && !player2PressedD )
            player_2.decelerate();
        else 
            player_2.accelerate(player2PressedU);

        player_1.update();
        player_2.update();
        ball.update();

        player_1.keepInField();
        player_2.keepInField();
        ball.keepInField();


        ball.collideWith(player_1);
        ball.collideWith(player_2);

        ball.passed( 1.0, function(){
            player_1.score += 1;
            ball.resetPos();
            updateScore(player_1.score,player_2.score);
        });

        ball.passed(-1.0, function(){
            player_2.score += 1;
            ball.resetPos();
            updateScore(player_1.score,player_2.score);            
        });
        
        player_1.draw();
        player_2.draw();
        ball.draw(screenSize);
        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        window.cancelAnimationFrame(gameLoop);
    }
}


document.onkeydown = function(e)
{
    if(e.keyCode == 38){
        player1PressedU = true;
    }
    if(e.keyCode == 40){
        player1PressedD = true;
    }
    if(e.keyCode == 38){
        player2PressedU = true;
    }
    if(e.keyCode == 40){
        player2PressedD = true;
    }
    
}

document.onkeyup = function(e)
{
    if(e.keyCode == 38){
        player1PressedU = false;
    }
    if(e.keyCode == 40){        
        player1PressedD = false;
    }
    if(e.keyCode == 38){
        player2PressedU = false;
    }
    if(e.keyCode == 40){        
        player2PressedD = false;
    }
}
