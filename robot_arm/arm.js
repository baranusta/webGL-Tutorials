class Arm {
    
    constructor( origin, sizes ) {
        this.origin = origin;
        this.model = mult(translate(origin), mat4());
        this.rectPrism = new RectangularPrism(sizes);
        this.children = [];
    }

    addChild(child){
        this.children.push(child);
    }

    draw(model) {
        model = model || mat4(); 
        model = mult(model, this.model);

        this.rectPrism.draw( model );
        for (var index = 0; index < this.children.length; index++) {
            var child = this.children[index];
            child.draw(model);
        }
    }

    rotate(rotation){
        this.model = mult(this.model, rotation);
    }

}
