class PiezaDecorativa{

    constructor(context, path, posX, posY, width, height){
        this.context = context;
        this.pieza = new Image();
        this.pieza.src = path;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
    isSelected(posX, posY){
        return false;
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
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    setWidth(width){
        this.width = width;
    }
    setHeight(height){
        this.height = height;
    }
    
    draw(){
        this.context.save();
        this.context.drawImage(this.pieza, this.getPositionX(), this.getPositionY(), this.getWidth(), this.getHeight());
        this.context.restore();
    }
    
}