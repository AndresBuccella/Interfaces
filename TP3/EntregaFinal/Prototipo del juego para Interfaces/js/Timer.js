class Timer {
    constructor(time, posX, posY, context, font) {
        this.timer = time;
        this.posX = posX;
        this.posY = posY;
        this.context = context

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
        var gradient = context.createLinearGradient(3.5, 0, 0, 30);
        gradient.addColorStop(0, 'red'); 
        gradient.addColorStop(1, 'yellow');

        context.font = '30px MKfont';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = gradient;
        context.fillText(this.timer, this.posX, this.posY+45);
    }
}