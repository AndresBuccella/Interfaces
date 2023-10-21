class Ficha extends Pieza{

    constructor(context, path, posX, posY, radius){
        super(context, path, posX, posY);
        this.radius = radius;
        this.velocity = 0;
    }

    //GETTERS
    getVelocity(){
        return this.velocity;
    }
    
    getRadius(){
        return this.radius;
    }

    //SETTERS
    setRadius(radius){
        this.radius = radius;
    }
    setVelocity(vel){
        this.velocity = vel;
    }

    //DEMAS METODOS
    isSelected(posX, posY){
        let _x = this.getPositionX() - posX;
        let _y = this.getPositionY() - posY;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
    isNotSelected(){ //?
        this.isSelected = false;
    }
    
    draw(){
        this.context.save();
        
        this.context.beginPath();
        this.context.arc(this.getPositionX(), this.getPositionY(), this.radius, 0, Math.PI * 2, true);
        this.context.closePath();

        this.context.clip();
        this.context.drawImage(this.getImage(), this.getPositionX() - this.radius,this.getPositionY() - this.radius, this.radius * 2, this.radius * 2);
        
        this.context.restore();
    }

}