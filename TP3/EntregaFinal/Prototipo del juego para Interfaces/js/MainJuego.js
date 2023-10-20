const canvas = document.querySelector('#main-canvas');
const context = canvas.getContext('2d');
const imagenSubZero = 'sub-zero.png';
const imagenScorpion = 'scorpion.png';

let elements = [];
let lastClickedFigure = null;
let mouseDown = false;
let gravity = 0.1;
let velocityLimit = 5;
let tile = new PiezaDecorativa(context, imagenScorpion,0,0,100,100);
elements.push(tile);
const fichaSubZero = new Ficha(context, imagenSubZero,210,90, 32);
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

//SE DIBUJA POR UN SETTIMEOUT BUSCAR OTRA SOLUCION

function drawAll() {
    clearCanvas();
    //no es buena fórmula pero es una idea para hacerlo responsive
    let scale = (canvas.clientWidth)/(canvas.clientWidth+canvas.clientHeight)
    for (const element of elements) {
        element.draw();
    }
};
function clearCanvas(){
    context.fillStyle = '#fafafa';
    context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
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


document.querySelector('#boton').addEventListener('click', ()=>{
    console.log("in");
const fichaSubZeroo = new Ficha(context, imagenSubZero,310,90, 32);
elements.push(fichaSubZeroo);
drawAll();
})






setTimeout(function(){
    drawAll();
}, 1)


