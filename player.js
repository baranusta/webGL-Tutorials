class Player {
    
    constructor( name, center, width, height ) {
        this.name = name;
        this.x = 0;
        this.score = 0;

        this.program = initShaders( gl, 'vertex-shader', 'fragment-shader' );
        this.program.x = gl.getUniformLocation( this.program, 'time' );

        this.rectangle = new Rectangle( center, width, height, this.program );
    }

    draw() {
        this.rectangle.draw( this.x );
    }

    update() {
        this.x += 0.01;
    }
}