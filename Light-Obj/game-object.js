class GameObject
{
    constructor(mesh){
        var program = initShaders(gl, 'vertex-shader-object', 'fragment-shader-object');
        program.mvp = gl.getUniformLocation(program, "mvp");
        program.lightDir = gl.getUniformLocation(program, "lightDir");
        program.cameraPos = gl.getUniformLocation(program, "cameraPos");
        program.screenSize = gl.getUniformLocation(program, "screenSize");

        program.vpos_attr = gl.getAttribLocation(program, 'vPosition');
        gl.enableVertexAttribArray(program.vpos_attr);

        program.vnor_attr = gl.getAttribLocation(program, "vNormal");
        gl.enableVertexAttribArray(program.vnor_attr);

        this.program = program;
        this.mesh = mesh;
        this.model = mat4();
    }

    draw(cameraPos, lightDir, viewProjection, model){
        model = model || mat4();
        model = mult(this.model, model);
        viewProjection = viewProjection || mat4();

        gl.useProgram(this.program);

        
        gl.uniformMatrix4fv(this.program.mvp, false, flatten(mult(viewProjection, model)));
        gl.uniform3f(this.program.lightDir, lightDir[0], lightDir[1], lightDir[2]);
        gl.uniform3f(this.program.cameraPos, cameraPos[0], cameraPos[1], cameraPos[2]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
        gl.vertexAttribPointer(this.program.vpos_attr, this.mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.normalBuffer);
        gl.vertexAttribPointer(this.program.vnor_attr, this.mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
}