class Rectangle {
    
    constructor( center, width, height, program ) {
        this.program = program;

        this.vao = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vao );
        
        this.vertices = [
            vec2(center[0] + width / 2, center[1] + height / 2),
            vec2(center[0] + width / 2, center[1] - height / 2),
            vec2(center[0] - width / 2, center[1] + height / 2),
            vec2(center[0] - width / 2, center[1] - height / 2)
        ];
        
        gl.bufferData( gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW );
        
        this.vao_attr = gl.getAttribLocation( this.program, 'vPosition' );
        gl.enableVertexAttribArray( this.vao_attr );
        gl.vertexAttribPointer( this.vao_attr, 2, gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, null );
    }

    draw( x, y ) {
        gl.useProgram( this.program );

        gl.uniform1f( this.program.x, x );
        gl.uniform1f( this.program.y, y );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.vao );
        gl.enableVertexAttribArray( this.vao_attr );
        gl.vertexAttribPointer( this.vao_attr, 2, gl.FLOAT, false, 0, 0 );

        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
}