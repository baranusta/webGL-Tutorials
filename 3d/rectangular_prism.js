class RectangularPrism {

    constructor(sizes) {
        this.model = mat4();
        this.model[0][0] *= sizes[0];
        this.model[1][1] *= sizes[1];
        this.model[2][2] *= sizes[2];

        this.program = initShaders(gl, 'vertex-shader', 'fragment-shader');
        this.program.model = gl.getUniformLocation(this.program, 'model');

        this.vao = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vao);

        let vertices = [
            vec3(0, 0, 0),
            vec3(0, 1, 0),
            vec3(0, 1, -1),
            vec3(0, 0, -1),
            vec3(1, 0, 0),
            vec3(1, 1, 0),
            vec3(1, 1, -1),
            vec3(1, 0, -1)
        ];

        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

        this.vao_attr = gl.getAttribLocation(this.program, 'vPosition');
        gl.enableVertexAttribArray(this.vao_attr);
        gl.vertexAttribPointer(this.vao_attr, 3, gl.FLOAT, false, 0, 0);

        let indices = 
            [0, 1, 2, 2, 3, 1,
            0, 4, 5, 5, 1, 0,
            4, 7, 6, 6, 5, 4,
            7, 3, 2, 2, 6, 7,
            1, 5, 6, 6, 2, 1,
            0, 4, 7, 7, 3, 0];
        this.indiceSize = indices.length;

        this.ebo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


    }

    draw(model) {
        model = model || mat4(); 
        model = mult(model, this.model);

        gl.useProgram(this.program);

        gl.uniformMatrix4fv(this.program.model, false, flatten(model) );

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vao);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.enableVertexAttribArray(this.vao_attr);
        gl.vertexAttribPointer(this.vao_attr, 3, gl.FLOAT, false, 0, 0);

        gl.drawElements(gl.TRIANGLES, this.indiceSize, gl.UNSIGNED_SHORT, 0);
    }
}
