
var screenSize; 
var gameEnded = false;

window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }
    screenSize = [canvas.width, canvas.height];

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 1.0, 0, 1);

    obj = new RectangularPrism(vec3(1, 1, 1));
    //drawAnimatedSnake();
    gameLoop();
}
var obj;
var mvp;
var pos = 0;

var at = vec3(0.5, 0.5,-0.5);
var eye = vec3(0.5, 0.5,5);
var toCam = subtract(eye, at);

const gameLoop = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    var a = mult(rotateY(1), vec4(toCam, 1));
    toCam = vec3(a[0],a[1],a[2]);
    
    var view = lookAt(add(at,toCam) , at, [0,1,0]);
    var proj = perspective(45,screenSize[1]/screenSize[0], 0.1, 10);
    
    mvp = mult(proj,view);
    if (!gameEnded) {
        obj.draw(mvp);
        window.requestAnimationFrame(gameLoop);
    }
    else {
        window.cancelAnimationFrame(gameLoop);
    }
}


document.onkeydown = function(e)
{
    
    console.log(e.keyCode);
    if(e.keyCode == 37){
        pos -= 0.1;
    }
    if(e.keyCode == 39){
        pos += 0.1;
    }
}
