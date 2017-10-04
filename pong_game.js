
let objects = [];

window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 1.0, 0, 1);

    objects.push( new Player( "P_1", vec2(0, 0), 0.15, 0.15, 0.1 ) );       //  s
    objects.push( new Player( "P_2", vec2(0, 0), 0.25, 0.25, 0.1/60 ) );    //  m
    objects.push( new Player( "P_2", vec2(0, 0), 0.30, 0.30, 0.1/60/60 ) ); //  h

    gameLoop();
}

let gameEnded = false;
const gameLoop = function(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(!gameEnded)
    {
        for( let obj of objects ) { 
            obj.update();
            obj.draw();
        }

        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        window.cancelAnimationFrame(gameLoop);
    }
}