class Timer {
    constructor(time, posX, posY, context, font) {
        this.timer = time;
        this.posX = posX;
        this.posY = posY;
        this.context = context
        this.fontsize = 46
        this.font = document.fonts.add(font);
        setInterval(() => {
            if (timer.getTime() > 0) {
                timer.setTime(timer.getTime() - 1);
                drawAll();
            }
        }, 1000);
    }

    setTime(time) {
        this.timer = time;
    }
    getTime() {
        return this.timer;
    }
    isSelected() {
        return false;
    }
    draw() {
        var gradient =context.createLinearGradient(0, this.posY-this.fontsize/2, 0, this.posY+this.fontsize/2);
        gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

        context.font = this.fontsize+'px MKfont';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = gradient;

        context.strokeStyle = 'black';
        context.lineWidth = 4;
        context.strokeText(this.timer, this.posX, this.posY);

        context.fillText(this.timer, this.posX, this.posY);
    }
}