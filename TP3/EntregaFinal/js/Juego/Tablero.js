class Tablero {

    constructor(canvas, context, xEnLinea, filas, columnas, pathCenter, pathCentralInside, pathCentralBackground,
        marginTop, marginBottom, marginRight, marginLeft) {
        //Optimizable
        this.context = context;
        this.canvas = canvas;
        this.xEnLinea = xEnLinea;
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

        this.matriz = [[]];
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.matriz[[fila, columna]] = 0;
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
    cargarEnMatriz(player, posX) {
        let columna = this.getColumnaExacta(posX);
        let fila = this.getFilaDisponible(columna);
        console.log('Cae en columna: ' + columna);
        console.log('Cae en fila: ' + fila);
        this.matriz[[fila, columna]] = player;
        this.winner(fila, columna, player);
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
    isSelected() {
        return false;
    }

    winner(fila, columna, nombre) {
        let posibleGanador = this.matriz[[fila, columna]];
        //se puede hacer en un arreglo "mas mejor"
        let posibilidades = {
            'diagonalNormal': 1,
            'diagonalInvertida': 1,
            'vertical': 1,
            'horizontal': 1
        };
        console.log("in winna: " + nombre);

        for (let i = 1; i < this.xEnLinea; i++) {
            if ((columna + i < this.getCantCol()) && this.matriz[[fila, columna + i]] == nombre) {
                posibilidades.horizontal = posibilidades.horizontal + 1;
            } else {
                break;
            }
        }
        for (let i = 1; i < this.xEnLinea; i++) {
            if ((columna - i >= 0) && this.matriz[[fila, columna - i]] == nombre) {
                posibilidades.horizontal = posibilidades.horizontal + 1;
            } else {
                break;
            }
        }

        for (let i = 1; i < this.xEnLinea; i++) {
            if ((columna + i < this.getCantCol()) && (fila + i < this.getCantFil()) &&
                this.matriz[[fila + i, columna + i]] == nombre) {
                posibilidades.diagonalNormal = posibilidades.diagonalNormal + 1;
            } else {
                break;
            }
        }
        for (let i = 1; i < this.xEnLinea; i++) {
            if ((columna - i >= 0) && (fila - i >= 0) && this.matriz[[fila - i, columna - i]] == nombre) {
                posibilidades.diagonalNormal = posibilidades.diagonalNormal + 1;
            } else {
                break;
            }
        }

        console.log(posibilidades.diagonalNormal);
        console.log(posibilidades.diagonalInvertida);
        console.log(posibilidades.vertical);
        console.log(posibilidades.horizontal);
        if (posibilidades.horizontal == this.xEnLinea) { console.log(nombre + " wins"); }
        else {
            posibilidades = {
                'diagonalNormal': 0,
                'diagonalInvertida': 0,
                'vertical': 0,
                'horizontal': 0
            };
        }
    }
}