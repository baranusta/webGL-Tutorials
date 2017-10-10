
let player_1, player_2;

let ball;
let screenSize;
let gameEnded = false;

var playerPressedU = false;
var playerPressedD = false;

window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }
    screenSize = [canvas.width, canvas.height];

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 1.0, 0, 1);

    player_1 = new Player( "P_1", vec2(-.85, 0), 0.15, 0.2 );
    player_2 = new Player( "P_2", vec2(+.85, 0), 0.15, 0.2 );
    
    ball = new Ball("ball", vec2(0,0),0.1);
    gameLoop();
}

const gameLoop = function(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(!gameEnded)
    {
        // console.log(playerPressedU)
        // console.log(playerPressedD)
        if(!playerPressedU && !playerPressedD )
            player_1.decelerate();
        else 
            player_1.accelerate(playerPressedU);


        player_1.update();
        player_2.update();

        player_1.draw();
        player_2.draw();
        //ball.draw(screenSize);
        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        window.cancelAnimationFrame(gameLoop);
    }
}


document.onkeydown = function(e)
{
    console.log(e.keyCode);
    if(e.keyCode == 38){
        playerPressedU = true;
    }
    if(e.keyCode == 40){
        playerPressedD = true;
    }
    // console.log(playerPressedU)
    // console.log(playerPressedD)
    
}

document.onkeyup = function(e)
{
    if(e.keyCode == 38){
        playerPressedU = false;
    }
    if(e.keyCode == 40){        
        playerPressedD = false;
    }
    
    // console.log(playerPressedU)
    // console.log(playerPressedD)
}
