
var player1;

window.onload = function () {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 1.0, 0, 1);


    player1 = new Player("asd");
    player1.initialize(vec2(0, 0), 0.2, 0.2);


    gameLoop();
}

var gameEnded= false;
var gameLoop = function(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(!gameEnded)
    {
        player1.update();
        player1.draw();
        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        window.cancelAnimationFrame(gameLoop);
    }
}