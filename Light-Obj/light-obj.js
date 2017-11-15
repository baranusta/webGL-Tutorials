var sphere;
var models = {};

var lightDir = vec3(0, -1, -1);

var at = vec3(0, 0, 0);
var eye = vec3(0, 0, 5);
var toCam = subtract(eye, at);
var proj;
var view;


function modelLoad(meshes) {
    models.meshes = meshes;
    OBJ.initMeshBuffers(gl, models.meshes.sphere);
    sphere = new GameObject(models.meshes.sphere);
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
        proj = perspective(45, screenSize[0] / screenSize[1], 0.1, 10);

        sphere.draw(eye, lightDir, mult(proj,view));
        window.requestAnimationFrame(gameLoop);
    }
    else {
        window.cancelAnimationFrame(gameLoop);
    }
}