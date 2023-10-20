class Ficha{

    constructor(context, path, posX, posY, radius){
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.fichaCreada = new Image();
        this.fichaCreada.src = path;
        this.velocity = 0;
    }

    isSelected(posX, posY){
        let _x = this.posX - posX;
        let _y = this.posY - posY;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
    isNotSelected(){ //?
        this.isSelected = false;
    }

    setWidth(width){
        this.width = width;
    }
    setHeight(height){
        this.height = height;
    }
    
    getPositionX(){
        return this.posX;
    }
    getPositionY(){
        return this.posY;
    }
    setPosition(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }

    getVelocity(){
        return this.velocity;
    }
    setVelocity(vel){
        this.velocity = vel;
    }

    getPath(){
        return this.path;
    }

    getRadius(){
        return this.radius;
    }
    
    draw(){
        this.context.save();

        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.clip();
        this.context.drawImage(this.fichaCreada, this.posX - this.radius,this.posY - this.radius, this.radius * 2, this.radius * 2);
        
        this.context.restore();
    }

}