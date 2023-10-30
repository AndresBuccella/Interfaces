const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");


const imagenLateral = "../images/juegoMK/the-tower.png";
const imagenTop = "../images/juegoMK/imagenTop.png";
const imagenPinchos = "../images/juegoMK/pinchos.png";

const pathCentral = "../images/juegoMK/casilla.png";
const pathCentralInside = "../images/juegoMK/casilla-interior.png";
const pathCentralBackground = "../images/juegoMK/casilla-relleno.png";
const xEnLinea = 4;

//Fonts
let fontFile = "../css/fonts/mk2.ttf";
// Cargar la fuente utilizando FontFace
let customFont = new FontFace("MKfont", `url(${fontFile})`);

customFont.load().then(() => { document.fonts.add(customFont); });

const anchoTheTower = Math.floor(canvas.clientWidth / 10);
//const spriteHeightTop = 126;
const spriteHeightTop = canvas.clientHeight / 5 + 6;
const spriteHeightBot = 0;
const spriteHeightPinchos = 45;

//son 0 y 1 para compararlos con el modulo de turno
const player1 = 1;
const player2 = 2;

// Menu
let menu = true;

const player_select = new Image();
player_select.src = "../images/juegoMK/seleccion-jugador.png";

const player_selector_1 = new Image();
player_selector_1.src = "../images/juegoMK/selector-jugador-1.png";
player_selector_1.character = null;

const player_selector_2 = new Image();
player_selector_2.src = "../images/juegoMK/selector-jugador-2.png";
player_selector_2.character = null;

const charactersName = [
    "Liu Kang",
    "Kung Lao",
    "Johnny Cage",
    "Reptile",
    "Sub-Zero",
    "Shang Tsung",
    "Kitana",
    "Jax",
    "Mileena",
    "Baraka",
    "Scorpion",
    "Raiden"
];

const characters = [];

for (let i = 0; i < 3; i++) {
    characters[i] = [];
    for (let j = 0; j < 4; j++) {
        const character = new Image();
        character.src = `../images/juegoMK/personajes/character-${i}-${j}.png`;
        character.alt = charactersName[j + i * 4];
        characters[i][j] = character;
    }
}


// Obtén el offset del canvas
let offsetLeft = canvas.offsetLeft;
let offsetTop = canvas.offsetTop;

function handleResize() {
    offsetLeft = canvas.offsetLeft;
    offsetTop = canvas.offsetTop;
}

window.addEventListener('resize', handleResize);

let elements = [];
let arrTablero = [];
let arrDeco = [];
let arrFichas = [];
let arrFichaJugador1 = [];
let arrFichaJugador2 = [];
let lastClickedFigure = null;
let mouseDown = false;
let widthCanvas = canvas.clientWidth;
let elemTop;
let lateralIzquierdo;
let lateralDerecho;
let tablero;
let pinchos;
let timer;
let turno = 0;
let setTimeOutTiempoDeJuego = null;

//Genera el juego luego de la seleccion de personaje
function generarJuego(sprJugador1, sprJugador2) {
    turno = 0
    elements = [];
    arrTablero = [];
    arrDeco = [];
    arrFichas = [];
    arrFichaJugador1 = [];
    arrFichaJugador2 = [];
    lastClickedFigure = null;
    mouseDown = false;
    widthCanvas = canvas.clientWidth;

    elemTop = new PiezaDecorativa(
        context,
        imagenTop,
        0,
        0,
        widthCanvas,
        spriteHeightTop
    );
    arrDeco.push(elemTop);

    lateralIzquierdo = new PiezaDecorativa(
        context,
        imagenLateral,
        0,
        spriteHeightTop,
        anchoTheTower,
        canvas.clientHeight - spriteHeightTop
    );
    lateralDerecho = new PiezaDecorativa(
        context,
        imagenLateral,
        canvas.clientWidth - anchoTheTower,
        spriteHeightTop,
        anchoTheTower,
        canvas.clientHeight - spriteHeightTop
    );

    tablero = new Tablero(
        canvas,
        context,
        xEnLinea,
        pathCentral,
        pathCentralInside,
        pathCentralBackground,
        spriteHeightTop,
        spriteHeightBot,
        lateralDerecho.getWidth(),
        lateralIzquierdo.getWidth()
    );

    pinchos = new PiezaDecorativa(
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
    let fichaRadius = 32 * Math.min(tablero.getWidthCasilla() / 90, tablero.getHeightCasilla() / 90);

    //Creacion de fichas jugador 1
    for (let i = cantFichas + (tablero.getCantFil() * tablero.getCantCol() - cantFichas * 2); i > 0; i--) { //Este calculo se usa para darle una ficha mas al jugador 1 si falta una ficha al final
        const fichaJugador1 = new Ficha(
            context,
            sprJugador1,
            player1,
            widthCanvas / 2 - widthCanvas * 0.2 - fichaRadius * i,
            yFichas,
            fichaRadius,
            20
        );
        arrFichaJugador1.push(fichaJugador1);
    }

    //Creacion de fichas jugador 2

    for (let i = cantFichas; i > 0; i--) {
        const fichaJugador2 = new Ficha(
            context,
            sprJugador2,
            player2,
            widthCanvas / 2 + widthCanvas * 0.2 + fichaRadius * i,
            yFichas,
            fichaRadius,
            20
        );
        arrFichaJugador2.push(fichaJugador2);
    }

    arrFichas = arrFichas.concat(arrFichaJugador1);
    arrFichas = arrFichas.concat(arrFichaJugador2);

    arrTablero.push(tablero);
    arrTablero.push(pinchos);

    elements = elements.concat(arrDeco);
    elements = elements.concat(arrFichaJugador1);
    elements = elements.concat(arrFichaJugador2);
    elements = elements.concat(arrTablero);
    //Timer
    if (timer != null) {
        timer.borrarIntervalo();
    }
    const time = 5 * 60;
    customFont.load().then(() => {
        timer = new Timer(time, widthCanvas / 2, 80, context, customFont);
        elements.push(timer);

    });

    if (setTimeOutTiempoDeJuego != null) {
        clearInterval(setTimeOutTiempoDeJuego);
    }

    setTimeOutTiempoDeJuego = setInterval(() => {
        if (timer.getTime() <= 0) {

            console.log("a");
            for (const ficha of arrFichas) {
                ficha.colocada();
            }
            clearInterval(setTimeOutTiempoDeJuego);
        }
    }, 100)
    cambioTurno();

}

function drawAll(mouseX, mouseY) {
    if (menu) {
        //Dibuja los personajes disponibles
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                context.drawImage(characters[i][j], 116 + j * 144, 88 + 144 * i);
            }
        }
        //Dibuja el marco del menu
        context.drawImage(player_select, 0, 0);

        //Dibuja cual personaje va a ser seleccionado y su nombre
        if (mouseX > 116 && mouseX < 682 && mouseY > 88 && mouseY < 510) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                        if (turno == 0) {
                            context.drawImage(player_selector_1, 116 + i * 144, 88 + 144 * j);
                        } else if (turno == 1) {
                            context.drawImage(player_selector_2, 116 + i * 144, 88 + 144 * j);
                        }
                        let posX = canvas.clientWidth / 2;
                        let posY = canvas.clientHeight - 36;
                        let gradient = context.createLinearGradient(0, posY - 36 / 2, 0, posY + 36 / 2);
                        gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
                        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

                        context.font = 36 + 'px MKfont';
                        context.textAlign = 'center';
                        context.textBaseline = 'middle';
                        context.fillStyle = gradient;

                        context.strokeStyle = 'black';
                        context.lineWidth = 4;
                        context.strokeText(characters[j][i].alt, posX, posY);

                        context.fillText(characters[j][i].alt, posX, posY);
                    }
                }
            }
        }
        //Dibuja cual fichas fue seleccionada
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (player_selector_1.character == characters[j][i]) { context.drawImage(player_selector_1, 116 + i * 144, 88 + 144 * j); }
            }
        }

    } else {
        clearCanvas();
        for (const element of elements) {
            element.draw();
        }
        if (lastClickedFigure != null && mouseDown) {
            lastClickedFigure.draw();
        }
        timer.draw();
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
    for (let i = arrFichas.length - 1; i >= 0; i--) {
        if (arrFichas[i].isSelected(x, y)) {
            return arrFichas[i];
        }
    }
}
function onMouseDown(e) {
    if (menu) {
    } else {
        if (lastClickedFigure == null) {
            mouseDown = true;

            let clickFig = findClickedFigure(
                e.layerX - offsetLeft,
                e.layerY - offsetTop
            );

            if (clickFig != null) {
                lastClickedFigure = clickFig;
            }
            drawAll();
        }

    }
}

function onMouseMove(e) {
    if (menu) {
        drawAll(e.layerX - offsetLeft, e.layerY - offsetTop);
    } else {
        if (mouseDown && lastClickedFigure != null) {
            let posX = e.layerX - offsetLeft;
            let posY = e.layerY - offsetTop;
            lastClickedFigure.setPosition(posX, posY);
            drawAll();
        }
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
    if (!menu) {
        gravedad();
    }
}, 1000 / 60);

function onMouseUp(e) {
    if (menu) {
        let mouseX = e.layerX - offsetLeft;
        let mouseY = e.layerY - offsetTop;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                    if (turno == 0) {
                        player_selector_1.character = characters[j][i];
                        turno++;
                    } else if (turno == 1 && characters[j][i] != player_selector_1.character) {
                        player_selector_2.character = characters[j][i];
                        turno=0;
                        menu=false;
                        generarJuego(player_selector_1.character, player_selector_2.character);
                    }
                }
            }
        }

    } else {
        //fichaCayendo = true;
        if ((lastClickedFigure != null) && (mouseDown)) {
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

                    if ((turno % 2) == player1) {
                        acomodarFichasNoColocadas(arrFichaJugador1, arrFichaJugador1.indexOf(lastClickedFigure));
                    } else {
                        acomodarFichasNoColocadas(arrFichaJugador2, arrFichaJugador2.indexOf(lastClickedFigure));
                    }
                    tablero.calcularNuevoSuelo(columna);
                    let ganador = tablero.cargarEnMatriz(lastClickedFigure);

                    if (ganador != null) {
                        console.log(ganador);
                    }
                } else {
                    lastClickedFigure.volverAPosicionInicial();
                    lastClickedFigure = null;
                    drawAll();
                }
            } else {
                lastClickedFigure.volverAPosicionInicial();
                lastClickedFigure = null;
                drawAll();
            }
        }
    }
}

function acomodarFichasNoColocadas(arr, posFicha) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if ((!arr[i].getFiguraIsColocada()) && (posFicha > i)) {
            arr[i].setPositionXOriginTo(
                arr[i].getPosIniX() +
                (arr[i].getRadius() * Math.sign(arr[arr.length - 1].getPosIniX() - arr[0].getPosIniX())) //se multiplica por la diferencia entre las posiciones y de ahi se obtiene el signo para saber a que lado tiene que ir
            );
        }
    }
}

//carga
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);

//Turno 
function cambioTurno() {
    if ((turno % 2) + 1 == player1) {
        for (let i = 0; i < arrFichaJugador1.length; i++) {
            if (!arrFichaJugador1[i].getFiguraIsColocada()) {
                arrFichaJugador1[i].setSeleccionable(true);
            }
            if (!arrFichaJugador2[i].getFiguraIsColocada()) {
                arrFichaJugador2[i].setSeleccionable(false);
            }
        }
    } else {
        for (let i = 0; i < arrFichaJugador2.length; i++) {

            if (!arrFichaJugador2[i].getFiguraIsColocada()) {
                arrFichaJugador2[i].setSeleccionable(true);
            }
            if (!arrFichaJugador1[i].getFiguraIsColocada()) {
                arrFichaJugador1[i].setSeleccionable(false);
            }
        }
    }

    turno++;
}

setTimeout(function () {
    //JUEGO
    drawAll();
}, 100);


