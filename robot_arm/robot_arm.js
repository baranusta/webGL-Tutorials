var arms = []; 
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

    var size = 10;

    for(var i = 0; i < size; i++) {
        var add = 0.1;
        if(i == 0) add = -0.7;
        arms.push(new Arm(vec3(0.0 + add,0.0,0.0), vec3(0.1,0.05,1)));
        if(i>0) {
            arms[i-1].addChild(arms[i]);
        }
    }
    
    gl.clear(gl.COLOR_BUFFER_BIT);
    gameLoop();
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
    arms[0].draw();
}

var counter =0;
var reverseMovement = false;

const gameLoop = function(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    for(var i = 0 ; i < arms.length; i++) {
        var speed = 0;
        var multiplier = 1;

        if(i%3 != 0) multiplier *= -1;
        if(i%6 >= 3) multiplier *= -1;
        if(reverseMovement) multiplier *= -1;

        speed = (3 - i%3) * (Math.cos(counter * 0.0174532925 )) * multiplier / 3;

        arms[i].model = mult(arms[i].model, rotateZ(speed));
    }    
    
    counter++;

    console.log(counter);

    draw();
    if(!gameEnded)
    {
        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        window.cancelAnimationFrame(gameLoop);
    }
}