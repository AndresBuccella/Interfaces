class Tablero {

    constructor(canvas, context, xEnLinea,filas,columnas, pathCenter,pathCentralInside,pathCentralBackground,
        marginTop, marginBottom, marginRight, marginLeft) {
        //Optimizable
        this.context = context;
        this.canvas = canvas;
        this.xEnLinea=xEnLinea;
        this.filas = filas;
        this.columnas = columnas;

        this.marginTop = marginTop;
        this.marginBottom = marginBottom;
        this.marginRight = marginRight;
        this.marginLeft = marginLeft;

        this.pathCenter = new Image();
        this.pathCenter.src = pathCenter;
        this.pathCentralInside = new Image();
        this.pathCentralInside.src = pathCentralInside;
        this.pathCentralBackground = new Image();
        this.pathCentralBackground.src = pathCentralBackground;

        this.ultimaFilaAgregada;
        this.ultimaColumnaAgregada;

        this.matriz = [[]];
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.matriz[[fila, columna]] = 0;
            }
        }
        this.suelo = canvas.clientHeight - this.getHeightCasilla() / 2;
    }

    getMarginTop(){
        return this.marginTop;
    }

    getWidthCasilla() {
        return this.getWidth() / this.getCantCol();
    }
    getHeightCasilla() {
        return this.getHeight() / this.getCantFil();
    }

    getWidth() {
        return this.canvas.clientWidth - this.marginRight - this.marginLeft;
    }
    getHeight() {
        return this.canvas.clientHeight - this.marginTop - this.marginBottom;
    }
    getOrigX() {
        return this.marginLeft;
    }
    getOrigY() {
        return this.marginTop;
    }
    getCantFil() {
        return this.filas;
    }
    getCantCol() {
        return this.columnas;
    }
    getSuelo() {
        return this.suelo;
    }

    resetSuelo() {
        this.suelo = canvas.clientHeight - this.getHeightCasilla() / 2;
    }
    getFilaDisponible(columna) {
        for (let fila = 0; fila < this.filas; fila++) {
            if ((this.matriz[[fila, columna]] == 0) && (this.matriz[[fila + 1, columna]] != 0)) {
                return fila;
            } else {
                if (this.matriz[[fila, columna]] != 0) {
                    return -1;
                }
            }

        }
    }
    getColumnaExacta(posX) {
        let columna = Math.floor((posX - this.marginLeft) / this.getWidthCasilla());
        return columna;

    }

    calcularNuevoSuelo(columna) {
        this.suelo = this.suelo - (this.getHeightCasilla() * (this.filas - (this.getFilaDisponible(columna) + 1)));
    }
    cargarEnMatriz(ficha, posX) {
        let columna = this.getColumnaExacta(posX);
        let fila = this.getFilaDisponible(columna);
        console.log('Cae en columna: ' + columna);
        console.log('Cae en fila: ' + fila);
        this.matriz[[fila, columna]] = ficha.getPlayer();
        this.ultimaFilaAgregada = fila;
        this.ultimaColumnaAgregada = columna;
    }

    draw() {
        //se calcula el espacio disponible para el tablero y se lo divide por la cantidad de columnas 
        //que va a tener
        let posX = 0;
        let posY = 0;

        let widthPiece = this.getWidthCasilla();
        let heightPiece = this.getHeightCasilla();
        let min=Math.min( widthPiece,heightPiece)

        this.context.save();
        for (let j = 0; j < this.getCantFil(); j++) {
            posY = this.marginTop + heightPiece * j;
            for (let i = 0; i < this.getCantCol(); i++) {
                posX = this.marginLeft + widthPiece * i;
                this.context.drawImage(this.pathCentralBackground, posX, posY, (widthPiece-min)/2+1,heightPiece);
                this.context.drawImage(this.pathCentralBackground, posX+widthPiece-(widthPiece-min)/2-1, posY, (widthPiece-min)/2,heightPiece);
                this.context.drawImage(this.pathCentralInside, posX+(widthPiece-min)/2, posY+(heightPiece-min)/2,min,min);
                this.context.drawImage(this.pathCenter, posX, posY, widthPiece,heightPiece);
            }
        }
        this.context.restore();
    }
    isSelected(){
        return false;
    }
    
    winner(ficha){
        let posibleGanador = this.matriz[[this.ultimaFilaAgregada, this.ultimaColumnaAgregada]];
        //se puede hacer en un arreglo "mas mejor"
        let cantFichas = 0;
        let cantFichas2 = 0;
        let cantFichas3 = 0;
        let cantFichas4 = 0;
        let cantFichas5 = 0;
        let cantFichas6 = 0;
        let cantFichas7 = 0;
        let cantFichas8 = 0;
        let cantFichas9 = 0;
        for (let i = 0; i < this.xEnLinea; i++) {
            if (this.matriz[[this.ultimaFilaAgregada+i, this.ultimaColumnaAgregada+i]] === ficha.getPlayer()) {
                cantFichas++;
            }
            if (this.matriz[[this.ultimaFilaAgregada-i, this.ultimaColumnaAgregada-i]] === ficha.getPlayer()) {
                cantFichas2++;
            }
            if (this.matriz[[this.ultimaFilaAgregada+i, this.ultimaColumnaAgregada-i]] === ficha.getPlayer()) {
                cantFichas3++;
            }
            if (this.matriz[[this.ultimaFilaAgregada-i, this.ultimaColumnaAgregada+i]] === ficha.getPlayer()) {
                cantFichas4++;
            }
            if (this.matriz[[this.ultimaFilaAgregada, this.ultimaColumnaAgregada+i]] === ficha.getPlayer()) {
                cantFichas5++;
            }
            if (this.matriz[[this.ultimaFilaAgregada-i, this.ultimaColumnaAgregada]] === ficha.getPlayer()) {
                cantFichas6++;
            }
            /* for (let j = 0; j < xEnLinea-1; j++) { //las posibilidades en un sentido
                
            } */
        }
        //console.log(`Ganó: ${ficha.getNombre()}`);
    }
}