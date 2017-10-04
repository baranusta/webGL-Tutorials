class Player {
    
    constructor( name, center, width, height, speed ) {
        this.name = name;
        this.x = center[0];
        this.y = center[1];
        this.speed = speed;
        this.score = 0;

        this.program = initShaders( gl, 'vertex-shader', 'fragment-shader' );
        this.program.x = gl.getUniformLocation( this.program, 'x' );
        this.program.y = gl.getUniformLocation( this.program, 'y' );

        this.rectangle = new Rectangle( center, width, height, this.program );
    }

    draw() {
        this.rectangle.draw( this.x, this.y );
    }

    update() {
        this.x += this.speed;
    }
}