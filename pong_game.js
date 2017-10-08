
let player_1, player_2;

window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 1.0, 0, 1);

    player_1 = new Player( "P_1", vec2(0, 0), 0.15, 0.15 );
    player_2 = new Player( "P_2", vec2(0, 0), 0.25, 0.25 );

    gameLoop();
}

let gameEnded = false;
const gameLoop = function(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(!gameEnded)
    {
        player_1.update();
        player_2.update();

        player_1.draw();
        player_2.draw();

        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        window.cancelAnimationFrame(gameLoop);
    }
}