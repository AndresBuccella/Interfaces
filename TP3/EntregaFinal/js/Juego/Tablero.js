class Tablero {

    constructor(canvas, context, xEnLinea, pathCenter, pathCentralInside, pathCentralBackground,
        marginTop, marginBottom, marginRight, marginLeft) {
        //Optimizable
        this.context = context;
        this.canvas = canvas;
        this.xEnLinea = xEnLinea;
        this.filas = this.xEnLinea + 2;
        this.columnas = this.xEnLinea + 3;

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



        this.matriz = [[]];
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.matriz[[fila, columna]] = null;
            }
        }
        this.suelo = canvas.clientHeight - this.getHeightCasilla() / 2;
    }

    getMarginTop() {
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
        for (let fila = this.getCantFil() - 1; fila >= 0; fila--) {
            if (this.matriz[[fila, columna]] == null) {
                return fila
            }
        }
        return -1;
    }
    getColumnaExacta(posX) {
        let columna = Math.floor((posX - this.marginLeft) / this.getWidthCasilla());
        return columna;
    }

    calcularNuevoSuelo(columna) {
        this.suelo = this.suelo - (this.getHeightCasilla() * (this.filas - (this.getFilaDisponible(columna) + 1)));
    }
    cargarEnMatriz(ficha) {
        let columna = this.getColumnaExacta(ficha.getPositionX());
        let fila = this.getFilaDisponible(columna);
        this.matriz[[fila, columna]] = ficha;
        return this.winner(fila, columna, ficha.getNombre());
    }
    draw() {
        //se calcula el espacio disponible para el tablero y se lo divide por la cantidad de columnas 
        //que va a tener
        let posX = 0;
        let posY = 0;

        let widthPiece = this.getWidthCasilla();
        let heightPiece = this.getHeightCasilla();
        let min = Math.min(widthPiece, heightPiece)

        this.context.save();
        for (let j = 0; j < this.getCantFil(); j++) {
            posY = this.marginTop + heightPiece * j;
            for (let i = 0; i < this.getCantCol(); i++) {
                posX = this.marginLeft + widthPiece * i;
                this.context.drawImage(this.pathCentralBackground, posX, posY, (widthPiece - min) / 2 + 1, heightPiece);
                this.context.drawImage(this.pathCentralBackground, posX + widthPiece - (widthPiece - min) / 2 - 1, posY, (widthPiece - min) / 2, heightPiece);
                this.context.drawImage(this.pathCentralInside, posX + (widthPiece - min) / 2, posY + (heightPiece - min) / 2, min, min);
                this.context.drawImage(this.pathCenter, posX, posY, widthPiece, heightPiece);
            }
        }
        this.context.restore();
    }

    winner(fila, columna, jugador) {
        let countFicha = 1;

        //COMPROBACION HORIZONTAL
        for (let i = 1; i < this.xEnLinea && countFicha < this.xEnLinea; i++) {
            if ((columna + i < this.getCantCol()) &&
                this.matriz[[fila, columna + i]] != null &&
                this.matriz[[fila, columna + i]].getNombre() == jugador) {
                countFicha++;
            } else {
                break;
            }
        }
        for (let i = 1; i < this.xEnLinea && countFicha < this.xEnLinea; i++) {
            if ((columna - i >= 0) &&
                this.matriz[[fila, columna - i]] != null &&
                this.matriz[[fila, columna - i]].getNombre() == jugador) {
                countFicha++;
            } else {
                break;
            }
        }
        if (countFicha === this.xEnLinea) {
            return jugador;
        }
        countFicha = 1;

        //COMPROBACION EN UNA DIAGONAL
        for (let i = 1; i < this.xEnLinea && countFicha < this.xEnLinea; i++) {
            if ((columna + i < this.getCantCol()) && (fila + i < this.getCantFil()) &&
                this.matriz[[fila + i, columna + i]] != null &&
                this.matriz[[fila + i, columna + i]].getNombre() == jugador) {
                countFicha++;
            } else {
                break;
            }
        }
        for (let i = 1; i < this.xEnLinea && countFicha < this.xEnLinea; i++) {
            if ((columna - i >= 0) && (fila - i >= 0) &&
                this.matriz[[fila - i, columna - i]] != null &&
                this.matriz[[fila - i, columna - i]].getNombre() == jugador) {
                countFicha++;
            } else {
                break;
            }
        }
        if (countFicha === this.xEnLinea) {
            return jugador;
        }
        countFicha = 1;

        //COMPROBACION EN OTRA DIAGONAL

        for (let i = 1; i < this.xEnLinea && countFicha < this.xEnLinea; i++) {
            if ((columna + i < this.getCantCol()) && (fila - i >= 0) &&
                this.matriz[[fila - i, columna + i]] != null &&
                this.matriz[[fila - i, columna + i]].getNombre() == jugador) {
                countFicha++;
            } else {
                break;
            }
        }
        for (let i = 1; i < this.xEnLinea && countFicha < this.xEnLinea; i++) {
            if ((columna - i >= 0) && (fila - i < this.getCantFil()) &&
                this.matriz[[fila + i, columna - i]] != null &&
                this.matriz[[fila + i, columna - i]].getNombre() == jugador) {
                countFicha++;
            } else {
                break;
            }
        }
        if (countFicha === this.xEnLinea) {
            return jugador;
        }
        countFicha = 1;

        //COMPROBACION VERTICAL

        for (let i = 1; i < this.xEnLinea && countFicha < this.xEnLinea; i++) {
            if ((fila + i < this.getCantFil()) &&
                this.matriz[[fila + i, columna]] != null &&
                this.matriz[[fila + i, columna]].getNombre() == jugador) {
                countFicha++;
            } else {
                break;
            }
        }
        if (countFicha === this.xEnLinea) {
            return jugador;
        }
        
        return null;
    }
}