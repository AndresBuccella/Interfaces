class PiezaDecorativa extends Ficha{

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
        /* 
        El metodo draw() comienza guardando el estado actual del contexto para posteriormente dibujar la imágen que será recortada.
        Se cambia la configuracion por defecto de glonalCompositeOperation ('destination-out') para que en vez de 
        que rellene el centro,rellene el exterior, de modo que ahora el interior de la próxima figura es hueco. 
        Se dibuja el círculo centrado en la mitad del ancho y del alto de la imágen y se rellena el exterior. 
        Posteriormente se vuelve la configuracion globalCompositeOperation a su configuración por defecto 'source-over'.
        */
        this.context.save();
        
        
        this.context.drawImage(this.pieza, this.getPositionX(), this.getPositionY(), this.getWidth(), this.getHeight());
        // Crea una máscara circular transparente
        this.context.globalCompositeOperation = 'destination-out';
        
        this.#cutPiece();
           // Restaura la composición global a su valor predeterminado
        this.context.globalCompositeOperation = 'source-over';
        
        this.context.restore();

    }
    
    #cutPiece(){

        this.context.beginPath();
        this.context.arc(this.posX + this.getWidth() / 2, this.posY + this.getHeight() / 2, 
                    /*podria ser el tamaño de la ficha */this.width/2.5, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        
    }
}