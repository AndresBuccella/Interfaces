class Tablero{

    constructor(canvas, context, pathLateral, pathCorner, pathCenter,
        marginTop, marginBottom, marginRight, marginLeft){
    //Optimizable
        this.context = context;
        this.canvas = canvas;
        this.marginTop = marginTop;
        this.marginBottom = marginBottom;
        this.marginRight = marginRight;
        this.marginLeft = marginLeft;
        this.arrImages = [];

        this.pathLateral = pathLateral;
        this.pathCenter = pathCenter;
        this.pathCorner = pathCorner;
    }
    getImages(){
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

    createBoard(cantFil, cantCol){
        //se calcula el espacio disponible para el tablero y se lo divide por la cantidad de columnas 
        //que va a tener
        let posX = 0;
        let posY = 0;
        let widthPiece = Math.floor((this.canvas.clientWidth - this.marginRight - this.marginLeft) / cantCol);
        let heightPiece = Math.floor((this.canvas.clientHeight - this.marginTop - this.marginBottom) / cantFil);
        //let heightPiece = widthPiece/ 4 * 3;
        for (let j = 0; j < cantFil; j++) {
            posY = this.marginTop + heightPiece * j;
            for (let i = 0; i < cantCol; i++) {
                posX = this.marginLeft + widthPiece * i;
                let piece = new PiezaDecorativa(this.context, this.pathCenter, posX, posY, widthPiece, heightPiece);
                this.arrImages.push(piece);
                console.log(piece);
            }
        }
        /* let siguienteIndice = 0;

        return {
            next: function() {
            return siguienteIndice < arreglo.length ?
                { value: arreglo[siguienteIndice++], done: false } :
                { done: true };
                }
            }; */
    }
}