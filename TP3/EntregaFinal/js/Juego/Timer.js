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
    resetTimer() {
        this.timer = this.timerOrig;
    }

    borrarIntervalo() {
        clearInterval(this.mostrar);
    }
    draw() {
        if (this.timer != Infinity) {
            drawText(`${this.timer}`, this.fontsize, 800 / 2, this.posY);
        } else {
            context.imageSmoothingEnabled = false;
            context.drawImage(imgInfinito, 800 / 2 - 45, this.posY - 45, 90, 90);
            context.imageSmoothingEnabled = true;
        }

        if (this.getTime() <= 0) {
            drawText('DRAW', this.fontSizeDraw, 800 / 2, 600 / 3);
            context.drawImage(drawMenuImg, 0, 0, 800, 600);
        }
    }
}