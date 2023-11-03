class Pause {

    constructor(context, posX, posY, radius) {
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
    }

    //GETTERS
    getPositionX() {
        return this.posX;
    }
    getPositionY() {
        return this.posY;
    }
    getPath() {
        return this.img;
    }
    getImage() {
        return this.image
    }

    //SETTERS
    setPosition(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    setImage(img) {
        this.image = img
    }

    isSelected(mouseX,mouseY){
        let _x = this.posX - mouseX;
        let _y = this.posY - mouseY;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
    draw() {

        this.context.save();

        this.context.beginPath();
        this.context.arc(this.getPositionX(), this.getPositionY(), this.radius-2, 0, Math.PI * 2, true);
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();
        this.context.beginPath();
        this.context.lineWidth = 5;
        this.context.moveTo(this.getPositionX() + this.radius / 4, this.getPositionY() - this.radius / 2);
        this.context.lineTo(this.getPositionX() + this.radius / 4, this.getPositionY() + this.radius / 2)
        this.context.stroke();
        this.context.closePath();
        this.context.beginPath();
        this.context.lineWidth = 5;
        this.context.moveTo(this.getPositionX() - this.radius / 4, this.getPositionY() - this.radius / 2);
        this.context.lineTo(this.getPositionX() - this.radius / 4, this.getPositionY() + this.radius / 2)
        this.context.stroke();
        this.context.closePath();
        
        //this.context.fillStyle = 'red';
        //this.context.fill();
        
        
        this.context.restore();
    }
}