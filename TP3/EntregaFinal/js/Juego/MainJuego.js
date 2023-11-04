const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

//Sounds
const backgroundMusicRoom0Path = '../sounds/background-music-room-0.mp3';
const sndBackgroundMusicRoom0 = new Audio(backgroundMusicRoom0Path);
//loopSoundOn(sndBackgroundMusicRoom0); //No se puede reproducir sonidos sin autorizacion del usuario

const backgroundMusicRoom1Path = '../sounds/background-music-room-1.mp3';
const sndBackgroundMusicRoom1 = new Audio(backgroundMusicRoom1Path);
const backgroundMusicRoom2Path = '../sounds/background-music-room-2.mp3';
const sndBackgroundMusicRoom2 = new Audio(backgroundMusicRoom2Path);
const backgroundMusicRoom3Path = '../sounds/background-music-room-3.mp3';
const sndBackgroundMusicRoom3 = new Audio(backgroundMusicRoom3Path);

function loopSoundOn(snd) {
    snd.play();
    snd.addEventListener('ended', () => {
        snd.currentTime = 0;
        snd.play();
    })
}
function loopSoundOff(snd) {
    snd.pause();
    snd.removeEventListener('ended', () => {
        snd.currentTime = 0;
        snd.play();
    });
}

const skeweredMalePath = '../sounds/skewered-male.mp3';
const sndSkeweredMale = new Audio(skeweredMalePath);
const defenestrateMalePath = '../sounds/defenestrate-male.mp3';
const sndDefenestrateMale = new Audio(defenestrateMalePath);

const skeweredFemalePath = '../sounds/skewered-female.mp3';
const sndSkeweredFemale = new Audio(skeweredFemalePath);
const defenestrateFemalePath = '../sounds/defenestrate-female.mp3';
const sndDefenestrateFemale = new Audio(defenestrateFemalePath);

const winSndPath = '../sounds/win.mp3';
const sndWin = new Audio(winSndPath);
const selectSndPath1 = '../sounds/select-player.mp3';
//no me gusta y hay que sincronizarlo
const sndSelectPlayer1 = new Audio(selectSndPath1);
const selectSndPath2 = '../sounds/select-player.mp3';
//no me gusta y hay que sincronizarlo
const sndSelectPlayer2 = new Audio(selectSndPath2);
//el 2 suena más a espada o pincho, peeero no sé, me gusta más el otro
const skeweredPath = '../sounds/skewered-2.mp3'
const sndSkewered = new Audio(skeweredPath);
const openBattlePath = '../sounds/open-battle.mp3'
const sndOpenBattle = new Audio(openBattlePath);
const bounceOnTopPath = '../sounds/bounce-on-top.mp3';
const sndBounceOnTop = new Audio(bounceOnTopPath);

//Images
const titlePath = '../images/juegoMK/title.png';
const modePath = '../images/juegoMK/mode-selection';
const cuevaPath = '../images/juegoMK/cueva.png';
const opcionesPath = '../images/juegoMK/menu-options.png';
const pausePath = '../images/juegoMK/menu-pause.png';
const drawPath = '../images/juegoMK/menu-draw.png';

const imagenLateral = "../images/juegoMK/the-tower.png";
const imagenTop = "../images/juegoMK/imagenTop.png";
const imagenPinchos = "../images/juegoMK/pinchos.png";

const pathCentral = "../images/juegoMK/casilla.png";
const pathCentralInside = "../images/juegoMK/casilla-interior.png";
const pathCentralBackground = "../images/juegoMK/casilla-relleno.png";
const player_select_path = "../images/juegoMK/seleccion-jugador.png";

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

//Game
const pauseMenuImg = new Image();
pauseMenuImg.src = pausePath;
const drawMenuImg = new Image();
drawMenuImg.src = drawPath;


const player_select = new Image();
player_select.src = player_select_path;

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
let pause;
const radiusPause = 12;
let inPause = false;
let turno = 0;
let setTimeOutTiempoDeJuego = null;
let xEnLinea = 0;
let ganador = null;
let draw = false;

let mouseX;
let mouseY;

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

    let voice = assignVoice(sprJugador1.alt);
    //Creacion de fichas jugador 1
    for (let i = cantFichas + (tablero.getCantFil() * tablero.getCantCol() - cantFichas * 2); i > 0; i--) { //Este calculo se usa para darle una ficha mas al jugador 1 si falta una ficha al final
        const fichaJugador1 = new Ficha(
            context,
            sprJugador1,
            player1,
            widthCanvas / 2 - widthCanvas * 0.2 - fichaRadius * i,
            yFichas,
            fichaRadius,
            20,
            voice.sndSk,
            voice.sndDef
        );
        arrFichaJugador1.push(fichaJugador1);
    }

    //Creacion de fichas jugador 2

    voice = assignVoice(sprJugador2.alt);

    for (let i = cantFichas; i > 0; i--) {
        const fichaJugador2 = new Ficha(
            context,
            sprJugador2,
            player2,
            widthCanvas / 2 + widthCanvas * 0.2 + fichaRadius * i,
            yFichas,
            fichaRadius,
            20,
            voice.sndSk,
            voice.sndDef
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
    //const time = 5 * 60; //el primer valor representa los minutos
    const time = 200; //el primer valor representa los minutos
    customFont.load().then(() => {
        timer = new Timer(time, widthCanvas / 2, 70, context, customFont);
        elements.push(timer);
    });

    pause = new Pause(context, canvas.clientWidth - radiusPause, radiusPause, radiusPause);

    setTimeOutTiempoDeJuego = setInterval(() => {
        if (timer.getTime() <= 0) {
            for (const ficha of arrFichas) {
                ficha.colocada(true);
            }
            drawAll();
            clearInterval(setTimeOutTiempoDeJuego);
        }
    }, 100)
    resaltarFichasEnJuego();
    loopSoundOff(sndBackgroundMusicRoom2);
    sndOpenBattle.play();
    loopSoundOn(sndBackgroundMusicRoom3);
}

function assignVoice(name) {
    if (name == 'Mileena' || name == 'Kitana') {
        return {
            'sndSk': sndSkeweredFemale,
            'sndDef': sndDefenestrateFemale
        }
    } else {
        return {
            'sndSk': sndSkeweredMale,
            'sndDef': sndDefenestrateMale
        }
    }
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
    ganador = null;
    mouseDown = false;
    widthCanvas = canvas.clientWidth;
    inPause = false;
    draw = false;

    player_selector_1_anim.setFrame(0);
    player_selector_2_anim.setFrame(0);

    if (timer != null) {
        timer.borrarIntervalo();
        timer.resetTimer()
    }
    //timer = null;
    if (setTimeOutTiempoDeJuego != null) { clearInterval(setTimeOutTiempoDeJuego); }
    setTimeOutTiempoDeJuego = null;
}

//Volver Al menu

function returnToMenu() {
    reiniciarVariablesJuego();
    player_selector_1 = null;
    player_selector_2 = null;
    room = 1;
    drawAll();
}

function drawText(text, fontSize, posX, posY) {
    let gradient = context.createLinearGradient(0, posY - fontSize / 2, 0, posY + fontSize / 2);
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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            context.drawImage(characters[i][j], 116 + j * 144, 88 + 144 * i);
        }
    }
    context.drawImage(player_select, 0, 0);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                //((turno % 2) + 1) == playerX no funciona porque es algo que se calcula constantemente
                //mientras el mouse está en movimiento y el turno cambia al clickear. Lo anoto para mi
                if (turno == 0) {
                    player_selector_1_anim.setPosX(116 + i * 144);
                    player_selector_1_anim.setPosY(88 + 144 * j);
                } else if (turno == 1 && characters[j][i] != player_selector_1) {
                    player_selector_2_anim.setPosX(116 + i * 144);
                    player_selector_2_anim.setPosY(88 + 144 * j);
                    player_selector_2_anim.draw();
                }
                player_selector_1_anim.draw();
                let posX = canvas.clientWidth / 2;
                let posY = canvas.clientHeight - 36;

                drawText(characters[j][i].alt, 36, posX, posY)
            } else {
                if (turno > 0) {
                    player_selector_1_anim.draw();
                }
                if (turno > 1) {
                    player_selector_2_anim.draw();
                }
            }
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
    pause.draw();
    sangrado.draw();
    if (inPause) {
        drawPause();
    }
    if (ganador != null) {
        drawText(`${ganador} wins`, 90, canvas.clientWidth / 2, canvas.clientHeight / 3)
        context.drawImage(drawMenuImg, 0, 0, canvas.clientWidth, canvas.clientHeight);
    }
}
function drawPause() {
    context.beginPath();
    context.fillStyle = 'rgba(0,0,0,0.2)';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.fill();
    context.closePath();

    context.drawImage(pauseMenuImg, 0, 0, canvas.clientWidth, canvas.clientHeight);
    drawText('Pause', 90, canvas.clientWidth / 2, canvas.clientHeight / 3);
}
function drawDraw() {
    console.log("1");
}
let player_selector_1_anim = new AnimatedPiece(context, '../images/juegoMK/animations/selector-jugador-1-anim.png', -200, -200, 135, 400, -1);
let player_selector_2_anim = new AnimatedPiece(context, '../images/juegoMK/animations/selector-jugador-2-anim.png', -200, -200, 135, 400, -1);
//let cueva_anim = new AnimatedPiece(context, '../images/juegoMK/cueva-interior.png', 0, 0, 800, 300);


function drawAll() {
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
            drawGame();
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
    mouseX = e.layerX - offsetLeft;
    mouseY = e.layerY - offsetTop;
    switch (room) {
        case 0: //start to play
            room = 1;
            drawAll();
            loopSoundOff(sndBackgroundMusicRoom0)
            loopSoundOn(sndBackgroundMusicRoom1)
            break;

        case 1: //seleccion de personaje
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                        //((turno % 2) + 1) == playerX y no hace falta el turno = 0
                        //estaba como turno == 0 y turno == 1
                        if (((turno % 2) + 1) == player1) {
                            player_selector_1 = characters[j][i];
                            player_selector_1_anim.setFrame(0);
                            player_selector_1_anim.setPosX(116 + i * 144);
                            player_selector_1_anim.setPosY(88 + 144 * j);
                            player_selector_1_anim.startAnimation();
                            sndSelectPlayer1.play();
                            turno++;
                        } else if (((turno % 2) + 1) == player2 && characters[j][i] != player_selector_1) {
                            player_selector_2 = characters[j][i];
                            player_selector_2_anim.setFrame(0);
                            player_selector_2_anim.setPosX(116 + i * 144);
                            player_selector_2_anim.setPosY(88 + 144 * j);
                            player_selector_2_anim.startAnimation();
                            sndSelectPlayer2.play();
                            turno++;
                            setTimeout(() => {
                                loopSoundOff(sndBackgroundMusicRoom1);
                                loopSoundOn(sndBackgroundMusicRoom2);
                                player_selector_1_anim.setLoop(-1)
                                room = 2;
                                drawAll()
                            }, 800);
                        }

                    }
                }
            } if (player_selector_1 != null && player_selector_2 != null) {
            }
            break;

        case 2: //seleccion de modo
            for (let i = 0; i < 4; i++) {
                if ((mouseX > 303 && mouseX < 496) && (mouseY > 55 + 54 * i && mouseY < 89 + 54 * i)) {
                    room = 3;
                    xEnLinea = i + 4;
                    generarJuego(player_selector_1, player_selector_2, xEnLinea);
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
                //Va en otro lugar para que se ejecute siempre que golpea la ficha?
                //Está raro. A veces se ejecuta 2 veces y otras una sola
                sndBounceOnTop.play();
            } else {
                clearInterval(intervalGravity);
                lastClickedFigure.setBounces(lastClickedFigure.getMaxBounces());
                lastClickedFigure.setVelocity(0);
                lastClickedFigure.setPosition(
                    lastClickedFigure.getPositionX(),
                    tablero.getSuelo()
                );
                ganador = tablero.cargarEnMatriz(lastClickedFigure);

                if (tablero.getSuelo() == (canvas.clientHeight - tablero.getHeightCasilla() / 2)) {
                    sangrado.setFrame(0);
                    sangrado.setPosX(lastClickedFigure.getPositionX() - sangrado.getFrameWidth() / 2);
                    sangrado.setPosY(lastClickedFigure.getPositionY() - sangrado.getFrameHight() / 2);
                    sangrado.draw();
                    lastClickedFigure.playSkewered();
                    sndSkewered.play();
                    sangrado.startAnimation();
                }

                if (ganador != null) {
                    for (const ficha of arrFichas) {
                        ficha.colocada(true);
                    }
                    sndWin.play();
                    tablero.resaltarFichas(ganador);
                    timer.setPausa(true);
                    clearInterval(setTimeOutTiempoDeJuego);
                }
                lastClickedFigure = null;
                velocity = 0;
                tablero.resetSuelo();
                turno++;
                resaltarFichasEnJuego();
            }
        }
        drawAll();
    }
}

//La gravedad está más abajo
let intervalGravity;
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
            mouseX = e.layerX - offsetLeft;
            mouseY = e.layerY - offsetTop;
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

                        lastClickedFigure.colocada(true);

                        if ((turno % 2) + 1 == player1) {
                            acomodarFichasNoColocadas(arrFichaJugador1, arrFichaJugador1.indexOf(lastClickedFigure));
                        } else {
                            acomodarFichasNoColocadas(arrFichaJugador2, arrFichaJugador2.indexOf(lastClickedFigure));
                        }

                        tablero.calcularNuevoSuelo(columna);

                        //Solo se activa si es necesario
                        intervalGravity = setInterval(function () {
                            gravedad();
                        }, 1000 / 60);

                        if (tablero.getSuelo() == (canvas.clientHeight - tablero.getHeightCasilla() / 2)) {
                            lastClickedFigure.setBounces(0);
                        }
                        //sndDefenestrate.play();
                        lastClickedFigure.playDefenestrate();
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
            } else {
                mouseDown = false;
                if (ganador == null && !draw) {
                    if (!inPause) {
                        if (pause.isSelected(mouseX,mouseY)) {
                            inPause = true;
                            timer.setPausa(true);
                            loopSoundOff(sndBackgroundMusicRoom3);
                            for (let i = 0; i < arrFichas.length; i++) {
                                arrFichas[i].setSeleccionable(false);
                            }
                            drawAll();
                        }
                    } else {
                        for (let i = 0; i < 3; i++) {
                            if ((mouseX > 243 && mouseX < 556) &&
                                (mouseY > 289 + i * 85 && mouseY < 356 + i * 85)) {
                                switch (i) {
                                    case 0: //Resume
                                        resaltarFichasEnJuego();
                                        inPause = false;
                                        timer.setPausa(false);
                                        loopSoundOn(sndBackgroundMusicRoom3);
                                        break;

                                    case 1: //Restart
                                        generarJuego(player_selector_1, player_selector_2, xEnLinea);
                                        break;

                                    case 2: //Quit
                                        returnToMenu();
                                        sndBackgroundMusicRoom1.play()
                                        sndBackgroundMusicRoom1.addEventListener('ended', () => {
                                            sndBackgroundMusicRoom1.currentTime = 0;
                                            sndBackgroundMusicRoom1.play();
                                        })
                                        break;
                                    default:
                                        break;
                                }
                            }

                        }
                        //drawAll();
                    }
                } else if (draw) {
                    for (let i = 0; i < 3; i++) {
                        if ((mouseX > 243 && mouseX < 556) &&
                            (mouseY > 374 + i * 85 && mouseY < 441 + i * 85)) {
                            switch (i) {
                                case 0:
                                    generarJuego(player_selector_1, player_selector_2, xEnLinea);
                                    break;

                                case 1:
                                    returnToMenu();
                                    break;
                                default:
                                    break;
                            }
                        }

                    }
                    drawAll();
                }
            }

            break;
        default:
            break;
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
function resaltarFichasEnJuego() {
    //le saque el turno++ porque daba errores al poner pausa
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
}

setTimeout(function () {
    drawAll();
}, 100);