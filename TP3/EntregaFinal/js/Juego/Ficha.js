
class Ficha{

    constructor(context, img, player, posX, posY, radius, bounces, sndSkewered, sndDefenestrate) {
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.img = img;
        this.posIniX = posX;
        this.posIniY = posY;
        this.posIniXto = posX;
        this.player = player;
        this.radius = radius;
        this.velocity = 0;
        this.seleccionable = false;
        this.estaColocada = false;
        this.maxbounces = bounces;
        this.bounces = bounces;
        this.sndSkewered = sndSkewered;
        this.sndDefenestrate = sndDefenestrate;
        setInterval(() => {
            if (this.posIniX != this.posIniXto && !this.getFiguraIsColocada()) {
                let orientacion = Math.sign(this.getPosIniXto() - this.getPosIniX());
                //Posiciona
                this.setPosition(this.getPositionX() + Math.min(1, Math.abs(this.getPosIniXto() - this.getPosIniX())) * orientacion, this.getPositionY())
                this.setPositionXOrigin(this.getPositionX());
            }
        }, 1000 / 60);
    }

    //GETTERS
    getPositionX(){
        return this.posX;
    }
    getPositionY(){
        return this.posY;
    }
    getNombre() {
        return this.img.alt;
    }
    getPlayer() {
        return this.player;
    }
    getRadius() {
        return this.radius;
    }
    getVelocity() {
        return this.velocity;
    }
    getPosIniX() {
        return this.posIniX;
    }
    getPosIniY() {
        return this.posIniY;
    }
    getPosIniXto() {
        return this.posIniXto;
    }

    getFiguraIsColocada() {
        return this.estaColocada;
    }
    getEstado() {
        return this.seleccionable;
    }

    //Rebotes
    getMaxBounces() {
        return this.maxbounces;
    }
    getBounces() {
        return this.bounces;
    }

    //SETTERS
    setPosition(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }
    setImage(img){
        this.img=img
    }
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    setPositionXOrigin(posIniX) {
        this.posIniX = posIniX;
    }
    setPositionXOriginTo(posIniXto) {
        this.posIniXto = posIniXto;
    }
    setVelocity(vel) {
        this.velocity = vel;
    }
    setBounces(bounces) {
        this.bounces = bounces;
    }
    setSeleccionable(bool) {
        this.seleccionable = bool;
    }
    colocada(bool) {
        this.estaColocada = bool;
        this.setSeleccionable(!bool);
    }
    playSkewered(){
        this.sndSkewered.play();
    }
    playDefenestrate(){
        this.sndDefenestrate.play();
    }

    //DEMAS METODOS    
    isSelected(posX, posY) {
        if ((!this.getFiguraIsColocada()) && (this.getEstado())) {
            let _x = this.posX - posX;
            let _y = this.posY - posY;
            return Math.sqrt(_x * _x + _y * _y) < this.radius;
        }

    }
    volverAPosicionInicial() {
        this.setPosition(this.posIniX, this.posIniY);
    }

    draw() {
        if (this.getEstado()) {

            this.context.beginPath();

            this.context.arc(this.posX, this.posY, this.radius + 4, 0, 2 * Math.PI);
            this.context.fillStyle = "transparent";
            this.context.fill();

            var degradado = this.context.createRadialGradient(this.posX, this.posY, this.radius, this.posX, this.posY, this.radius + 4);
            degradado.addColorStop(1, "#ff0000" + "00");
            degradado.addColorStop(0, "#ff0000");
            this.context.fillStyle = degradado;

            this.context.arc(this.posX, this.posY, this.radius + 4, 0, 2 * Math.PI);
            this.context.fill();

            this.context.closePath();
        }
        this.context.save();

        this.context.beginPath();
        this.context.arc(this.getPositionX(), this.getPositionY(), this.radius, 0, Math.PI * 2, true);
        this.context.closePath();

        this.context.clip();
        this.context.drawImage(this.img, this.getPositionX() - this.radius, this.getPositionY() - this.radius, this.radius * 2, this.radius * 2);

        this.context.restore();
    }

}