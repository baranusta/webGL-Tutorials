
var arm;

var snake = []; 
var gameEnded = false;
var counter =0;
var reverseMovement = false;

window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }
    screenSize = [canvas.width, canvas.height];

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 1.0, 0, 1);

    drawRobotArm();
    //drawAnimatedSnake();

}


const drawAnimatedSnake = function () {
    var size = 10;

    for (var i = 0; i < size; i++) {
        var offset = 0.1;
        if (i == 0) offset = -0.7;
        snake.push(new Arm(vec3(0.0 + offset, 0.0, 0.0), vec3(0.1, 0.05, 1)));
        if (i > 0) {
            snake[i - 1].addChild(snake[i]);
        }
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gameLoop();
}

const drawRobotArm = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    arm = new Arm(vec3(0.0, 0.0, 0.0), vec3(0.2, 0.2, 1));
    midArm = new Arm(vec3(0.2, 0.0, 0.0), vec3(0.2, 0.2, 1));
    var lowArm = new Arm(vec3(0.2, -0.05, 0.0), vec3(0.2, 0.3, 1));
    arm.addChild(midArm);
    midArm.addChild(lowArm);
    draw();
}

const transportOrigin = function () {
    arm.model = mult(arm.model, rotateZ(45));
    arm.model = mult(arm.model, translate(0.5, 0, 0));
    arm.model = mult(arm.model, rotateZ(15));
}

const transportObject = function () {
    arm.model = mult(rotateZ(45), arm.model);
    arm.model = mult(translate(0.5, 0, 0), arm.model);
    arm.model = mult(rotateZ(15), arm.model);
    arm.model = mult(translate(-0.5, 0, 0), arm.model);
}
const draw = function () {
    transportObject();
    arm.draw();
}

const animateSnake = function() {
    for(var i = 0 ; i < snake.length; i++) {
        var speed = 0;
        var multiplier = 1;

        if(i%3 != 0) multiplier *= -1;
        if(i%6 >= 3) multiplier *= -1;
        if(reverseMovement) multiplier *= -1;

        speed = (3 - i%3) * (Math.cos(counter * 0.0174532925 )) * multiplier / 3;

        snake[i].model = mult(snake[i].model, rotateZ(speed));
    }    
    
    counter++;

    snake[0].draw();
}

const gameLoop = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (!gameEnded) {
        animateSnake();
        window.requestAnimationFrame(gameLoop);
    }
    else {
        window.cancelAnimationFrame(gameLoop);
    }
}