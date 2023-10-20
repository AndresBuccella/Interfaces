const canvas = document.querySelector('#main-canvas');
const context = canvas.getContext('2d');

const fichaSubZero = new Image();
fichaSubZero.src = '../sub-zero.svg';
/*
const fichaScorpion = new Image();
fichaScorpion.src = '../scorpion.svg';

fichaScorpion.onload = function(){
    context.drawImage(fichaScorpion, 160, 0);
    context.drawImage(fichaScorpion, 180, 0);
    context.drawImage(fichaScorpion, 200, 0);
    context.drawImage(fichaScorpion, 220, 0);
}
*/
fichaSubZero.onload = function(){
    context.drawImage(fichaSubZero, 450, 0);
    context.drawImage(fichaSubZero, 430, 0);
    context.drawImage(fichaSubZero, 410, 0);
    context.drawImage(fichaSubZero, 390, 0);
}


function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    // Realiza cualquier redibujado necesario
    fichaScorpion.onload;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Llama a la función al cargar la página











/*
const boton = document.querySelector("#boton").addEventListener('click', dibujarCasa);

let initialX;
let initialY;

const dibujar = (cursorX, cursorY) =>{
    context.beginPath();
    context.moveTo(initialX,initialY);
    context.lineWidth = 50; //grosor del trazo
    context.strokeStyle = '#000'; //color del trazo
    context.lineJoin = 'round'; //forma del trazo en bordes y terminacion de linea, en este caso redondeado
    context.lineCap = 'round'; //lo mismo
    context.lineTo(cursorX,cursorY);
    context.stroke();

    initialX = cursorX;
    initialY = cursorY;
}

const mouseDown = (evt) => {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
    dibujar(initialX,initialY);
    canvas.addEventListener('mousemove', mouseMoving);
}

const mouseMoving = (evt) => {
    dibujar(evt.offsetX, evt.offsetY);
}

const mouseUp = (evt) =>{
    canvas.removeEventListener('mousemove', mouseMoving);
}

canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);

function dibujarCasa() {
    context.lineWidth = 10;

    // Muro
    context.strokeRect(75, 140, 150, 110);

    // Puerta
    context.fillRect(130, 190, 40, 60);

    // Techo
    context.beginPath();
    context.moveTo(50, 140);
    context.lineTo(150, 60);
    context.lineTo(250, 140);
    context.closePath();
    context.stroke();
}*/