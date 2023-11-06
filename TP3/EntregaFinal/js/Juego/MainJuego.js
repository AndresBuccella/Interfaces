const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

//Cargado multimedia
let totalRecursos = 0;
let recursosCargados = 0;

function verificarCargaCompleta() {
    recursosCargados++;
    if (recursosCargados === totalRecursos) {
        console.log("¡Todos los recursos se han cargado!");
        drawAll();
    }
}

//Sounds

const startRoom0 = new Audio('../sounds/open-battle.mp3');
totalRecursos++;
startRoom0.addEventListener('canplaythrough', verificarCargaCompleta);

const sndBackgroundMusicRoom1 = new Audio('../sounds/background-music-room-2.mp3');
totalRecursos++;
sndBackgroundMusicRoom1.addEventListener('canplaythrough', verificarCargaCompleta);

const sndBackgroundMusicRoom2 = new Audio('../sounds/background-music-room-1.mp3');
totalRecursos++;
sndBackgroundMusicRoom2.addEventListener('canplaythrough', verificarCargaCompleta);

let sndBackgroundMusicRoom3;
if (Math.random() <= 0.2) {
    sndBackgroundMusicRoom3 = new Audio('../sounds/Mortal-Kumbia.mp3');
    console.log("Mortal Kumbia");
} else {
    sndBackgroundMusicRoom3 = new Audio('../sounds/background-music-room-3.mp3');
}
totalRecursos++;
sndBackgroundMusicRoom3.addEventListener('canplaythrough', verificarCargaCompleta);

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

const sndSkeweredMale = new Audio('../sounds/skewered-male.mp3');
totalRecursos++;
sndSkeweredMale.addEventListener('canplaythrough', verificarCargaCompleta);
const defenestrateMale = new Audio('../sounds/defenestrate-male.mp3');
totalRecursos++;
defenestrateMale.addEventListener('canplaythrough', verificarCargaCompleta);
const sndDefenestrateMale = new Audio('../sounds/defenestrate-male.mp3');
totalRecursos++;
sndDefenestrateMale.addEventListener('canplaythrough', verificarCargaCompleta);

const sndSkeweredFemale = new Audio('../sounds/skewered-female.mp3');
totalRecursos++;
sndSkeweredFemale.addEventListener('canplaythrough', verificarCargaCompleta);
const sndDefenestrateFemale = new Audio('../sounds/defenestrate-female.mp3');
totalRecursos++;
sndDefenestrateFemale.addEventListener('canplaythrough', verificarCargaCompleta);

const sndWin = new Audio('../sounds/win.mp3');
totalRecursos++;
sndWin.addEventListener('canplaythrough', verificarCargaCompleta);

const sndDraw = new Audio('../sounds/draw.mp3');
totalRecursos++;
sndDraw.addEventListener('canplaythrough', verificarCargaCompleta);

const sndSelectPlayer1 = new Audio('../sounds/select-player.mp3');
totalRecursos++;
sndSelectPlayer1.addEventListener('canplaythrough', verificarCargaCompleta);
const sndSelectPlayer2 = new Audio('../sounds/select-player.mp3');
totalRecursos++;
sndSelectPlayer2.addEventListener('canplaythrough', verificarCargaCompleta);

const sndSkewered = new Audio('../sounds/skewered-2.mp3');
totalRecursos++;
sndSkewered.addEventListener('canplaythrough', verificarCargaCompleta);
const sndOpenBattle = new Audio('../sounds/fight.mp3');
totalRecursos++;
sndOpenBattle.addEventListener('canplaythrough', verificarCargaCompleta);

const sndBounceOnTop = new Audio('../sounds/bounce-on-top.mp3');
totalRecursos++;
sndBounceOnTop.addEventListener('canplaythrough', verificarCargaCompleta);

//Images
const titlePath = '../images/juegoMK/title.png';
const modePath = '../images/juegoMK/mode-selection';
const cuevaPath = '../images/juegoMK/cueva.png';
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
totalRecursos++;
customFont.load().then(() => {
    document.fonts.add(customFont);
    verificarCargaCompleta();
});

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
totalRecursos++;
titleImg.addEventListener('load', verificarCargaCompleta);

//Mode config
const imgCueva = new Image();
imgCueva.src = cuevaPath;
totalRecursos++;
imgCueva.addEventListener('load', verificarCargaCompleta);

const imgOpciones = new Image();
imgOpciones.src = '../images/juegoMK/menu-options.png';
totalRecursos++;
imgOpciones.addEventListener('load', verificarCargaCompleta);

const imgOpcionesTime = new Image();
imgOpcionesTime.src = '../images/juegoMK/menu-options-time.png';
totalRecursos++;
imgOpcionesTime.addEventListener('load', verificarCargaCompleta);

//Infinito
const imgInfinito = new Image();
imgInfinito.src = '../images/juegoMK/infinito.png';
totalRecursos++;
imgInfinito.addEventListener('load', verificarCargaCompleta);

// Menu
let room = 0;

//Game
const pauseMenuImg = new Image();
pauseMenuImg.src = pausePath;
totalRecursos++;
pauseMenuImg.addEventListener('load', verificarCargaCompleta);

const drawMenuImg = new Image();
drawMenuImg.src = drawPath;
totalRecursos++;
drawMenuImg.addEventListener('load', verificarCargaCompleta);


const player_select = new Image();
player_select.src = player_select_path;
totalRecursos++;
player_select.addEventListener('load', verificarCargaCompleta);

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
const charactersSound = [];

for (let i = 0; i < 3; i++) {
    characters[i] = [];
    charactersSound[i] = [];
    for (let j = 0; j < 4; j++) {
        const character = new Image();
        totalRecursos++;
        character.addEventListener('load', verificarCargaCompleta);
        character.src = `../images/juegoMK/personajes/character-${i}-${j}.png`;
        character.alt = charactersName[j + i * 4];
        characters[i][j] = character;

        charactersSound[i][j] = new Audio(`../sounds/personajes/${character.alt}.mp3`);
        charactersSound[i][j].alt = charactersName[j + i * 4];
        totalRecursos++;
        charactersSound[i][j].addEventListener('canplaythrough', verificarCargaCompleta);
    }
}
let versusSound = new Audio("../sounds/versus.mp3");
totalRecursos++;
versusSound.addEventListener('canplaythrough', verificarCargaCompleta);

let winsSound = new Audio("../sounds/personajes/wins.mp3");
totalRecursos++;
winsSound.addEventListener('canplaythrough', verificarCargaCompleta);

// Obtén el offset del canvas
let offsetLeft = canvas.offsetLeft;
let offsetTop = canvas.offsetTop;

function handleResize() {
    offsetLeft = canvas.offsetLeft;
    offsetTop = canvas.offsetTop;
}

window.addEventListener('resize', handleResize);
document.querySelector("#menu-categorias").addEventListener("transitionend", handleResize);

//--------Variables del juego--------

let elements = [];                      //Contiene todos los objetos que componen el juego (arrTablero,arrDeco,arrFichas)
let arrTablero = [];                    //Contiene el tablero y los pinchos
let arrDeco = [];                       //Contiene todas las decoraciones
let arrFichas = [];                     //Contiene todas las fichas
let arrFichaJugador1 = [];              //Fichas del jugador 1
let arrFichaJugador2 = [];              //Fichas del jugador 2
let lastClickedFigure = null;           //Contiene el ultimo objeto de tipo Ficha
let mouseDown = false;                  //Dectar si se clickeo el mouse
let widthCanvas = canvas.clientWidth;   //Ancho del canvas
let elemTop;                            //Contiene el objeto pieza decorativa
let lateralIzquierdo;                   //Contiene el objeto pieza decorativa 
let lateralDerecho;                     //Contiene el objeto pieza decorativa
let tablero;                            //Contiene el objeto tablero
let pinchos;                            //Contiene el objeto pieza decorativo con img de pinchos
let timer;                              //Contiene el objeto timer
let pause;                              //Contiene el objeto pausa
const radiusPause = 12;
let inPause = false;                    //El juego esta pausado
let turno = 0;                          //Contador de los turnos
let setTimeOutTiempoDeJuego = null;     //Intervalo que detecta si se acabo el tiempo
let xEnLinea = 0;                       //Modo de juego
let ganador = null;                     //Hubo ganador
let draw = false;                       //Hubo empate

let mouseX; //Posicion del mouse en la coordinada x
let mouseY; //Posicion del mouse en la coordinada y

let timeVal = 300;       //Tiempo de la partida default
let timeValMin = 120;   //Tiempo minimo de la partida
let timeValSum = 30;    //Cuanto tiempo sumar al hacer clic
let timeValMax = 600;   //Tiempo maximo de la partida

//Genera el juego luego de la seleccion de personaje

function generarJuego(sprJugador1, sprJugador2, xEnLinea, time) {
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
    customFont.load().then(() => {
        timer = new Timer(time, widthCanvas / 2, 70, context, customFont);
        elements.push(timer);
    });

    pause = new Pause(context, canvas.clientWidth - radiusPause, radiusPause, radiusPause);

    setTimeOutTiempoDeJuego = setInterval(() => {
        if (timer.getTime() <= 0) {
            gameIsDraw();
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

function gameIsDraw() {
    for (const ficha of arrFichas) {
        ficha.colocada(true);
    }
    mouseDown = false;
    lastClickedFigure = null;
    drawAll();
    sndDraw.play();
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

    if (intervalGravity != null) {
        clearInterval(intervalGravity);
    }

    player_selector_1_anim.setFrame(0);
    player_selector_2_anim.setFrame(0);

    if (timer != null) {
        timer.borrarIntervalo();
        timer.resetTimer()
    }
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
    context.fillStyle = 'transparent';

}

function drawCharacterSelector() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            context.drawImage(characters[i][j], 116 + j * 144, 88 + 144 * i);
        }
    }
    context.drawImage(player_select, 0, 0);
    document.body.style.cursor = "default";

    let posX = canvas.clientWidth / 2;
    let posY = canvas.clientHeight - 36;
    let colition = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                if (turno == 0) {
                    player_selector_1_anim.setPosX(116 + i * 144);
                    player_selector_1_anim.setPosY(88 + 144 * j);
                    drawText(characters[j][i].alt, 36, posX, posY);
                    document.body.style.cursor = "pointer";
                    colition = true;
                } else if (turno == 1 && characters[j][i] != player_selector_1) {
                    player_selector_2_anim.setPosX(116 + i * 144);
                    player_selector_2_anim.setPosY(88 + 144 * j);
                    player_selector_2_anim.draw();
                    showCharactersName(player_selector_1.alt, characters[j][i].alt, posX, posY);
                    document.body.style.cursor = "pointer";
                    colition = true;
                }
                player_selector_1_anim.draw();

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
    if (player_selector_1 != null && !colition) {
        if (player_selector_2 != null) {
            showCharactersName(player_selector_1.alt, player_selector_2.alt, posX, posY)
        } else {
            drawText(player_selector_1.alt, 36, posX, posY);
        }
    }
    //Boton para volver al modo
    posX = 35;
    posY = 35;
    context.beginPath();
    context.arc(posX, posY, 18, 0, Math.PI * 2, true);
    context.lineWidth = 2;
    context.fillStyle = '#FFFFFF25';
    context.strokeStyle = '#FFFFFFA6';
    context.fill();
    context.stroke();
    context.closePath();
    drawText('<', 32, posX - 2, posY + 2);
    context.strokeStyle = 'black';

    let _x = posX - mouseX;
    let _y = posY - mouseY;
    if (Math.sqrt(_x * _x + _y * _y) < 18) {
        document.body.style.cursor = "pointer";
    }
}

function showCharactersName(character_1, character_2, posX, posY) {
    drawText(character_1, 36, posX / 2, posY);
    drawText("VS", 36, posX, posY);
    drawText(character_2, 36, posX * 1.5, posY);
}

function drawModeSelection() {
    context.drawImage(imgCueva, 0, 0, canvas.clientWidth, canvas.clientHeight);
    document.body.style.cursor = "default";
    let xLineaValue = 0;
    let clocSelected = false;
    for (let i = 0; i < 2; i++) {
        if ((mouseX > 216 + i * 100 && mouseX < 280 + i * 100) && (mouseY > 270 && mouseY < 345)) {
            context.drawImage(imgOpciones, 197 + i * 100, 266, 103, 99);
            document.body.style.cursor = "pointer";
            xLineaValue = i + 4;
        }

        if ((mouseX > 419 + i * 100 && mouseX < 483 + i * 100) && (mouseY > 270 && mouseY < 345)) {
            context.drawImage(imgOpciones, 504 + i * 100, 266, -103, 99);
            document.body.style.cursor = "pointer";
            xLineaValue = i + 6;
        }
    }
    if ((mouseX > 236 && mouseX < 289) && (mouseY > 131 && mouseY < 199)) {
        context.drawImage(imgOpcionesTime, 229, 124, 67, 82);
        clocSelected = true;
        document.body.style.cursor = "pointer";
        if (timeVal != Infinity) {
            drawText(`${timeVal}`, 24, 314, 165);
            drawText(`TIEMPO DE JUEGO: ${timeVal} SEGUNDOS`, 24, canvas.clientWidth / 2, canvas.clientHeight - 16);
        } else {
            context.imageSmoothingEnabled = false;
            context.drawImage(imgInfinito, 314 - 22, 165 - 22, 45, 45)
            context.imageSmoothingEnabled = true;
            drawText(`TIEMPO DE JUEGO: Infinito`, 24, canvas.clientWidth / 2, canvas.clientHeight - 16);
        }
    }
    if (xLineaValue != 0) {
        drawText(`${xLineaValue} EN LINEA`, 24, canvas.clientWidth / 2, canvas.clientHeight - 16);
    } else if (!clocSelected) {
        drawText(`HAZ CLIC EN UN CRANEO PARA SELECCIONAR EL MODO DE JUEGO`, 24, canvas.clientWidth / 2, canvas.clientHeight - 16);
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
        document.body.style.cursor = "default";
        for (let i = 0; i < 3; i++) {
            if ((mouseX > 243 && mouseX < 556) &&
                (mouseY > 289 + i * 85 && mouseY < 356 + i * 85)) {
                document.body.style.cursor = "pointer";
            }
        }
    }
    if (ganador != null) {
        document.body.style.cursor = "default";
        drawText(`${ganador} wins`, 90, canvas.clientWidth / 2, canvas.clientHeight / 3);
        context.drawImage(drawMenuImg, 0, 0, canvas.clientWidth, canvas.clientHeight);

        for (let i = 0; i < 2; i++) {
            if ((mouseX > 243 && mouseX < 556) &&
                (mouseY > 374 + i * 85 && mouseY < 441 + i * 85)) {
                document.body.style.cursor = "pointer";
            }
        }

    } else if (draw) {
        document.body.style.cursor = "default";
        drawText(`DRAW`, 90, canvas.clientWidth / 2, canvas.clientHeight / 3);
        context.drawImage(drawMenuImg, 0, 0, canvas.clientWidth, canvas.clientHeight);

        for (let i = 0; i < 2; i++) {
            if ((mouseX > 243 && mouseX < 556) &&
                (mouseY > 374 + i * 85 && mouseY < 441 + i * 85)) {
                document.body.style.cursor = "pointer";
            }
        }
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

let player_selector_1_anim = new AnimatedPiece(context, '../images/juegoMK/animations/selector-jugador-1-anim.png', -200, -200, 135, 400, -1);
let player_selector_2_anim = new AnimatedPiece(context, '../images/juegoMK/animations/selector-jugador-2-anim.png', -200, -200, 135, 400, -1);
//let cueva_anim = new AnimatedPiece(context, '../images/juegoMK/cueva-interior.png', 0, 0, 800, 300);


function drawAll() {
    switch (room) {
        case 0: //start
            context.drawImage(titleImg, 0, 0, canvas.clientWidth, canvas.clientHeight);
            drawText("HAZ CLIC PARA JUGAR", 36, canvas.clientWidth / 2, canvas.clientHeight * 5 / 6);
            break;

        case 1: //modo
            drawModeSelection()
            break;

        case 2: //seleccion
            drawCharacterSelector();
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
let player1selectedCharacterSound;
function onMouseDown(e) {
    mouseX = e.layerX - offsetLeft;
    mouseY = e.layerY - offsetTop;
    switch (room) {
        case 0: //start to play
            room = 1;
            drawAll();
            startRoom0.play();
            loopSoundOn(sndBackgroundMusicRoom1)
            break;

        case 1: //seleccion de modo
            for (let i = 0; i < 2; i++) {
                if ((mouseX > 216 + i * 100 && mouseX < 280 + i * 100) && (mouseY > 270 && mouseY < 345)) {
                    room = 2;
                    xEnLinea = i + 4;
                    document.body.style.cursor = "default";
                    loopSoundOff(sndBackgroundMusicRoom1);
                    loopSoundOn(sndBackgroundMusicRoom2);
                    drawAll();
                }

                if ((mouseX > 419 + i * 100 && mouseX < 483 + i * 100) && (mouseY > 270 && mouseY < 345)) {
                    room = 2;
                    xEnLinea = i + 6;
                    document.body.style.cursor = "default";
                    loopSoundOff(sndBackgroundMusicRoom1);
                    loopSoundOn(sndBackgroundMusicRoom2);
                    drawAll();
                }
            }
            if ((mouseX > 236 && mouseX < 289) && (mouseY > 131 && mouseY < 199)) {
                timeVal += timeValSum;
                if (timeVal > timeValMax && timeVal != Infinity) {
                    timeVal = Infinity;
                }
                else if (timeVal == Infinity) {
                    timeVal = timeValMin;
                }
                drawAll();
            }
            break;

        case 2: //seleccion de personaje
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
                            sndSelectPlayer1.play();
                            player_selector_1_anim.setDuration(sndSelectPlayer1.duration * 1000 - 200);
                            player_selector_1_anim.startAnimation();
                            player1selectedCharacterSound = charactersSound[j][i];
                            turno++;
                        } else if (((turno % 2) + 1) == player2 && characters[j][i] != player_selector_1) {
                            player_selector_2 = characters[j][i];
                            player_selector_2_anim.setFrame(0);
                            player_selector_2_anim.setPosX(116 + i * 144);
                            player_selector_2_anim.setPosY(88 + 144 * j);
                            sndSelectPlayer2.play();
                            player_selector_2_anim.setDuration(sndSelectPlayer2.duration * 1000 - 200);
                            player_selector_2_anim.startAnimation();
                            setTimeout(() => {
                                if (room == 2) {
                                    player1selectedCharacterSound.play();
                                    setTimeout(() => {
                                        if (room == 2) {
                                            versusSound.play();
                                            setTimeout(() => {
                                                if (room == 2) {
                                                    charactersSound[j][i].play();
                                                    setTimeout(() => {
                                                        if (room == 2) { //para darle la posibilidad de volver en cualquier momento
                                                            player_selector_1_anim.setLoop(-1)
                                                            room = 3;
                                                            document.body.style.cursor = "default";
                                                            generarJuego(player_selector_1, player_selector_2, xEnLinea, timeVal);
                                                        }
                                                    }, charactersSound[j][i].duration * 1000 + 200);
                                                }
                                            }, versusSound.duration * 1000);
                                        }
                                    }, player1selectedCharacterSound.duration * 1000);
                                }
                            }, sndSelectPlayer2.duration * 1000);
                            turno++;
                        }

                    }
                }
            } if (player_selector_1 != null && player_selector_2 != null) {
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

let room2slot = -1;

function onMouseMove(e) {
    mouseX = e.layerX - offsetLeft;
    mouseY = e.layerY - offsetTop;
    switch (room) {
        case 0: //start to play
            break;

        case 1: //seleccion de modo
            drawAll(mouseX, mouseY);
            break;

        case 2: //seleccion de personaje
            let isInSlot = false;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                        isInSlot = true;
                        if (room2slot != i + j * 4) {
                            room2slot = i + j * 4;
                            drawAll(mouseX, mouseY);
                            break
                        }
                    }
                }
            }
            if (!isInSlot) {
                drawAll(mouseX, mouseY);
                room2slot=-1;
            }
            break;

        case 3: //juego
            if (mouseDown && lastClickedFigure != null) {
                lastClickedFigure.setPosition(mouseX, mouseY);
                drawAll();

            } else if (inPause || draw || ganador != null) {
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
                if (lastClickedFigure.getBounces() == lastClickedFigure.getMaxBounces() - 1) {
                    sndBounceOnTop.play();
                }
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
                    //sndWin.play();

                    let filaEncontrada = -1;
                    let columnaEncontrada = -1;
                    for (var i = 0; i < charactersSound.length; i++) {
                        for (var j = 0; j < charactersSound[i].length; j++) {
                            if (charactersSound[i][j].alt === ganador) {
                                filaEncontrada = i;
                                columnaEncontrada = j;
                                break; // Si ya encontraste el elemento, puedes salir de los bucles
                            }
                        }
                    }

                    if (filaEncontrada !== -1 && columnaEncontrada !== -1) {
                        charactersSound[filaEncontrada][columnaEncontrada].play()
                        setTimeout(() => {
                            winsSound.play();
                        }, charactersSound[filaEncontrada][columnaEncontrada].duration * 1000);
                    }

                    tablero.killLoser(ganador);
                    timer.setPausa(true);
                    clearInterval(setTimeOutTiempoDeJuego);
                } else if (turno + 1 == tablero.getCantFil() * tablero.getCantCol()) {
                    draw = true;
                    gameIsDraw();
                    drawAll();
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
            let positionBtnX = 35;
            let positionBtnY = 35;
            let radiusBtnBack = 18;
            let _x = positionBtnX - mouseX;
            let _y = positionBtnY - mouseY;
            if (Math.sqrt(_x * _x + _y * _y) < radiusBtnBack) {
                player_selector_1 = null;
                player_selector_2 = null;
                player_selector_1_anim.setFrame(0);
                player_selector_2_anim.setFrame(0);
                loopSoundOff(sndBackgroundMusicRoom2);
                loopSoundOn(sndBackgroundMusicRoom1);
                turno = 0;
                room = 1;
                document.body.style.cursor = "default";
                drawAll();
            }
            break;
        case 3: //juego
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
                document.body.style.cursor = "default";
                mouseDown = false;
                if (ganador == null && !draw) {
                    if (!inPause) {
                        if (pause.isSelected(mouseX, mouseY)) {
                            inPause = true;
                            timer.setPausa(true);
                            loopSoundOff(sndBackgroundMusicRoom3);
                            for (let i = 0; i < arrFichas.length; i++) {
                                arrFichas[i].setSeleccionable(false);
                            }
                            drawAll();
                        }
                    } else {//En pausa
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
                                        generarJuego(player_selector_1, player_selector_2, xEnLinea, timeVal);
                                        sndBackgroundMusicRoom3.currentTime = 0;
                                        break;

                                    case 2: //Quit
                                        returnToMenu();
                                        sndBackgroundMusicRoom1.play()
                                        sndBackgroundMusicRoom1.addEventListener('ended', () => {
                                            sndBackgroundMusicRoom1.play();
                                        })
                                        sndBackgroundMusicRoom3.currentTime = 0;
                                        break;
                                    default:
                                        break;
                                }
                            }

                        }
                        //drawAll();
                    }
                } else {// En caso de ganador o empate
                    for (let i = 0; i < 2; i++) {
                        if ((mouseX > 243 && mouseX < 556) &&
                            (mouseY > 374 + i * 85 && mouseY < 441 + i * 85)) {
                            switch (i) {
                                case 0://Restart
                                    generarJuego(player_selector_1, player_selector_2, xEnLinea, timeVal);
                                    sndBackgroundMusicRoom3.currentTime = 0;
                                    break;

                                case 1://Menu
                                    returnToMenu();
                                    loopSoundOff(sndBackgroundMusicRoom3);
                                    loopSoundOn(sndBackgroundMusicRoom1);
                                    sndBackgroundMusicRoom3.currentTime = 0;
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