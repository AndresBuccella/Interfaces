class Pause{

    constructor(context, img, posX, posY, width, height) {
        this.context = context;
        this.img = img;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
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
    draw() {

        this.context.save();

        this.context.beginPath();
        this.context.arc(this.getPositionX(), this.getPositionY(), 30, 0, Math.PI * 2, true);
        this.context.closePath();

        this.context.clip();
        this.context.drawImage(this.getImage(), this.getPositionX() - this.radius, this.getPositionY() - this.radius, this.radius * 2, this.radius * 2);

        this.context.restore();
    }
}