class Tablero{

    constructor(canvas, context, cantFil, cantCol, pathLateral, pathCorner, pathCenter,
        marginTop, marginBottom, marginRight, marginLeft){
    //Optimizable
        this.context = context;
        this.canvas = canvas;
        this.cantFil = cantFil;
        this.cantCol = cantCol;
        this.marginTop = marginTop;
        this.marginBottom = marginBottom;
        this.marginRight = marginRight;
        this.marginLeft = marginLeft;
        this.arrImages = [];

        this.pathLateral = pathLateral;
        this.pathCenter = pathCenter;
        this.pathCorner = pathCorner;

        this.tablero = [[]];
        for (let fila = 0; fila < this.cantFil; fila++) {
            for (let columna = 0; columna < this.cantCol; columna++) {
                this.tablero[[fila,columna]] = 0;
            }
        }
    }

    getWidthCasilla(){
        return this.getWidth() / this.getCantCol();
    }
    getHeightCasilla(){
        return this.getHeight() / this.getCantFil();
    }

    getWidth(){
        return this.canvas.clientWidth - this.marginRight - this.marginLeft;
    }
    getHeight(){
        return this.canvas.clientHeight - this.marginTop - this.marginBottom;
    }
    getOrigX(){
        return this.marginLeft;
    }
    getOrigY(){
        return this.marginTop;
    }
    getCantFil(){
        return this.cantFil;
    }
    getCantCol(){
        return this.cantCol;
    }
    
    cargarEnMatriz(posX) {
        let fila = 0;
        let columna = Math.floor((posX-this.marginLeft) / this.getWidthCasilla());
        console.log('Cae en columna: ' + columna);
        this.tablero[[fila, columna]];
    }

    createBoard(){
        //se calcula el espacio disponible para el tablero y se lo divide por la cantidad de columnas 
        //que va a tener
        let posX = 0;
        let posY = 0;
        
        let widthPiece = this.getWidthCasilla();
        let heightPiece = this.getHeightCasilla();
        
        for (let j = 0; j < this.getCantFil(); j++) {
            posY = this.marginTop + heightPiece * j;
            for (let i = 0; i < this.getCantCol(); i++) {
                posX = this.marginLeft + widthPiece * i;
                let piece = new PiezaDecorativa(this.context, this.pathCenter, posX, posY, widthPiece, heightPiece);
                this.arrImages.push(piece);
            }
        }
    }
    getImages(){
        //Padre de Marge: "NO ME VEEEAAAS"
        return this.arrImages;
    
         /* let siguienteIndice = 0;
    
        return {
            next: function() {
            return siguienteIndice < this.arrImages.length ?
                { value: arreglo[siguienteIndice++], done: false } :
                { done: true };
                }
            }; */
    }
}