class Timer {

    constructor(time, posX, posY, context, font) {
        this.timer = time;
        this.posX = posX;
        this.posY = posY;
        this.context = context
        this.font = document.fonts.add(font);
        this.fontsize = 46
        this.pausa = false;
        this.mostrar = setInterval(() => {
            if (timer.getTime() > 0 && !this.pausa) {
                timer.setTime(timer.getTime() - 1);
                drawAll();
            } else if (timer.getTime() <= 0) {
                clearInterval(this.mostrar);
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
        this.pausa = pausa;
    }

    setTime(time) {
        this.timer = time;
    }
    isSelected() {
        return false;
    }
    draw() {
        let gradient = context.createLinearGradient(0, this.posY - this.fontsize / 2, 0, this.posY + this.fontsize / 2);
        gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

        context.font = this.fontsize + 'px MKfont';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = gradient;

        context.strokeStyle = 'black';
        context.lineWidth = 4;
        context.strokeText(this.timer, this.posX, this.posY);

        context.fillText(this.timer, this.posX, this.posY);
    }
}