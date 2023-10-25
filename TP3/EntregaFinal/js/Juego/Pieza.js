class Pieza{
    
    constructor(context, path, posX, posY){
        this.context = context;
        this.image = new Image();
        this.image.src = path;
        this.posX = posX;
        this.posY = posY;
    }

    //GETTERS
    getPositionX(){
        return this.posX;
    }
    getPositionY(){
        return this.posY;
    }
    getPath(){
        return this.path;
    }
    getImage(){
        return this.image
    }

    //SETTERS
    setPosition(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }
    
    //DEMAS METODOS
    isSelected(posX, posY){ };
    draw(){ };
    
}