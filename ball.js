class Ball{
    constructor(name, center, radius){
        this.name = name;
        this.radius = radius;
        this.displacement = [0.0,0.0];
        this.speed = [0.01,0.01];
        this.program = initShaders(gl,'vertex-shader-circle', 'fragment-shader-circle' );
        this.program.radius = gl.getUniformLocation(this.program,"radius");
        this.program.displacement = gl.getUniformLocation(this.program,"displacement");
        this.program.screenSize = gl.getUniformLocation(this.program,"screenSize");

        this.vao = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vao);

        gl.bufferData(gl.ARRAY_BUFFER, flatten(center), gl.STATIC_DRAW);

        this.vao_attr = gl.getAttribLocation(this.program, 'vPosition');
        gl.enableVertexAttribArray(this.vao_attr);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
    }

    draw(screenSize){
        gl.useProgram(this.program);
        
        gl.uniform1f(this.program.radius, this.radius);
        gl.uniform2f(this.program.screenSize, screenSize[0], screenSize[1]);
        gl.uniform2f(this.program.displacement, this.displacement[0], this.displacement[1]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vao);
        gl.enableVertexAttribArray(this.vao_attr);
        gl.vertexAttribPointer(this.vao_attr, 2, gl.FLOAT, false, 0, 0);
        
        gl.drawArrays(gl.POINTS, 0, 1);
    }

    update()
    {
        this.displacement[0] += this.speed[0];
        this.displacement[1] += this.speed[1];
    }

    keepInField(){
        if(this.displacement[1] + this.radius > 1){
            this.displacement[1] = 1 - this.radius;  
            this.speed[1] *= -1.0;    
        }
        
        if(this.displacement[1] - this.radius < -1){
            this.displacement[1] = -1 + this.radius;  
            this.speed[1] *= -1.0;
        }
    }

    collideWith(player){
        var xMin = player.center[0] - player.size[0]/2.0;
        var xMax = player.center[0] + player.size[0]/2.0;
        var yMin = player.center[1] - player.size[1]/2.0;
        var yMax = player.center[1] + player.size[1]/2.0;
        let isCollided = this.displacement[0] + this.radius > xMin && this.displacement[0] - this.radius < xMax; 
        isCollided &= this.displacement[1] + this.radius > yMin && this.displacement[1] - this.radius < yMax; 

        if(isCollided)
        {
            this.displacement[0] -= this.displacement[0] + this.radius - xMin;
            this.speed[0] *= -1.0;
        }
    }

    passed(lineY, func){
        if(this.displacement[0] > lineY && this.displacement[0] - this.radius < lineY){
            func()
        }
        else if(this.displacement[0] < lineY && this.displacement[0] - this.radius > lineY)
            func();
    }

    resetPos(){
        this.displacement = [0.0,0.0];
    }
}
