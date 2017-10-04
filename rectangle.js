var Rectangle = function(p){
    var rectangle={};
    var program = p;
    var vao;
    var vaoAttrib;

    rectangle.initialize = function(center, width, height){
        vao = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vao);
        var vertices = [
            vec2(center[0] + width / 2, center[1] + height / 2),
            vec2(center[0] + width / 2, center[1] - height / 2),
            vec2(center[0] - width / 2, center[1] + height / 2),
            vec2(center[0] - width / 2, center[1] - height / 2)
        ];
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
        vaoAttrib = gl.getAttribLocation(program, "vPosition");
        gl.enableVertexAttribArray(vaoAttrib);
        gl.vertexAttribPointer(vaoAttrib, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    rectangle.draw = function(posX){
        gl.useProgram(program);
        
        gl.uniform1f(program.x, posX);
        gl.bindBuffer(gl.ARRAY_BUFFER, vao);
        gl.enableVertexAttribArray(vaoAttrib);
        gl.vertexAttribPointer(vaoAttrib, 2, gl.FLOAT, false, 0, 0);
        console.log(gl.NO_ERROR == gl.getError());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

//     var indicesArray = [0, 3, 1, 1, 3, 2];
//     ebo = gl.createBuffer();
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
//     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array(indicesArray), gl.STATIC_DRAW);
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
//     console.log(gl.getError() == gl.NO_ERROR);
// };

// player.draw = function(program){
//     gl.useProgram(program);

//     //gl.uniform1f(program.time, 100);

//     gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
//     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(vPosition);

//     gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0);
//     console.log(gl.getError() == gl.NO_ERROR);

    return rectangle;
}