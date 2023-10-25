const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

const imagenLateral = "../images/juegoMK/the-tower.png";
const imagenTop = "../images/juegoMK/imagenTop.png";
const imagenPinchos = "../images/juegoMK/pinchos.png";

const imagenSubZero = "../images/juegoMK/sub-zero.png";
const imagenScorpion = "../images/juegoMK/scorpion.png";

const pathCentral = "../images/juegoMK/casilla.png";
const pathCentralInside = "../images/juegoMK/casilla-interior.png";
const pathCentralBackground = "../images/juegoMK/casilla-relleno.png";
const xEnLinea = 4;
const columnas = 7;
const filas = 6;

//Fonts
let fontFile = "../css/fonts/mk2.ttf";
// Cargar la fuente utilizando FontFace
let customFont = new FontFace("MKfont", `url(${fontFile})`);

const anchoTheTower = Math.floor(canvas.clientWidth / 10);
//const spriteHeightTop = 126;
const spriteHeightTop = canvas.clientHeight / 5 + 6;
const spriteHeightBot = 0;
const spriteHeightPinchos = 45;

//son 0 y 1 para compararlos con el modulo de turno
const player1 = 1;
const player2 = 2;

// Obtén el offset del canvas
let offsetLeft = canvas.offsetLeft;
let offsetTop = canvas.offsetTop;

let elements = [];
let arrTablero = [];
let arrDeco = [];
let arrFichas = [];
let arrFichaScorpion = [];
let arrFichaSubZero = [];

let lastClickedFigure = null;
let mouseDown = false;
let widthCanvas = canvas.clientWidth;

let elemTop = new PiezaDecorativa(
  context,
  imagenTop,
  0,
  0,
  widthCanvas,
  spriteHeightTop
);
arrDeco.push(elemTop);

let lateralIzquierdo = new PiezaDecorativa(
  context,
  imagenLateral,
  0,
  spriteHeightTop,
  anchoTheTower,
  canvas.clientHeight - spriteHeightTop
);
let lateralDerecho = new PiezaDecorativa(
  context,
  imagenLateral,
  canvas.clientWidth - anchoTheTower,
  spriteHeightTop,
  anchoTheTower,
  canvas.clientHeight - spriteHeightTop
);

let tablero = new Tablero(
  canvas,
  context,
  xEnLinea,
  filas,
  columnas,
  pathCentral,
  pathCentralInside,
  pathCentralBackground,
  spriteHeightTop,
  spriteHeightBot,
  lateralDerecho.getWidth(),
  lateralIzquierdo.getWidth()
);

let pinchos = new PiezaDecorativa(
  context,
  imagenPinchos,
  anchoTheTower,
  canvas.clientHeight - spriteHeightPinchos,
  canvas.clientWidth - anchoTheTower - anchoTheTower,
  spriteHeightPinchos
);

arrDeco.push(lateralIzquierdo);
arrDeco.push(lateralDerecho);

//Fichas
const yFichas = canvas.clientHeight / 7;
const cantFichas = Math.floor(
  (tablero.getCantFil() * tablero.getCantCol()) / 2
);
let fichaRadius =
  32 *
  Math.min(tablero.getWidthCasilla() / 90, tablero.getHeightCasilla() / 90);

//Creacion de fichas jugador 1
for (
  let i =
    cantFichas + (tablero.getCantFil() * tablero.getCantCol() - cantFichas * 2);
  i > 0;
  i--
) {
  const fichaScorpion = new Ficha(
    context,
    imagenScorpion,
    player1,
    widthCanvas / 2 - widthCanvas * 0.4 - fichaRadius * i,
    yFichas,
    fichaRadius,
    20
  );
  arrFichaScorpion.push(fichaScorpion);
}

//Creacion de fichas jugador 2

for (let i = cantFichas; i > 0; i--) {
  const fichaSubZero = new Ficha(
    context,
    imagenSubZero,
    player2,
    widthCanvas / 2 + widthCanvas * 0.4 + fichaRadius * i,
    yFichas,
    fichaRadius,
    20
  );
  arrFichaSubZero.push(fichaSubZero);
}

arrFichas = arrFichas.concat(arrFichaScorpion);
arrFichas = arrFichas.concat(arrFichaSubZero);

arrTablero.push(tablero);
arrTablero.push(pinchos);

//Timer
let timer = null;
const timeMin = 5;
customFont.load().then(() => {
  timer = new Timer(timeMin * 60, widthCanvas / 2, 80, context, customFont);
  arrDeco.push(timer);
});

elements.push(arrDeco);
elements.push(arrFichaScorpion);
elements.push(arrFichaSubZero);
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
}

function clearCanvas() {
  let gradiente = context.createLinearGradient(100, 0, 0, canvas.clientHeight);
  gradiente.addColorStop(0, "#888888");
  gradiente.addColorStop(1, "#555555");
  context.fillStyle = gradiente;
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function findClickedFigure(x, y) {
  /*  for (const ficha of arrFichas) {
         if (ficha.isSelected(x, y)) {
             return ficha;
         }
     } */
  for (let i = arrFichas.length - 1; i >= 0; i--) {
    if (arrFichas[i].isSelected(x, y)) {
      return arrFichas[i];
    }
  }
}
function onMouseDown(e) {
  if (lastClickedFigure == null) {
    mouseDown = true;

    let clickFig = findClickedFigure(
      e.layerX - offsetLeft,
      e.layerY - offsetTop
    );

    if (clickFig != null) {
      lastClickedFigure = clickFig;
      lastClickedFigure.setBounces(lastClickedFigure.getMaxBounces());
    }
    drawAll();
  }
}

function onMouseMove(e) {
  if (mouseDown && lastClickedFigure != null) {
    posX = e.layerX - offsetLeft;
    posY = e.layerY - offsetTop;
    lastClickedFigure.setPosition(posX, posY);
    drawAll();
  }
}

//Correccion de caida
function correccionCaidaX() {
  lastClickedFigure.setPosition(
    anchoTheTower +
    tablero.getColumnaExacta(lastClickedFigure.getPositionX()) * tablero.getWidthCasilla() +
    tablero.getWidthCasilla() / 2,
    lastClickedFigure.getPositionY()
  );
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
      if (
        lastClickedFigure.getBounces() > 0 &&
        lastClickedFigure.getVelocity() > 0.6
      ) {
        lastClickedFigure.setBounces(lastClickedFigure.getBounces() - 1);
        lastClickedFigure.setVelocity(-lastClickedFigure.getVelocity() * 0.6); //Perdida de energia (?
        lastClickedFigure.setPosition(
          lastClickedFigure.getPositionX(),
          tablero.getSuelo()
        );
        //aca podria ir la animacion de sangrado
      } else {
        lastClickedFigure.setBounces(lastClickedFigure.getMaxBounces());
        lastClickedFigure.setVelocity(0);
        lastClickedFigure.setPosition(
          lastClickedFigure.getPositionX(),
          tablero.getSuelo()
        );
        //tablero.winner(lastClickedFigure);
        lastClickedFigure = null;
        velocity = 0;
        tablero.resetSuelo();
        cambioTurno();
      }
    }
    drawAll();
  }
}

setInterval(function () {
  gravedad();
}, 1000 / 60);

function onMouseUp() {
  //fichaCayendo = true;
  if ((lastClickedFigure != null)&& (mouseDown)) {
    mouseDown = false;
    //delimita la seccion en donde se puede tirar la ficha
    if (
      lastClickedFigure.getPositionY() < spriteHeightTop - lastClickedFigure.getRadius() && //impide que se pueda tirar por debajo del limite superior del tablero
      lastClickedFigure.getPositionX() > anchoTheTower &&
      lastClickedFigure.getPositionX() < canvas.clientWidth - anchoTheTower
    ) {
      //Impide que se pueda tirar a los costados del tablero
      
      let columna = tablero.getColumnaExacta(lastClickedFigure.getPositionX());
      if (tablero.getFilaDisponible(columna) != -1) {
        correccionCaidaX();
        
        lastClickedFigure.colocada();
        for (const ficha of arrFichas) {
          if (
            ficha.getPlayer() === player1 &&
            (turno % 2) + 1 == player2 &&
            !ficha.getFiguraIsColocada()
          ) {
            ficha.setPositionXOriginTo(ficha.getPosIniX() + ficha.getRadius());
          } else {
            if (
              ficha.getPlayer() === player2 &&
              (turno % 2) + 1 == player1 &&
              !ficha.getFiguraIsColocada()
            ) {
              ficha.setPositionXOriginTo(
                ficha.getPosIniX() - ficha.getRadius()
              );
            }
          }
        }
        tablero.calcularNuevoSuelo(columna);
        tablero.cargarEnMatriz(lastClickedFigure.getPlayer(), posX);
      } else {
        lastClickedFigure.volverAPosicionInicial();
        lastClickedFigure = null;
        drawAll();
      }
    } else {
      lastClickedFigure.volverAPosicionInicial();
      /* lastClickedFigure.setPosition(
        lastClickedFigure.getPosIniX(),
        lastClickedFigure.getPosIniY()
      ); */
      lastClickedFigure = null;
      drawAll();
    }
  }
}

//carga
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);


//function eventListenerOn() {
//}
//eventListenerOn();

/* function eventListenerOff() {
  canvas.removeEventListener("mousedown", onMouseDown, false);
  canvas.removeEventListener("mouseup", onMouseUp, false);
  canvas.removeEventListener("mousemove", onMouseMove, false);
} */

function cambioTurno() {
  if ((turno % 2) + 1 == player1) {
    for (let i = 0; i < arrFichaScorpion.length; i++) {
      if (
        i == arrFichaScorpion.length - 1 &&
        !arrFichaScorpion[i].getFiguraIsColocada()
      ) {
        arrFichaScorpion[i].esSeleccionable();
      } else {
        if (
          !arrFichaScorpion[i].getFiguraIsColocada() &&
          arrFichaScorpion[i + 1].getFiguraIsColocada()
        ) {
          arrFichaScorpion[i].esSeleccionable();
        }
      }
    }
  } else {
    for (let i = 0; i < arrFichaSubZero.length; i++) {
      if (
        i == arrFichaSubZero.length - 1 &&
        !arrFichaSubZero[i].getFiguraIsColocada()
      ) {
        arrFichaSubZero[i].esSeleccionable();
      } else {
        if (
          !arrFichaSubZero[i].getFiguraIsColocada() &&
          arrFichaSubZero[i + 1].getFiguraIsColocada()
        ) {
          arrFichaSubZero[i].esSeleccionable();
        }
      }
    }
  }

  turno++;
}
let turno = 0;
setTimeout(function () {
  //JUEGO
  drawAll();
  cambioTurno();
}, 100);
