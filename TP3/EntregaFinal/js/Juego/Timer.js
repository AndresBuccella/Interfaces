class Timer {

    constructor(time, posX, posY, context, font) {
        this.timer = time;
        this.timerOrig = time;
        this.posX = posX;
        this.posY = posY;
        this.context = context
        this.font = document.fonts.add(font);
        this.fontsize = 42;
        this.fontSizeDraw = 90;
        this.pausa = false;
        this.mostrar = setInterval(() => {
            if (timer.getTime() > 0 && !this.pausa) {
                timer.setTime(timer.getTime() - 1);
                drawAll();
            } else if (timer.getTime() <= 0) {
                this.borrarIntervalo();
                draw = true; //empate
            }
        }, 1000);
    }
    getTime() {
        return this.timer;
    }

    getPausa() {
        return this.pausa;
    }
    setPausa(pausa) {
        this.pausa = pausa; //bool
    }

    setTime(time) {
        this.timer = time;
    }
    resetTimer(){
        this.timer = this.timerOrig;
    }

    borrarIntervalo(){
        clearInterval(this.mostrar);
    }
    draw() {
        drawText(`${this.timer}`, this.fontsize,  canvas.clientWidth / 2, this.posY);
        
        if (this.getTime() <= 0) {
            drawText('DRAW', this.fontSizeDraw, canvas.clientWidth / 2, canvas.clientHeight / 3);
            context.drawImage(drawMenuImg, 0, 0, canvas.clientWidth, canvas.clientHeight);
        }
    }
}