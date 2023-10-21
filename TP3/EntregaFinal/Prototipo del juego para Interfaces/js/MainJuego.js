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

let elements = [];

let lastClickedFigure = null;
let mouseDown = false;
let gravity = 0.1;
let velocityLimit = 5;
//tamanio de la ficha 40 de radio para el tile de 200x200
const fichaSubZero = new Ficha(context, imagenSubZero,215,90, 42);
/* const fichaSubZero2 = new Ficha(context, imagenSubZero,230,90, 32);
const fichaSubZero3 = new Ficha(context, imagenSubZero,250,90, 32);
const fichaSubZero4 = new Ficha(context, imagenSubZero,270,90, 32);

const fichaScorpion = new Ficha(context, imagenScorpion,450,90, 32);
const fichaScorpion2 = new Ficha(context, imagenScorpion,470,90, 32);
const fichaScorpion3 = new Ficha(context, imagenScorpion,490,90, 32);
const fichaScorpion4 = new Ficha(context, imagenScorpion,510,90, 32);
 */
elements.push(fichaSubZero);
/* elements.push(fichaSubZero2);
elements.push(fichaSubZero3);
elements.push(fichaSubZero4);
elements.push(fichaScorpion4);
elements.push(fichaScorpion3);
elements.push(fichaScorpion2);
elements.push(fichaScorpion); */
/* let lateralIzquierdo = new PiezaDecorativa(context, imagenLateral, 0, 0, widthLaterales, canvas.clientHeight);
elements.push(lateralIzquierdo); */
/* let tile = new PiezaDecorativa(context, piezaTablero,widthLaterales,0,100,100);
elements.push(tile); */
let tablero = new Tablero(canvas, context, pathLateral, pathEsquina, pathCentral,spriteHeightTop,spriteHeightBot,
    widthLateralDerecho, widthLateralIzquierdo);
tablero.createBoard(6,7);
let piezasTablero = tablero.getImages();
for (const pieza of piezasTablero/* tablero.getImages() */) {
    elements.push(pieza);
}

function drawAll() {
    clearCanvas();
    //no es buena fórmula pero es una idea para hacerlo responsive
    let scale = (canvas.clientWidth)/(canvas.clientWidth+canvas.clientHeight)
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

function findClickedFigure(x,y){
    for (const element of elements) {
        if (element.isSelected(x,y)) {
            return element;
        }
    }
    /* No usar forEach, no sé por qué pero no funciona con esto 

        elements.forEach(element => {
        if (element.isSelected(x,y)) {
            return element;
        }
    }); */
}
function onMouseDown(e){
    mouseDown = true;

    if (lastClickedFigure != null) {

        lastClickedFigure = null;
    }

    let clickFig = findClickedFigure(e.layerX,e.layerY);
    
    if (clickFig != null) {

        lastClickedFigure = clickFig;
        
        /* //Para que se dupliquen al tomarlas.
        const nuevaFicha = new Ficha(context, imagenSubZero, e.layerX, e.layerY, 32);
        lastClickedFigure = nuevaFicha;
        elements.push(nuevaFicha);
     */
    }
    drawAll();

}

function onMouseMove(e){
    if (mouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        drawAll();
    }
}
function onMouseUp(e){
    mouseDown = false;
/*
    drawAll();
    gravedad(e);
    if (lastClickedFigure.getPositionY() < canvas.clientHeight - 32) {
        
        requestAnimationFrame(onMouseUp);
    }
*/
}

function gravedad(e){
    let velocity = lastClickedFigure.getVelocity() - gravity;
    lastClickedFigure.setVelocity(velocity);
    if (velocity > velocityLimit) {
        velocity = velocityLimit;
    }
    lastClickedFigure.setPosition(e.layerX, lastClickedFigure.getPositionY() + velocity);
    if (lastClickedFigure.getPositionY() < canvas.clientHeight - 32) {
    }
    console.log(elements.length);
}
//carga 

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
//pendiente para corregir 
canvas.addEventListener('wheel', prueba, false);

function prueba(e){
    if (mouseDown && lastClickedFigure != null) {
        console.log(e.deltaY);
        lastClickedFigure.setPosition(e.pageX, e.pageY + e.deltaY);
        drawAll();
    }
}
setTimeout(function(){
    drawAll();
}, 1000)