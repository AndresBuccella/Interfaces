class Pieza{
    
    constructor(context, path, posX, posY){
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
    setImage(img){
        this.image=img
    }
    
    //DEMAS METODOS
    isSelected(posX, posY){ };
    draw(){ };
    
}