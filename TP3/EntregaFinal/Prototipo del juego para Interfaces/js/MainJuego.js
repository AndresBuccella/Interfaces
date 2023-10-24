const canvas = document.querySelector('#main-canvas');
const context = canvas.getContext('2d');

const imagenLateral = 'the-tower.png';
const imagenTop = 'imagenTop.png';
const imagenPinchos = 'pinchos.png';

const imagenSubZero = 'sub-zero.png';
const imagenScorpion = 'scorpion.png';
const yFichas = canvas.clientHeight/7;
const cantFichas = 10;

const pathCentral = 'board.png';
const pathCentralInside = 'board-inside.png';
const pathCentralBackground= 'board-background.png';
const cantFilTablero = 7;
const cantColTablero = 6;

const anchoTheTower= Math.floor(canvas.clientWidth/10);
//const spriteHeightTop = 126;
const spriteHeightTop = canvas.clientHeight/5 + 6;
const spriteHeightBot = 0;
const spriteHeightPinchos = 45;

const player1 = 1;
const player2 = 2;


// Obtén el offset del canvas
var offsetLeft = canvas.offsetLeft;
var offsetTop = canvas.offsetTop;

console.log('OffsetLeft:', offsetLeft);
console.log('OffsetTop:', offsetTop);


let elements = [];

let lastClickedFigure = null;
let difX = 0;
let difY = 0;
let mouseDown = false;
let widthCanvas = canvas.clientWidth;

let elemTop = new PiezaDecorativa(context, imagenTop, 0, 0, widthCanvas, spriteHeightTop);
elements.push(elemTop);

let lateralIzquierdo = new PiezaDecorativa(context, imagenLateral, 0, spriteHeightTop, anchoTheTower, canvas.clientHeight - spriteHeightTop);
let lateralDerecho = new PiezaDecorativa(context, imagenLateral, canvas.clientWidth - anchoTheTower, spriteHeightTop, anchoTheTower, canvas.clientHeight - spriteHeightTop);


let tablero = new Tablero(canvas, context, cantFilTablero, cantColTablero, pathCentral,pathCentralInside,pathCentralBackground,spriteHeightTop,spriteHeightBot,
    lateralDerecho.getWidth(), lateralIzquierdo.getWidth());


let pinchos = new PiezaDecorativa(context, imagenPinchos, anchoTheTower, canvas.clientHeight - spriteHeightPinchos, canvas.clientWidth - anchoTheTower - anchoTheTower, spriteHeightPinchos);


elements.push(lateralIzquierdo);
elements.push(lateralDerecho);

//Fichas
let fichaRadius =32* Math.min( tablero.getWidthCasilla()/90,tablero.getHeightCasilla()/90);
let fichaRadiusMax =32* Math.min( tablero.getWidthCasilla()/90,tablero.getHeightCasilla()/90);
if (fichaRadius > fichaRadiusMax) {
    fichaRadius = fichaRadiusMax;
}

//Creacion de fichas jugador 1

for (let i = 1; i < cantFichas; i++) {
    const fichaSubZero = new Ficha(context, imagenSubZero, player1, -widthCanvas/8 + fichaRadius * i, yFichas, fichaRadius, 20);
    elements.push(fichaSubZero);
}
//Creacion de fichas jugador 2
for (let i = 1; i < cantFichas; i++) {
    const fichaScorpion = new Ficha(context, imagenScorpion, player2, (widthCanvas + widthCanvas/8) - fichaRadius * i, yFichas, fichaRadius, 20);
    elements.push(fichaScorpion);
}


elements.push(tablero);
elements.push(pinchos);

function drawAll() {
    clearCanvas();
    /*
    //no es buena fórmula pero es una idea para hacerlo responsive
    let scale = (canvas.clientWidth) / (canvas.clientWidth + canvas.clientHeight)
    */

    for (const element of elements) {
        element.draw();
    }
    if (lastClickedFigure != null && mouseDown) {
        lastClickedFigure.draw();
    }
};

function clearCanvas(){
    let gradient = context.createLinearGradient(100,0,0, canvas.clientHeight);
    gradient.addColorStop(0,'#FF8A00');
    gradient.addColorStop(1,'#FF0000');
    context.fillStyle = gradient;
    context.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

function findClickedFigure(x, y) {
    for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (element.isSelected(x, y)) {
            return element;
        }
    }
}
function onMouseDown(e) {
    if (lastClickedFigure == null) {
        mouseDown = true;

        let clickFig = findClickedFigure(e.layerX, e.layerY);

        if (clickFig != null) {
            lastClickedFigure = clickFig;
            lastClickedFigure.setBounces(lastClickedFigure.getMaxBounces());
            difX = e.layerX - clickFig.getPositionX();
            difY = e.layerY - clickFig.getPositionY();
        }
        drawAll();
    }
}

function onMouseMove(e) {
    if (mouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.layerX - difX, e.layerY - difY);
        drawAll();
    }
}

//Correccion de caida
function correccionCaidaX(e) {
    
    let anchoCasillaTablero = tablero.getWidthCasilla();
    let posX = e.layerX;

    if(posX < anchoTheTower) { posX = anchoTheTower}
    //el -1 es necesario porque no acepta iguales el if de mas abajo
    if(posX > (anchoTheTower + tablero.getWidth())) 
        posX = anchoTheTower + tablero.getWidth()-1;

    let aux = 0;
    for (let i = 0; i < cantColTablero; i++) {
        if((posX>=(anchoTheTower + anchoCasillaTablero * i)) && 
        (posX<(anchoTheTower + anchoCasillaTablero * (i+1)))){
            lastClickedFigure.setPosition(
                (anchoTheTower + anchoCasillaTablero / 2 * ((i*2)+1)), 
                e.layerY
            );
            aux=i;
        }
    }
    //si no se apagan hace cosas raras. Se vuelven a activar cuando termina de caer la ficha
    eventListenerOff();
    return Math.floor(anchoTheTower + anchoCasillaTablero / 2 * ((aux*2)+1));
}

//Caida de la ficha 

let velocity = 0;
let gravity = 1;
let velocityLimit = 20;
//let suelo = canvas.clientHeight - fichaRadius;
//console.log("Height casilla: "+tablero.getHeightCasilla());
function gravedad() {
    if (lastClickedFigure != null && !mouseDown) {
        velocity = lastClickedFigure.getVelocity() + gravity;
        if (velocity > velocityLimit) {
            velocity = velocityLimit;
        }
        lastClickedFigure.setVelocity(velocity);
        lastClickedFigure.setPosition(
            lastClickedFigure.getPositionX(),
            lastClickedFigure.getPositionY() + velocity
        );

        if (lastClickedFigure.getPositionY() > tablero.getSuelo() - velocity) {
            if (lastClickedFigure.getBounces() > 0 && lastClickedFigure.getVelocity() > 0.6) {
                lastClickedFigure.setBounces(lastClickedFigure.getBounces() - 1);
                lastClickedFigure.setVelocity(-lastClickedFigure.getVelocity() * 0.7); //Perdida de energia (?
                lastClickedFigure.setPosition(lastClickedFigure.getPositionX(), tablero.getSuelo());
            }
            else {
                lastClickedFigure.setBounces(lastClickedFigure.getMaxBounces());
                lastClickedFigure.setVelocity(0);
                lastClickedFigure.setPosition(lastClickedFigure.getPositionX(), tablero.getSuelo());
                lastClickedFigure = null;
                velocity = 0;
                tablero.resetSuelo();
                eventListenerOn();
            }
        }
        drawAll();
    }
}

setInterval(function () {
    gravedad();
}, 1000 / 60);

function onMouseUp(e) {
    mouseDown = false;
    //fichaCayendo = true;
    if (lastClickedFigure != null) {
        let posX = correccionCaidaX(e);
        let columna = tablero.getColumnaExacta(posX);
        tablero.calcularNuevoSuelo(columna);
        tablero.cargarEnMatriz(posX, tablero.getFilaDisponible(posX));
    }
}




//carga 
function eventListenerOn() {
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    //pendiente para corregir 
    canvas.addEventListener('wheel', prueba, false);
    
}
eventListenerOn();

function eventListenerOff(){
    canvas.removeEventListener('mousedown', onMouseDown, false);
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
}

function prueba(e) {
    if (mouseDown && lastClickedFigure != null) {
        console.log(e.deltaY);
        lastClickedFigure.setPosition(e.pageX, e.pageY + e.deltaY);
        drawAll();
    }
}
setTimeout(function () {
    //JUEGO
    let turno = 0;
    console.log(turno);
    drawAll();
    /* while (true) {
        
    } */
}, 100)
