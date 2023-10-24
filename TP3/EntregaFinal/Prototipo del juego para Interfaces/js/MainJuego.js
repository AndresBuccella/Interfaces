const canvas = document.querySelector('#main-canvas');
const context = canvas.getContext('2d');

const imagenLateral = 'the-tower.png';
const imagenTop = 'imagenTop.png';
const imagenPinchos = 'pinchos.png';

const imagenSubZero = 'sub-zero.png';
const imagenScorpion = 'scorpion.png';

const pathCentral = 'casilla.png';
const pathCentralInside = 'casilla-interior.png';
const pathCentralBackground= 'casilla-relleno.png';
const xEnLinea = 4

const anchoTheTower= Math.floor(canvas.clientWidth/10);
//const spriteHeightTop = 126;
const spriteHeightTop = canvas.clientHeight/5 + 6;
const spriteHeightBot = 0;
const spriteHeightPinchos = 45;

//son 0 y 1 para compararlos con el modulo de turno
const player1 = 1;
const player2 = 2;


// Obtén el offset del canvas
var offsetLeft = canvas.offsetLeft;
var offsetTop = canvas.offsetTop;

console.log('OffsetLeft:', offsetLeft);
console.log('OffsetTop:', offsetTop);


let elements = [];
let arrTablero = [];
let arrDeco = [];
let arrFichas = [];

let lastClickedFigure = null;
let difX = 0;
let difY = 0;
let mouseDown = false;
let widthCanvas = canvas.clientWidth;

let elemTop = new PiezaDecorativa(context, imagenTop, 0, 0, widthCanvas, spriteHeightTop);
arrDeco.push(elemTop);

let lateralIzquierdo = new PiezaDecorativa(context, imagenLateral, 0, spriteHeightTop, anchoTheTower, canvas.clientHeight - spriteHeightTop);
let lateralDerecho = new PiezaDecorativa(context, imagenLateral, canvas.clientWidth - anchoTheTower, spriteHeightTop, anchoTheTower, canvas.clientHeight - spriteHeightTop);


let tablero = new Tablero(canvas, context, xEnLinea, pathCentral,pathCentralInside,pathCentralBackground,spriteHeightTop,spriteHeightBot,
    lateralDerecho.getWidth(), lateralIzquierdo.getWidth());


let pinchos = new PiezaDecorativa(context, imagenPinchos, anchoTheTower, canvas.clientHeight - spriteHeightPinchos, canvas.clientWidth - anchoTheTower - anchoTheTower, spriteHeightPinchos);


arrDeco.push(lateralIzquierdo);
arrDeco.push(lateralDerecho);

//Fichas
const yFichas = canvas.clientHeight/7;
const cantFichas = 10;
let fichaRadius =32* Math.min( tablero.getWidthCasilla()/90,tablero.getHeightCasilla()/90);

//Creacion de fichas jugador 1

for (let i = cantFichas; i > 0; i--) {
    const fichaSubZero = new Ficha(context, imagenSubZero, player2, (widthCanvas/2 + 250) + fichaRadius * i, yFichas, fichaRadius, 20);
    arrFichas.push(fichaSubZero);
}
//Creacion de fichas jugador 2
for (let i = cantFichas; i > 0; i--) {
    const fichaScorpion = new Ficha(context, imagenScorpion, player1, (widthCanvas/2 - 250) - fichaRadius * i, yFichas, fichaRadius, 20);
    arrFichas.push(fichaScorpion);
}


arrTablero.push(tablero);
arrTablero.push(pinchos);
/* const timeMin = 5;
let timer = new Timer(timeMin*60, 0,0);
setInterval(() => {
    if (timer.getTime() > 0) {
        timer.setTime(timer.getTime()-1);
        drawAll();
    }
}, 1000);
arrDeco.push(timer); */

elements.push(arrDeco);
elements.push(arrFichas);
elements.push(arrTablero);

function drawAll() {
    clearCanvas();
    /*
    //no es buena fórmula pero es una idea para hacerlo responsive
    let scale = (canvas.clientWidth) / (canvas.clientWidth + canvas.clientHeight)
    */

    for (const arreglos of elements) {
        for (const elemento of arreglos) {
            elemento.draw();
        }
    }
    if (lastClickedFigure != null && mouseDown) {
        lastClickedFigure.draw();
    }
};

function clearCanvas(){
    let gradiente = context.createLinearGradient(100,0,0, canvas.clientHeight);
    gradiente.addColorStop(0,'#FF8A00');
    gradiente.addColorStop(1,'#FF0000');
    context.fillStyle = gradiente;
    context.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

function findClickedFigure(x, y) {
    for (const ficha of arrFichas) {
        if (ficha.isSelected(x, y)) {
            return ficha;
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
        posX = e.layerX;
        if (e.layerY < tablero.getMarginTop() - lastClickedFigure.getRadius()) {
            posY = e.layerY
        }
        lastClickedFigure.setPosition(posX - difX, posY - difY);
        drawAll();
    }
}

//Correccion de caida
function correccionCaidaX(e) {
    
    let anchoCasillaTablero = tablero.getWidthCasilla();
    let posX = e.layerX - difX;

    if(posX < anchoTheTower) { posX = anchoTheTower}
    //el -1 es necesario porque no acepta iguales el if de mas abajo
    if(posX > (anchoTheTower + tablero.getWidth())) 
        posX = anchoTheTower + tablero.getWidth()-1;

    let aux = 0;
    for (let i = 0; i < tablero.getCantCol(); i++) {
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
    return Math.round(anchoTheTower + anchoCasillaTablero / 2 * ((aux*2)+1));
}

//Caida de la ficha 

let velocity = 0;
let gravity = 1;
let velocityLimit = 20;
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
                tablero.winner(lastClickedFigure);
                lastClickedFigure = null;
                velocity = 0;
                tablero.resetSuelo();
                eventListenerOn();
                cambioTurno();
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
        lastClickedFigure.colocada();
        let posX = correccionCaidaX(e);
        let columna = tablero.getColumnaExacta(posX);
        if(tablero.getFilaDisponible(columna) != -1){
            tablero.calcularNuevoSuelo(columna);
            tablero.cargarEnMatriz(lastClickedFigure, posX);
        }else{
            lastClickedFigure.volverAPosicionInicial();
        }
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
function cambioTurno() {
    for (const ficha of arrFichas) {
        if(((turno % 2) + 1) != ficha.getPlayer()){
            ficha.noSeleccionable();
        }else{
            ficha.esSeleccionable();
        }
    }
    turno++;
}
let turno = 0;
setTimeout(function () {
    //JUEGO
    drawAll();
    cambioTurno();
}, 100)
