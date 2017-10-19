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

    arm = new Arm(vec3(0.0,0.0,0.0), vec3(0.2,0.2,1));
    midArm = new Arm(vec3(0.2,0.0,0.0), vec3(0.2,0.2,1));
    var lowArm = new Arm(vec3(0.2,-0.05,0.0), vec3(0.2,0.3,1));
    // arm.addChild(midArm);
    // midArm.addChild(lowArm);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // arm.rotate(rotate(45,[0,0,1]));
    // midArm.rotate(rotateZ(20));
    // lowArm.rotate(rotateZ(-40));
    draw();
}

const transportOrigin = function(){
    arm.model = mult(arm.model, rotateZ(45));
    arm.model = mult(arm.model, translate(0.5,0,0));
    arm.model = mult(arm.model, rotateZ(15));
}

const transportObject = function(){
    arm.model = mult(rotateZ(45), arm.model);
    arm.model = mult(translate(0.5,0,0), arm.model);
    arm.model = mult(rotateZ(15), arm.model);
}
const draw = function(){
    transportObject();
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