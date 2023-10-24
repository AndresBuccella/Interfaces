class Timer{
    constructor(time, posX, posY){
        this.timer = time;
        this.posX = posX;
        this.posY = posY;
        setInterval(() => {
            if (timer.getTime() > 0) {
                timer.setTime(timer.getTime()-1);
            }
        }, 1000);
    }

    setTime(time){
        this.timer = time;
    }
    getTime(){
        return this.timer;
    }
    isSelected(){
        return false;
    }
    draw(){console.log(this.getTime());}
}