class AnimatedPiece{
    
    constructor(path, posX, posY, frameWidth, frameRate){
        this.img = new Image();
        this.img.src = path;
        this.posX = posX;
        this.posY = posY;
        this.totalFrame;
        this.frameWidth = frameWidth;
        this.frame = 0;
        this.frameRate = frameRate;
        this.img.addEventListener('load', () => {
            totalFrame = img.width / frameWidth-1;
        });
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

    draw() {
        drawAll();

        context.drawImage(img, frameWidth * frame, 0, frameWidth, img.height, 0, 0, frameWidth, img.height);

        if (frame == totalFrame) {
            cancelAnimationFrame(draw);
            this.frame = 0;
        } else {
            frame++;
        }

        let timeOut = setTimeout(() => {
            requestAnimationFrame(draw);
            clearTimeout(timeOut);
        }, this.frameRate)
    }
}