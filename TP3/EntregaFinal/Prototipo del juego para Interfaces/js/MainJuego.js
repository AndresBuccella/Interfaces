const canvas = document.querySelector('#main-canvas');
const context = canvas.getContext('2d');
const imagenSubZero = 'sub-zero.png';
const imagenScorpion = 'scorpion.png';
const piezaTablero = 'board.png';
const pathLateral = 'lateral-board.png';
const pathCentral = 'board.png';
const pathEsquina = 'corner-board.png';
const widthLateralIzquierdo = 80;
const widthLateralDerecho = 80;
const spriteHeightTop = 126;
const spriteHeightBot = 0;

// Obtén el offset del canvas
var offsetLeft = canvas.offsetLeft;
var offsetTop = canvas.offsetTop;

console.log('OffsetLeft:', offsetLeft);
console.log('OffsetTop:', offsetTop);


let elements = [];

let fichaRadius = 32;

let lastClickedFigure = null;
let difX = 0;
let difY = 0;
let mouseDown = false;

const fichaSubZero = new Ficha(context, imagenSubZero, 215, 90, fichaRadius, 20);
elements.push(fichaSubZero);

let tablero = new Tablero(canvas, context, pathLateral, pathEsquina, pathCentral,spriteHeightTop,spriteHeightBot,
    widthLateralDerecho, widthLateralIzquierdo);
tablero.createBoard(6,7);
let piezasTablero = tablero.getImages();
for (const pieza of piezasTablero/* tablero.getImages() */) {
    elements.push(pieza);
}

const fichaSubZero2 = new Ficha(context, imagenSubZero, 250, 90, fichaRadius, 20);
elements.push(fichaSubZero2);

let lateralIzquierdo = new PiezaDecorativa(context, imagenLateral, 0, 0, widthLaterales, canvas.clientHeight,);
elements.push(lateralIzquierdo);
let tile = new PiezaDecorativa(context, piezaTablero, widthLaterales, 0, 100, 100);
elements.push(tile);


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
    /* context.fillStyle = '#fafafa';
    context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight); */
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
function onMouseUp(e) {
    mouseDown = false;
    fichaCayendo = true;
}

//Caida de la ficha 

let velocity = 0;
let gravity = 1;
let velocityLimit = 20;

function gravedad(e) {
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
        console.log(velocity);
        if (lastClickedFigure.getPositionY() > canvas.clientHeight - fichaRadius - velocity) {
            if (lastClickedFigure.getBounces() > 0 && lastClickedFigure.getVelocity() > 0.6) {
                lastClickedFigure.setBounces(lastClickedFigure.getBounces() - 1);
                lastClickedFigure.setVelocity(-lastClickedFigure.getVelocity()*0.7); //Perdida de energia???
                lastClickedFigure.setPosition(lastClickedFigure.getPositionX(),canvas.clientHeight - fichaRadius);
            }
            else {
                lastClickedFigure.setBounces(lastClickedFigure.getMaxBounces());
                lastClickedFigure.setVelocity(0);
                lastClickedFigure.setPosition(lastClickedFigure.getPositionX(),canvas.clientHeight - fichaRadius);
                lastClickedFigure = null;
                velocity = 0
            }
        }
        drawAll();
    }
}
//carga 

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
//pendiente para corregir 
canvas.addEventListener('wheel', prueba, false);

function prueba(e) {
    if (mouseDown && lastClickedFigure != null) {
        console.log(e.deltaY);
        lastClickedFigure.setPosition(e.pageX, e.pageY + e.deltaY);
        drawAll();
    }
}

setInterval(gravedad, 1000 / 60);


setTimeout(function () {
    drawAll();
}, 100)
