var Player = function (playerName) {
    var player = {};
    player.name = playerName;
    player.score = 0;
    player.width = 1;
    var program;
    var rectangle;
    player.initialize = function (center, width, height) {

        program = initShaders(gl, "vertex-shader", "fragment-shader");
        program.x = gl.getUniformLocation(program, "time");
        rectangle = new Rectangle(program);
        rectangle.initialize(center, width, height );
    }
    var posX = 0;
    player.draw = function () {
        rectangle.draw(posX);
    }

    player.update = function(){
        posX += 0.01;
    }


    return player;
}