class Ball {
    constructor(name, center, radius) {
        this.name = name;
        this.radius = radius;
        this.displacement = [0.0, 0.0];
        this.speed = [0.01, 0.01];
        this.center = center;

        this.program = initShaders(gl, 'vertex-shader-circle', 'fragment-shader-circle');
        this.program.radius = gl.getUniformLocation(this.program, "radius");
        this.program.displacement = gl.getUniformLocation(this.program, "displacement");
        this.program.screenSize = gl.getUniformLocation(this.program, "screenSize");

        this.vao = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vao);

        gl.bufferData(gl.ARRAY_BUFFER, flatten(center), gl.STATIC_DRAW);

        this.vao_attr = gl.getAttribLocation(this.program, 'vPosition');
        gl.enableVertexAttribArray(this.vao_attr);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

    }

    draw(screenSize) {
        gl.useProgram(this.program);

        gl.uniform1f(this.program.radius, this.radius);
        gl.uniform2f(this.program.screenSize, screenSize[0], screenSize[1]);
        gl.uniform2f(this.program.displacement, this.displacement[0], this.displacement[1]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vao);
        gl.enableVertexAttribArray(this.vao_attr);
        gl.vertexAttribPointer(this.vao_attr, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, 1);
    }

    update() {
        this.displacement[0] += this.speed[0];
        this.displacement[1] += this.speed[1];
    }

    keepInField() {
        if (this.center[1] + this.displacement[1] + this.radius > 1.0) {
            this.displacement[1] = 1 - this.radius - this.center[1];
            this.speed[1] *= -1.0;
        }
        if (this.center[1] + this.displacement[1] - this.radius < -1.0) {
            this.displacement[1] = -1 + this.radius - this.center[1];
            this.speed[1] *= -1.0;
        }
    }

    collideWithAxis(min1, max1, min2, max2) {
        if (max1 < min2 || max2 < min1)
            return false;

        return true;
    }

    collideWith(player_1) {
        var ballxMin = this.center[0] + this.displacement[0] - this.radius / 2.0;
        var ballxMax = this.center[0] + this.displacement[0] + this.radius / 2.0;

        var ballyMin = this.center[1] + this.displacement[1] - this.radius / 2.0;
        var ballyMax = this.center[1] + this.displacement[1] + this.radius / 2.0;

        var playerxMin = player_1.center[0] + player_1.displacement[0] - player_1.size[0] / 2.0;
        var playerxMax = player_1.center[0] + player_1.displacement[0] + player_1.size[0] / 2.0;
        var playeryMin = player_1.center[1] + player_1.displacement[1] - player_1.size[1] / 2.0;
        var playeryMax = player_1.center[1] + player_1.displacement[1] + player_1.size[1] / 2.0;

        if (this.collideWithAxis(ballxMin, ballxMax, playerxMin, playerxMax) &&
        this.collideWithAxis(ballyMin, ballyMax, playeryMin, playeryMax)) {

            if (this.speed[0] > 0) {
                this.displacement[1] -= ballxMax - playerxMin;
            }
            else {
                this.displacement[1] -= ballxMin - playerxMax;
            }
            this.speed[0] *= -1.0;
        }
    }

    resetPos() {
        this.displacement = [0.0, 0.0];
    }

    passed(lineVertical, func) {
        if (this.center[0] + this.displacement[0] - this.radius / 2.0 < lineVertical &&
            this.center[0] + this.displacement[0] + this.radius / 2.0 > lineVertical) {
            func();
        }
    }
}
