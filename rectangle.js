class Rectangle {
    
    constructor( center, width, height, program ) {
        this.program = program;

        this.vao = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vao );
        
        let vertices = [
            vec2(center[0] + width / 2, center[1] + height / 2),
            vec2(center[0] + width / 2, center[1] - height / 2),
            vec2(center[0] - width / 2, center[1] + height / 2),
            vec2(center[0] - width / 2, center[1] - height / 2)
        ];
        
        gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
        
        this.vao_attr = gl.getAttribLocation( this.program, 'vPosition' );
        gl.enableVertexAttribArray( this.vao_attr );
        gl.vertexAttribPointer( this.vao_attr, 2, gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, null );
    }

    draw( x ) {
        gl.useProgram( this.program );

        gl.uniform1f( this.program.x, x );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.vao );
        gl.enableVertexAttribArray( this.vao_attr );
        gl.vertexAttribPointer( this.vao_attr, 2, gl.FLOAT, false, 0, 0 );

        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }

//     let indicesArray = [0, 3, 1, 1, 3, 2];
//     ebo = gl.createBuffer();
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
//     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array(indicesArray), gl.STATIC_DRAW);
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
//     console.log(gl.getError() == gl.NO_ERROR);
// };

// draw( program ){
//     gl.useProgram( program );

//     //gl.uniform1f(program.time, 100);

//     gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
//     gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(vPosition);

//     gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0);
//     console.log(gl.getError() == gl.NO_ERROR);
}