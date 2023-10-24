class Timer{
    constructor(time, posX, posY){
        this.timer = time;
        this.posX = posX;
        this.posY = posY;
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