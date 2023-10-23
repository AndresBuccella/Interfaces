const canvas = document.querySelector('#main-canvas');
const context = canvas.getContext('2d');

const imagenLateral = 'the-tower.png';
const imagenTop = 'imagenTop.png';
const imagenPinchos = 'pinchos.png';

const imagenSubZero = 'sub-zero.png';
const imagenScorpion = 'scorpion.png';
const yFichas = canvas.clientHeight/7;
const cantFichas = 10;

const piezaTablero = 'board.png';
const pathLateral = 'lateral-board.png';
const pathCentral = 'board.png';
const pathEsquina = 'corner-board.png';

const cantColTablero = 6;
const cantFilTablero = 7;

const widthLateralIzquierdo = Math.floor(canvas.clientWidth/10);
const widthLateralDerecho = Math.floor(canvas.clientWidth/10);
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

let fichaRadius = canvas.clientHeight/20;
let fichaRadiusMax = 25;
if (fichaRadius > fichaRadiusMax) {
    fichaRadius = fichaRadiusMax;
}

let lastClickedFigure = null;
let difX = 0;
let difY = 0;
let mouseDown = false;
let widthCanvas = canvas.clientWidth;

let elemTop = new PiezaDecorativa(context, imagenTop, 0, 0, widthCanvas, spriteHeightTop);
elements.push(elemTop);
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


let tablero = new Tablero(canvas, context, cantFilTablero, cantColTablero, pathLateral, pathEsquina, pathCentral,spriteHeightTop,spriteHeightBot,
    widthLateralDerecho, widthLateralIzquierdo);
tablero.createBoard();
let piezasTablero = tablero.getImages();
for (const pieza of piezasTablero/* tablero.getImages() */) {
    elements.push(pieza);
}


let lateralIzquierdo = new PiezaDecorativa(context, imagenLateral, 0, spriteHeightTop, widthLateralIzquierdo, canvas.clientHeight - spriteHeightTop);
elements.push(lateralIzquierdo);
let lateralDerecho = new PiezaDecorativa(context, imagenLateral, canvas.clientWidth - widthLateralDerecho, spriteHeightTop, widthLateralIzquierdo, canvas.clientHeight - spriteHeightTop);
elements.push(lateralDerecho);
let pinchos = new PiezaDecorativa(context, imagenPinchos, widthLateralIzquierdo, canvas.clientHeight - spriteHeightPinchos, canvas.clientWidth - widthLateralIzquierdo - widthLateralDerecho, spriteHeightPinchos);
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
};

function clearCanvas(){
    let gradient = context.createLinearGradient(100,0,0, canvas.clientHeight);
    gradient.addColorStop(0,'#FF8A00');
    gradient.addColorStop(1,'#FF0000');
    context.fillStyle = gradient;
    context.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

function findClickedFigure(x, y) {
    for (const element of elements) {
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

    if(posX < widthLateralIzquierdo) { posX = widthLateralIzquierdo}
    //el -1 es necesario porque no acepta iguales el if de mas abajo
    if(posX > (widthLateralIzquierdo + tablero.getWidth())) 
        posX = widthLateralIzquierdo + tablero.getWidth()-1;

    let aux = 0;
    for (let i = 0; i < cantColTablero; i++) {
        if((posX>=(widthLateralIzquierdo + anchoCasillaTablero * i)) && 
        (posX<(widthLateralIzquierdo + anchoCasillaTablero * (i+1)))){
            lastClickedFigure.setPosition(
                (widthLateralIzquierdo + anchoCasillaTablero / 2 * ((i*2)+1)), 
                e.layerY
            );
            aux=i;
        }
    }
    //si no se apagan hace cosas raras. Se vuelven a activar cuando termina de caer la ficha
    eventListenerOff();
    return Math.floor(widthLateralIzquierdo + anchoCasillaTablero / 2 * ((aux*2)+1));
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
        //Por que se le resta la velocidad?
        if (lastClickedFigure.getPositionY() > tablero.getSuelo() - velocity) {
            if (lastClickedFigure.getBounces() > 0 && lastClickedFigure.getVelocity() > 0) {
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
/* (tablero.getHeightCasilla()/2) * 
                (cantFilTablero - tablero.getFilaDisponible(columna)) */
setInterval(function () {
    gravedad();
}, 1000 / 60);



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
    drawAll();
    /* while (true) {
        
    } */
}, 100)
