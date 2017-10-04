var Player = function(playername) {
    var name = playername;
    var player = {score: 0};
    var vBuffer;
    var vPosition;
    var modelLocation;
    var ebo;

    player.getName = function() {
        return name;
    };

    // var somePrivateMethod = function() {

    // };

    player.initialize = function(program, vertices){
        //gl.useProgram( program )
        vBuffer = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

        // Associate out shader variables with our data buffer
        vPosition = gl.getAttribLocation( program, "vPosition");
        gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        
        var indicesArray = [0, 3, 1, 1, 3, 2];
        ebo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array(indicesArray), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        
        console.log(gl.getError() == gl.NO_ERROR);
    };

    player.draw = function(program){
        gl.useProgram(program);

        //gl.uniform1f(program.time, 100);

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0);
        console.log(gl.getError() == gl.NO_ERROR);
    }

    player.update = function(program){
        
    }
    return player;
};
