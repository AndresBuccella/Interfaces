class AnimatedPiece {

    constructor(context, path, posX, posY, frameWidth, duration, loop) {
        this.context = context;
        this.img = new Image();
        this.img.src = path;
        this.posX = posX;
        this.posY = posY;
        this.totalFrame;
        this.frameWidth = frameWidth;
        this.frame = 0;
        this.duration = duration;
        this.loop = loop;
        this.img.addEventListener('load', () => {
            this.totalFrame = this.img.width / this.frameWidth - 1;
            this.duration = Math.floor(this.duration / this.totalFrame);
        });
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getFrameWidth() {
        return this.frameWidth;
    }
    getFrameHight() {
        return this.frameWidth;
    }
    setPosX(posX) {
        this.posX = posX;
    }
    setPosY(posY) {
        this.posY = posY;
    }
    setFrame(nFrame) {
        this.frame = nFrame;
    }
    setLoop(val){
        this.loop=val;
    }
    
    draw() {
        this.context.drawImage(this.img, this.frameWidth * this.frame, 0, this.frameWidth, this.img.height,
            this.getPosX(), this.getPosY(), this.frameWidth, this.img.height);
    }

    startAnimation() {
        if (this.frame < this.totalFrame) {
            let timeOut = setTimeout(() => {
                this.frame++;
                drawAll(mouseX, mouseY);
                this.startAnimation();
                clearTimeout(timeOut);
            }, this.duration);
        } else if (this.loop > -1) {
            let timeOut = setTimeout(() => {
                this.setFrame(0);
                this.startAnimation();
                console.log("a");
                clearTimeout(timeOut);
            }, this.loop);
        }
    }
}