const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

const titlePath = '../images/juegoMK/title.png';
const modePath = '../images/juegoMK/mode-selection'
const cuevaPath = '../images/juegoMK/cueva.png';
const opcionesPath = '../images/juegoMK/menu-options.png'

const imagenLateral = "../images/juegoMK/the-tower.png";
const imagenTop = "../images/juegoMK/imagenTop.png";
const imagenPinchos = "../images/juegoMK/pinchos.png";

const pathCentral = "../images/juegoMK/casilla.png";
const pathCentralInside = "../images/juegoMK/casilla-interior.png";
const pathCentralBackground = "../images/juegoMK/casilla-relleno.png";
//const xEnLinea = 4;

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

//Title page
const titleImg = new Image();
titleImg.src = titlePath;

//Mode selection page
//Por alguna razón necesita el addEventListener y el resto no.
const modeImg = new Image();
modeImg.addEventListener('load', () => { modeImg.src = modePath; })

//Mode config
const imgCueva = new Image();
imgCueva.src = cuevaPath;
const imgOpciones = new Image();
imgOpciones.src = opcionesPath;

// Menu
let room = 0;

const player_select = new Image();
player_select.src = "../images/juegoMK/seleccion-jugador.png";

player_selector_1 = null;
player_selector_2 = null;

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
let pantalla = document.querySelector("#pantalla-juego")
let offsetLeft = canvas.offsetLeft;
let offsetTop = canvas.offsetTop;

function handleResize() {
    offsetLeft = canvas.offsetLeft;
    offsetTop = canvas.offsetTop;
}

window.addEventListener('resize', handleResize);
document.querySelector("#menu-categorias").addEventListener("transitionend", handleResize);

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
function generarJuego(sprJugador1, sprJugador2, xEnLinea) {
    reiniciarVariablesJuego();

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
    const time = 5 * 60;
    customFont.load().then(() => {
        timer = new Timer(time, widthCanvas / 2, 80, context, customFont);
        elements.push(timer);

    });

    setTimeOutTiempoDeJuego = setInterval(() => {
        if (timer.getTime() <= 0) {

            console.log("Se acabo el tiempo");
            for (const ficha of arrFichas) {
                ficha.colocada();
            }
            drawAll();
            clearInterval(setTimeOutTiempoDeJuego);
        }
    }, 100)
    cambioTurno();

}

function reiniciarVariablesJuego() {
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

    if (timer != null) { timer.borrarIntervalo(); }
    timer = null;
    if (setTimeOutTiempoDeJuego != null) { clearInterval(setTimeOutTiempoDeJuego); }
    setTimeOutTiempoDeJuego = null;
}

//Volver Al menu

function returnToMenu() {
    reiniciarVariablesJuego();
    player_selector_1 = null;
    player_selector_2 = null;
    room = 1;
    turno = 0;
    drawAll();
}

function drawText(context, text, fontSize, posX, posY) {
    let gradient = context.createLinearGradient(0, posY - 36 / 2, 0, posY + 36 / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    context.font = fontSize + 'px MKfont';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = gradient;

    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.strokeText(text, posX, posY);

    context.fillText(text, posX, posY);
}

function drawCharacterSelector(mouseX, mouseY) {
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
                        player_selector_1_anim.setPosX(116 + i * 144);
                        player_selector_1_anim.setPosY(88 + 144 * j);
                    } else if (turno == 1 && characters[j][i] != player_selector_1) {
                        player_selector_2_anim.setPosX(116 + i * 144);
                        player_selector_2_anim.setPosY(88 + 144 * j);
                    }
                    let posX = canvas.clientWidth / 2;
                    let posY = canvas.clientHeight - 36;
                    //se podria modularizar
                    drawText(context, characters[j][i].alt, 36, posX, posY)
                }
            }
        }
        player_selector_1_anim.draw();
        if (turno != 0) { player_selector_2_anim.draw(); }
    } else {
        if (turno > 0) {
            player_selector_1_anim.draw();
        }
        if (turno > 1) {
            player_selector_2_anim.draw();
        }
    }
}

function drawGame() {
    clearCanvas();
    for (const element of elements) {
        element.draw();
    }
    timer.draw();
    if (lastClickedFigure != null && mouseDown) {
        lastClickedFigure.draw();
    }
    sangrado.draw();
}

let player_selector_1_anim = new AnimatedPiece(context, '../images/juegoMK/animations/selector-jugador-1-anim.png', -200, -200, 135, 400, -1);
let player_selector_2_anim = new AnimatedPiece(context, '../images/juegoMK/animations/selector-jugador-2-anim.png', -200, -200, 135, 400, -1);
//let cueva_anim = new AnimatedPiece(context, '../images/juegoMK/cueva-interior.png', 0, 0, 800, 300);
let i = 0; //??????????????????

function drawAll(mouseX, mouseY) {
    switch (room) {
        case 0: //start
            context.drawImage(titleImg, 0, 0, canvas.clientWidth, canvas.clientHeight);
            break;

        case 1: //seleccion
            drawCharacterSelector(mouseX, mouseY);
            break;
        case 2: //modo
            context.drawImage(imgCueva, 0, 0, canvas.clientWidth, canvas.clientHeight);
            context.drawImage(imgOpciones, 0, 0, canvas.clientWidth, canvas.clientHeight);
            break;

        case 3: //juego
            drawGame()
            break;

        default:
            break;
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
    let mouseX = e.layerX - offsetLeft;
    let mouseY = e.layerY - offsetTop;
    switch (room) {
        case 0: //start to play
            room = 1;
            drawAll();
            break;

        case 1: //seleccion de personaje
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                        if (turno == 0) {
                            player_selector_1 = characters[j][i];
                            player_selector_1_anim.setFrame(0);
                            player_selector_1_anim.setPosX(116 + i * 144);
                            player_selector_1_anim.setPosY(88 + 144 * j);
                            player_selector_1_anim.startAnimation();
                            turno++;
                        } else if (turno == 1 && characters[j][i] != player_selector_1) {
                            player_selector_2 = characters[j][i];
                            player_selector_2_anim.setFrame(0);
                            player_selector_2_anim.setPosX(116 + i * 144);
                            player_selector_2_anim.setPosY(88 + 144 * j);
                            player_selector_2_anim.startAnimation();
                            turno++;
                            setTimeout(() => {
                                turno = 0;
                                room = 2;
                                drawAll()
                            }, 800);
                        }
                    }
                }
            }
            break;

        case 2: //seleccion de modo
            for (let i = 0; i < 4; i++) {
                if ((mouseX > 303 && mouseX < 496) && (mouseY > 55 + 54 * i && mouseY < 89 + 54 * i)) {
                    room = 3;
                    generarJuego(player_selector_1, player_selector_2, i + 4);
                    //drawAll();
                }
            }
            break;

        case 3: //juego
            if (lastClickedFigure == null) {
                mouseDown = true;

                let clickFig = findClickedFigure(
                    mouseX,
                    mouseY
                );

                if (clickFig != null) {
                    lastClickedFigure = clickFig;
                }
                drawAll();
            }

            break;
        default:
            break;
    }
}
let mouseX;
let mouseY;
function onMouseMove(e) {
    mouseX = e.layerX - offsetLeft;
    mouseY = e.layerY - offsetTop;
    switch (room) {
        case 0: //start to play
            break;
        case 1: //seleccion de personaje
            drawAll(mouseX, mouseY);

            break;
        case 2: //seleccion de modo
            //drawAll(mouseX, mouseY);
            break;
        case 3: //juego
            if (mouseDown && lastClickedFigure != null) {
                lastClickedFigure.setPosition(mouseX, mouseY);
                drawAll();
            }
            break;
        default:
            break;
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
let sangrado = new AnimatedPiece(context, '../images/juegoMK/animations/blood.png', -135, -135, 135, 200, -1);
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
            } else {
                lastClickedFigure.setBounces(lastClickedFigure.getMaxBounces());
                lastClickedFigure.setVelocity(0);
                lastClickedFigure.setPosition(
                    lastClickedFigure.getPositionX(),
                    tablero.getSuelo()
                );
                let ganador = tablero.cargarEnMatriz(lastClickedFigure);

                if (tablero.getSuelo() == (canvas.clientHeight - tablero.getHeightCasilla() / 2)) {
                    sangrado.setFrame(0);
                    sangrado.setPosX(lastClickedFigure.getPositionX() - sangrado.getFrameWidth() / 2);
                    sangrado.setPosY(lastClickedFigure.getPositionY() - sangrado.getFrameHight() / 2);
                    sangrado.draw();
                    sangrado.startAnimation();
                }

                if (ganador != null) {
                    for (const ficha of arrFichas) {
                        ficha.colocada();
                    }
                    console.log(ganador);
                    tablero.resaltarFichas(ganador);
                    timer.setPausa(true);
                    clearInterval(setTimeOutTiempoDeJuego);
                    setTimeout(() => {
                        mostrarCartelGanador(ganador);
                    }, 10);
                }
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
    if (room == 3) {
        gravedad();
    }
}, 1000 / 60);

function onMouseUp(e) {
    switch (room) {
        case 0: //start to play

            break;

        case 1: //seleccion de personaje
            break;

        case 2: //seleccion de modo

            break;
        case 3: //juego
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

                        if (tablero.getSuelo() == (canvas.clientHeight - tablero.getHeightCasilla() / 2)) {
                            lastClickedFigure.setBounces(0);
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

            break;
        default:
            break;
    }
}

function mostrarCartelGanador(ganador) {
    let fonsize = 90;
    gradient = context.createLinearGradient(0, (canvas.clientHeight / 2) - fonsize / 2, 0, (canvas.clientHeight / 2) + fonsize / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    context.font = fonsize + 'px MKfont';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = gradient;

    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.strokeText(`${ganador} wins`, canvas.clientWidth / 2, canvas.clientHeight / 2);

    context.fillText(`${ganador} wins`, canvas.clientWidth / 2, canvas.clientHeight / 2);
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
    drawAll();
}, 100);