
class Ficha  extends Pieza{

    constructor(context, path, player, posX, posY, radius, bounces) {
        super(context, path, posX, posY);
        this.path = path;
        this.posIniX = posX;
        this.posIniY = posY;
        this.player = player;
        this.radius = radius;
        this.velocity = 0;
        this.seleccionable = true;
        this.estaColocada = false;
        this.maxbounces = bounces;
        this.bounces = bounces;
    }
    
    //GETTERS
    getNombre(){
        //convierte un string en arreglo
        let arrNombre = [...this.path];
        let nombreFinal = '';
        for (let i = 0; i < arrNombre.length; i++) {
            if(arrNombre[i] === '.'){
                return nombreFinal;
            }
            /* if(arrNombre[i] === '-'){
                arrNombre[i] = ' ';
            } */
            nombreFinal += arrNombre[i];
        }
    }
    getPlayer(){
        return this.player;
    }
    
    getRadius() {
        return this.radius;
    }
    getVelocity() {
        return this.velocity;
    }
    getPosIniX(){
        return this.posIniX;
    }
    getPosIniY(){
        return this.posIniY;
    }
    //Rebotes
    getMaxBounces() {
        return this.maxbounces;
    }
    
    getBounces() {
        return this.bounces;
    }

    //SETTERS
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    
    setVelocity(vel) {
        this.velocity = vel;
    }
    
    setBounces(bounces) {
        this.bounces = bounces;
    }
    colocada(){
        this.estaColocada = true;
        this.noSeleccionable();
    }
    figuraColocada(){
        return this.estaColocada;
    }
    getEstado(){
        return this.seleccionable;
    }
    esSeleccionable(){
        this.seleccionable = true;
    }
    noSeleccionable(){
        this.seleccionable = false;
    }

    //DEMAS METODOS    
    isSelected(posX, posY) {
        if((!this.estaColocada)&&(this.seleccionable)){
            let _x = this.posX - posX;
            let _y = this.posY - posY;
            return Math.sqrt(_x * _x + _y * _y) < this.radius;
        }

    }
    volverAPosicionInicial(){
        this.setPosition(this.posIniX, this.posIniY);
    }
    
    draw() {
        this.context.save();
        
        this.context.beginPath();
        this.context.arc(this.getPositionX(), this.getPositionY(), this.radius, 0, Math.PI * 2, true);
        this.context.closePath();

        this.context.clip();
        this.context.drawImage(this.getImage(), this.getPositionX() - this.radius,this.getPositionY() - this.radius, this.radius * 2, this.radius * 2);
        
        this.context.restore();
    }

}