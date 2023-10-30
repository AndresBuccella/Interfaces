class Pause extends Pieza{

    constructor(context, path, posX, posY, width, height){
        super(context, path, posX, posY);
        this.width = width;
        this.height = height;
    }

    draw(){
        
        this.context.save();

        this.context.beginPath();
        this.context.arc(this.getPositionX(), this.getPositionY(), 30, 0, Math.PI * 2, true);
        this.context.closePath();

        this.context.clip();
        this.context.drawImage(this.getImage(), this.getPositionX() - this.radius, this.getPositionY() - this.radius, this.radius * 2, this.radius * 2);

        this.context.restore();
    }
}