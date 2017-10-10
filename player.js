class Player {
    
    constructor( name, center, width, height ) {
        this.name = name;
        this.displacement = [0.0,0.0];
        this.speedY = 0.0;
        this.score = 0;

        this.program = initShaders( gl, 'vertex-shader', 'fragment-shader' );
        this.program.displacement = gl.getUniformLocation( this.program, 'displacement' );

        this.rectangle = new Rectangle( center, width, height, this.program );
    }

    draw() {
        this.rectangle.draw( this.displacement );
    }

    update() {
        //console.log(this.displacement);
        this.displacement[1] += this.speedY;
    }

    accelerate(up){
        if(up){
            if(this.speedY <0.01 )
                this.speedY += 0.001;
        }
        else{
            if(this.speedY > -0.01)
            this.speedY -= 0.001;    
        } 
        console.log(this.speedY);
        
    }

    decelerate(){
        this.speedY *= 0.8;
    }
}
