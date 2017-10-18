var arm; 
window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }
    screenSize = [canvas.width, canvas.height];

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 1.0, 0, 1);

    arm = new Arm(vec3(0.0,0.0,0.0), vec3(0.5,0.2,1));
    midArm = new Arm(vec3(0.4,0.0,0.0), vec3(0.5,0.2,1));
    arm.addChild(midArm);
    gl.clear(gl.COLOR_BUFFER_BIT);
    midArm.rotate(rotateZ(20));
    arm.rotate(rotate(45,[0,0,-1]));
    draw();
}

const draw = function(){
    arm.draw();
}

const gameLoop = function(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(!gameEnded)
    {
        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        window.cancelAnimationFrame(gameLoop);
    }
}