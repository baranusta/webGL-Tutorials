var sphere1,sphere2;
var models = {};

var lightDir = vec3(0, 0, 2);

var at = vec3(0, 0, 0);
var eye = vec3(0, 0, 10);
var toCam = subtract(eye, at);
var proj;
var view;


function modelLoad(meshes) {
    models.meshes = meshes;
    OBJ.initMeshBuffers(gl, models.meshes.sphere);
    sphere1 = new GameObject(models.meshes.sphere);
    sphere1.model = mult(sphere1.model, translate(-1.0,0,0));
    sphere2 = new GameObject(models.meshes.sphere);
    sphere2.model = mult(sphere2.model, translate(1.0,0,0));
    gameLoop();
}


window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }

    screenSize = [canvas.width, canvas.height];

    gl.viewport(0, 0, screenSize[0], screenSize[1]);
    gl.clearColor(0, 1.0, 0, 1);

    OBJ.downloadMeshes({
        'sphere': 'sphere.obj'
    }, modelLoad);


}

var gameEnded = false;
const gameLoop = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    if (!gameEnded) {

        view = lookAt(add(at, toCam), at, [0, 1, 0]);
        proj = perspective(20, screenSize[0] / screenSize[1], 0.1, 10);

        sphere1.model = mult(sphere1.model, rotateZ(1));
        sphere1.draw(vec3(0,1,2), lightDir, mult(proj,view));
        sphere2.draw(vec3(0,1,2), lightDir, mult(proj,view));
        window.requestAnimationFrame(gameLoop);
    }
    else {
        window.cancelAnimationFrame(gameLoop);
    }
}


document.onkeydown = function(e)
{
    console.log(e.keyCode);
    if(e.keyCode == 38){ 
        sphere1.model = mult(sphere1.model, translate(-0.1,0,0));
    }
    if(e.keyCode == 40){
        sphere1.model = mult(sphere1.model, translate(0.1,0,0));
    }
    if(e.keyCode == 38){
        player2PressedU = true;
    }
    if(e.keyCode == 40){
        player2PressedD = true;
    }
    
}