// var Game = function() {
//     var name = options.name;
//     var animal = {};

//     animal.getName = function() {
//         return name;
//     };

//     var somePrivateMethod = function() {

//     };

//     return animal;
// };

// var myGame = Game();

var myGame = {};
var program;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    program.time = gl.getUniformLocation( program, "time" );
    // gl.useProgram( program );

    //     var vertices = [
    //         vec2(  0,  1 ),
    //         vec2(  -1,  0 ),
    //         vec2( 1,  0 ),
    //         vec2(  0, -1 )
    //     ];


    //     // Load the data into the GPU

    //     var vBuffer = gl.createBuffer();
    //     gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    //     gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    //     // Associate out shader variables with our data buffer

    //     var vPosition = gl.getAttribLocation( program, "vPosition");
    //     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    //     gl.enableVertexAttribArray(vPosition);

    //     gl.clear( gl.COLOR_BUFFER_BIT );

    //     gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    myGame.player1 = new Player("asd");
    myGame.player1.initialize(program, [
        vec2(-1, 0.5),
        vec2(-0.5, 0.5),
        vec2(-0.5, -0.5),
        vec2(-1, -0.5)
    ]);

    myGame.player2 = new Player("afg");
    myGame.player2.initialize(program, [
        vec2(0.5, 0.5),
        vec2(1, 0.5),
        vec2(0.5, -0.5),
        vec2(1, -0.5)
    ]);
    gl.clear(gl.COLOR_BUFFER_BIT);

    myGame.player1.draw(program);
    myGame.player2.draw(program);

    //animate(0);
}

var animate = function (time) {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (!!myGame && !!myGame.player1 && (typeof myGame.player1.score !== 'undefined' && myGame.player1.score !== null) && myGame.player1.score != 3) {
        
        myGame.player1.update();

        myGame.player1.draw(program);
        myGame.player2.draw(program);
        window.requestAnimationFrame(animate);
        console.log("hih1");
    } else {
        window.cancelAnimationFrame(animate);
        console.log("hih2");
    }
}