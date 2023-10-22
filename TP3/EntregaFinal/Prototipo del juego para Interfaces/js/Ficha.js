
class Ficha  extends Pieza{

    constructor(context, path, posX, posY, radius, bounces) {
        super(context, path, posX, posY);
        this.radius = radius;
        this.velocity = 0;
        this.maxbounces = bounces;
        this.bounces = bounces;
    }

    //GETTERS
    //Rebotes
    getMaxBounces() {
        return this.maxbounces;
    }
    
    getBounces() {
        return this.bounces;
    }
    getRadius() {
        return this.radius;
    }
    getVelocity() {
        return this.velocity;
    }

    //SETTERS
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    
    setVelocity(vel) {
        this.velocity = vel;
    }
    
    setBounces(bounces) {
        this.bounces = bounces;
    }

    //DEMAS METODOS    
    isSelected(posX, posY) {
        let _x = this.posX - posX;
        let _y = this.posY - posY;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
    
    draw() {
        this.context.save();
        
        this.context.beginPath();
        this.context.arc(this.getPositionX(), this.getPositionY(), this.radius, 0, Math.PI * 2, true);
        this.context.closePath();

        this.context.clip();
        this.context.drawImage(this.getImage(), this.getPositionX() - this.radius,this.getPositionY() - this.radius, this.radius * 2, this.radius * 2);
        
        this.context.restore();
    }

}