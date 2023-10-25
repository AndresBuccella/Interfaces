class PiezaDecorativa extends Pieza{

    constructor(context, path, posX, posY, width, height){
        super(context, path, posX, posY);
        this.width = width;
        this.height = height;
    }
    
    // GETTERS
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    
    //SETTERS
    setWidth(width){
        this.width = width;
    }
    setHeight(height){
        this.height = height;
    }
    
    //DEMAS METODOS
    isSelected(posX, posY){
        return false;
    }
    
    draw(){
        this.context.save();
        this.context.drawImage(this.getImage(), this.getPositionX(), this.getPositionY(), this.getWidth(), this.getHeight());
        this.context.restore();
    }
    
}