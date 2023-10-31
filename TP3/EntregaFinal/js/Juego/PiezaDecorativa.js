class PiezaDecorativa{

    constructor(context, path, posX, posY, width, height){
        this.context = context;
        this.image = new Image();
        this.image.src = path;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
    
    //GETTERS
    getPositionX(){
        return this.posX;
    }
    getPositionY(){
        return this.posY;
    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    
    //SETTERS
    setPosition(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }
    setWidth(width){
        this.width = width;
    }
    setHeight(height){
        this.height = height;
    }
    
    //DEMAS METODOS
    
    draw(){
        this.context.save();
        this.context.drawImage(this.image, this.getPositionX(), this.getPositionY(), this.getWidth(), this.getHeight());
        this.context.restore();
    }
    
}