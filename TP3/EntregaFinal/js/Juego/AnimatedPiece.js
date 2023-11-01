class AnimatedPiece{
    
    constructor(context, path, posX, posY, frameWidth, frameRate){
        this.context = context;
        this.img = new Image();
        this.img.src = path;
        this.posX = posX;
        this.posY = posY;
        this.totalFrame;
        this.frameWidth = frameWidth;
        this.frame = 0;
        this.frameRate = frameRate;
        this.img.addEventListener('load', () => {
            this.totalFrame = this.img.width / this.frameWidth-1;
        });
        this.self = this;
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    setPosX(posX){
        this.posX = posX;
    }
    setPosY(posY){
        this.posY = posY;
    }
    setFrame(nFrame){
        this.frame = nFrame;
    }

    draw() {
        this.context.drawImage(this.img, this.frameWidth * this.frame, 0, this.frameWidth, this.img.height, 
                                this.getPosX(), this.getPosY(), this.frameWidth, this.img.height);
    }
    
    startAnimation(){
        if (this.frame < this.totalFrame) {
            let timeOut = setTimeout(() => {
                drawAll();
                this.frame++;
                this.startAnimation();
                clearTimeout(timeOut);
            }, this.frameRate);
        }
    }
}