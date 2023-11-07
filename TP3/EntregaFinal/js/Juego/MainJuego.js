const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

//Cargado multimedia
let totalRecursos = 0;
let recursosCargados = 0;

/**
 * Check if all resources have been loaded.
 * Verifica si todos los recursos se han cargado.
 */
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
const sndOpenBattle = new Audio('../sounds/Fight.mp3');
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

const imagenLateralPath = "../images/juegoMK/the-tower.png";
const imagenTopPath = "../images/juegoMK/imagenTop.png";
const imagenPinchosPath = "../images/juegoMK/pinchos.png";
const bgTableroPath = "../images/juegoMK/bg-tablero.png"

const pathCentral = "../images/juegoMK/casilla.png";
const pathCentralInside = "../images/juegoMK/casilla-interior.png";
const pathCentralBackground = "../images/juegoMK/casilla-relleno.png";
const player_select_path = "../images/juegoMK/seleccion-jugador.png";

const imgOpcionesPath = '../images/juegoMK/menu-options.png';
const imgOpcionesTimePath = '../images/juegoMK/menu-options-time.png';
const imgInfinitoPath = '../images/juegoMK/infinito.png';

const jailAnimatedPlayer1Path = '../images/juegoMK/animations/selector-jugador-1-anim.png';
const jailAnimatedPlayer2Path = '../images/juegoMK/animations/selector-jugador-2-anim.png';
const bloodPath = '../images/juegoMK/animations/blood.png';

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

//son 0 y 1 para compararlos con el modulo de turn
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
imgOpciones.src = imgOpcionesPath;
totalRecursos++;
imgOpciones.addEventListener('load', verificarCargaCompleta);

const imgOpcionesTime = new Image();
imgOpcionesTime.src = imgOpcionesTimePath;
totalRecursos++;
imgOpcionesTime.addEventListener('load', verificarCargaCompleta);

//Infinito
const imgInfinito = new Image();
imgInfinito.src = imgInfinitoPath;
totalRecursos++;
imgInfinito.addEventListener('load', verificarCargaCompleta);

// Menu
let room = 0;

//Game
const bgGameImage = new Image();
bgGameImage.src = bgTableroPath;
totalRecursos++;
bgGameImage.addEventListener('load', verificarCargaCompleta);

const theTower = new Image();
theTower.src = imagenLateralPath;
totalRecursos++;
theTower.addEventListener('load', verificarCargaCompleta);

const imagenTop = new Image();
imagenTop.src = imagenTopPath;
totalRecursos++;
imagenTop.addEventListener('load', verificarCargaCompleta);

const imagenPinchos = new Image();
imagenPinchos.src = imagenPinchosPath;
totalRecursos++;
imagenPinchos.addEventListener('load', verificarCargaCompleta);

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

let arrFichas = [];                     //Contiene todas las fichas
let arrFichaJugador1 = [];              //Fichas del jugador 1
let arrFichaJugador2 = [];              //Fichas del jugador 2
let lastClickedFigure = null;           //Contiene el ultimo objeto de tipo Ficha
let mouseDown = false;                  //Dectar si se clickeo el mouse
let widthCanvas = canvas.clientWidth;   //Ancho del canvas
let tablero;                            //Contiene el objeto tablero
let timer;                              //Contiene el objeto timer
const radiusPause = 12;
let inPause = false;                    //El juego esta pausado
let turn = 0;                          //Contador de los turnos
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

let player1selectedCharacterSound;

let player_selector_1_anim = new AnimatedPiece(context, jailAnimatedPlayer1Path, -200, -200, 135, 400, -1);
let player_selector_2_anim = new AnimatedPiece(context, jailAnimatedPlayer2Path, -200, -200, 135, 400, -1);

let sangrado = new AnimatedPiece(context, bloodPath, -135, -135, 135, 200, -1);

//Caida de la ficha
let velocity = 0;
let gravity = 1;
let velocityLimit = 20;
let intervalGravity;


//Genera el juego luego de la seleccion de personaje

function generarJuego(sprJugador1, sprJugador2, xEnLinea, time) {
    resetGameVariables();

    tablero = new Tablero(
        context,
        xEnLinea,
        pathCentral,
        pathCentralInside,
        pathCentralBackground,
        spriteHeightTop,
        spriteHeightBot,
        anchoTheTower,
        anchoTheTower
    );

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

    //Timer
    customFont.load().then(() => {
        timer = new Timer(time, widthCanvas / 2, 70, context, customFont);
    });

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

/**
 * Handle a draw (tie) situation in the game.
 * This function is called when the game ends in a draw, and it performs the necessary actions.
 * Maneja una situación de empate en el juego.
 * Se llama cuando el juego termina en empate y realiza las acciones necesarias.
 */
function gameIsDraw() {
    // Mark all game pieces as placed (colocada) to indicate the game is a draw.
    for (const ficha of arrFichas) {
        ficha.colocada(true);
    }

    // Reset mouse state and last clicked figure.
    mouseDown = false;
    lastClickedFigure = null;

    // Redraw the game to reflect the draw.
    drawAll();

    // Play a sound indicating the game ended in a draw.
    sndDraw.play();
}


/**
 * Se utiliza para restablecer el estado del juego cuando se inicia una nueva partida o se reinicia el juego.
 * This function is used to reset the game state when starting a new game or restarting the game.
 */
function resetGameVariables() {
    // Reiniciar variables de juego
    // Reset game variables
    turn = 0
    arrFichas = [];
    arrFichaJugador1 = [];
    arrFichaJugador2 = [];
    lastClickedFigure = null;
    ganador = null;
    mouseDown = false;
    widthCanvas = canvas.clientWidth;
    inPause = false;
    draw = false;

    // Detener la gravedad si está en curso
    // Stop gravity if it's in progress
    if (intervalGravity != null) {
        clearInterval(intervalGravity);
    }

    // Reiniciar animaciones de selección de jugadores
    // Reset player selection animations
    player_selector_1_anim.setFrame(0);
    player_selector_2_anim.setFrame(0);

    // Detener y restablecer el temporizador, si está en uso
    // Stop and reset the timer if it's in use
    if (timer != null) {
        timer.borrarIntervalo();
        timer.resetTimer()
    }

    // Limpiar el temporizador de tiempo de juego si está en curso
    // Clear the game time timeout if it's in progress
    if (setTimeOutTiempoDeJuego != null) { clearInterval(setTimeOutTiempoDeJuego); }
    setTimeOutTiempoDeJuego = null;
}

//Volver Al menu
/**
 * Return to the main menu of the game.
 * This function resets game variables and navigates the player back to the main menu.
 * Regresar al menú principal del juego.
 * Esta función reinicia las variables del juego y redirige al jugador de vuelta al menú principal.
 */
function returnToMenu() {
    // Reset game variables to their initial values.
    resetGameVariables();

    // Clear player selectors and set the room to 1 (mode selection).
    player_selector_1 = null;
    player_selector_2 = null;
    room = 1;

    // Redraw the game to display the main menu.
    drawAll();
}

/**
 * Draw text on the canvas with gradient effect.
 * Dibuja texto en el lienzo con un efecto de degradado.
*
* @param {string} text - The text to be displayed.
* @param {number} fontSize - The font size of the text.
* @param {number} posX - The x-coordinate of the text.
* @param {number} posY - The y-coordinate of the text.

 * The text in posX and posY is always drawn centered
 */

function drawText(text, fontSize, posX, posY) {
    // Create a gradient for the text.
    let gradient = context.createLinearGradient(0, posY - fontSize / 2, 0, posY + fontSize / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    // Set the font and text properties.
    context.font = fontSize + 'px MKfont';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = gradient;

    // Apply a stroke effect to the text.
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.strokeText(text, posX, posY);

    // Draw the text with gradient fill.
    context.fillText(text, posX, posY);

    // Reset the fill style to transparent.
    context.fillStyle = 'transparent';

}

/**
 * Draw the character selection screen and handle character selection.
 * Dibuja la pantalla de selección de personajes y maneja la selección de personajes.
 */
function drawCharacterSelector() {
    // Draw the grid of character images.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            context.drawImage(characters[i][j], 116 + j * 144, 88 + 144 * i);
        }
    }

    // Draw the player selection grid.
    context.drawImage(player_select, 0, 0);

    // Set the cursor style to default.
    document.body.style.cursor = "default";

    let posX = canvas.clientWidth / 2;
    let posY = canvas.clientHeight - 36;

    //colition is used to prevent character names from overlapping
    let colition = false;

    // Check for mouse collision with character images.
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                //the turn change when the player select the character in onMouseUp()
                if (turn == 0) {
                    player_selector_1_anim.setPosX(116 + i * 144);
                    player_selector_1_anim.setPosY(88 + 144 * j);
                    drawText(characters[j][i].alt, 36, posX, posY);
                    document.body.style.cursor = "pointer";
                    colition = true;
                } else if (turn == 1 && characters[j][i] != player_selector_1) {
                    player_selector_2_anim.setPosX(116 + i * 144);
                    player_selector_2_anim.setPosY(88 + 144 * j);
                    player_selector_2_anim.draw();
                    showCharactersName(player_selector_1.alt, characters[j][i].alt, posX, posY);
                    document.body.style.cursor = "pointer";
                    colition = true;
                }
                player_selector_1_anim.draw();

            } else {
                //The first time the turn is zero, so no animation is executed. 
                //When the first character is selected, turn becomes 1 and the first animation begins. 
                //After selecting the second, turn becomes 2 and the second animation is executed there.
                if (turn > 0) {
                    player_selector_1_anim.draw();
                }
                if (turn > 1) {
                    player_selector_2_anim.draw();
                }
            }
        }
    }

    // Display character names or selection indicator based on the current state.
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

/**
 * Display the names of two selected characters in a versus format.
 * Muestra los nombres de dos personajes seleccionados en un formato de enfrentamiento.
 *
 * @param {string} character_1 - The name of the first character.
 * @param {string} character_2 - The name of the second character.
 * @param {number} posX - The x-coordinate for positioning.
 * @param {number} posY - The y-coordinate for positioning.
 */
function showCharactersName(character_1, character_2, posX, posY) {
    drawText(character_1, 36, posX / 2, posY);
    drawText("VS", 36, posX, posY);
    drawText(character_2, 36, posX * 1.5, posY);
}

/**
 * Draw the game mode selection screen and handle mode selection.
 * Dibuja la pantalla de selección de modo de juego y maneja la selección del modo.
 */
function drawModeSelection() {
    // Draw the background image for the mode selection screen.
    context.drawImage(imgCueva, 0, 0, canvas.clientWidth, canvas.clientHeight);
    document.body.style.cursor = "default";
    let xLineaValue = 0;
    let clocSelected = false;
    for (let i = 0; i < 2; i++) {
        //Two checks are generated since the skulls are not at the same distance
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

function drawDecorativePictures(image, posX, posY, width, height) {
    context.save();
    context.drawImage(image, posX, posY, width, height);
    context.restore();
}

/**
 * Draw the game elements, UI, and handle user interactions.
 * Dibuja los elementos del juego, la interfaz de usuario y maneja las interacciones del usuario.
 */
function drawGame() {
    // Clear the canvas to prepare for drawing.
    clearCanvas();

    drawDecorativePictures(imagenTop, 0, 0, widthCanvas, spriteHeightTop);
    drawDecorativePictures(theTower, 0, spriteHeightTop, anchoTheTower, canvas.clientHeight - spriteHeightTop);
    drawDecorativePictures(theTower, canvas.clientWidth - anchoTheTower, spriteHeightTop, anchoTheTower, canvas.clientHeight - spriteHeightTop);

    // Draw Tablero and arrFichas.
    for (const ficha of arrFichas) {
        ficha.draw();
    }

    tablero.draw();
    drawDecorativePictures(imagenPinchos, anchoTheTower, canvas.clientHeight - spriteHeightPinchos, canvas.clientWidth - anchoTheTower - anchoTheTower, spriteHeightPinchos);

    timer.draw();

    // If a game piece is clicked and being moved, draw it.
    if (lastClickedFigure != null && mouseDown) {
        lastClickedFigure.draw();
    }

    drawPauseBtn(canvas.clientWidth - radiusPause, radiusPause, radiusPause);

    //Draw the blooding animation offscreen
    sangrado.draw();

    if (inPause) {
        drawPauseMenu();
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

function drawPauseBtn(posX, posY, radius) {
    context.save();

    context.beginPath();
    context.arc(posX, posY, radius - 2, 0, Math.PI * 2, true);
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
    context.beginPath();
    context.lineWidth = 5;
    context.moveTo(posX + radius / 4, posY - radius / 2);
    context.lineTo(posX + radius / 4, posY + radius / 2)
    context.stroke();
    context.closePath();
    context.beginPath();
    context.lineWidth = 5;
    context.moveTo(posX - radius / 4, posY - radius / 2);
    context.lineTo(posX - radius / 4, posY + radius / 2)
    context.stroke();
    context.closePath();
    context.restore();
}

function drawPauseMenu() {
    context.beginPath();
    context.fillStyle = 'rgba(0,0,0,0.2)';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.fill();
    context.closePath();

    context.drawImage(pauseMenuImg, 0, 0, canvas.clientWidth, canvas.clientHeight);
    drawText('Pause', 90, canvas.clientWidth / 2, canvas.clientHeight / 3);
}

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
    let pattern = context.createPattern(bgGameImage, 'repeat');

    // Dibuja un rectángulo en el canvas con el patrón de la imagen
    context.fillStyle = pattern;
    context.fillRect(0, 0, 800, 600);
}

/**
 * Find and return the game piece that was clicked based on its position.
 * Encuentra y devuelve la ficha de juego que fue seleccionada basada en su posición.
 *
 * @param {number} x - The x-coordinate of the click.
 * @param {number} y - The y-coordinate of the click.
 * @returns {Ficha|null} - The selected game piece, or null if no piece was found.
 */
function findClickedFigure(x, y) {
    for (let i = arrFichas.length - 1; i >= 0; i--) {
        if (arrFichas[i].isSelected(x, y)) {
            return arrFichas[i];
        }
    }
}

/**
 * Handle mouse down events and perform different actions based on the game room state.
 * Maneja eventos de clic del mouse y realiza diferentes acciones según el estado de la sala del juego.
 *
 * @param {MouseEvent} e - The mouse event object.
 */
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

        case 1: //Mode selection
            for (let i = 0; i < 2; i++) {
                //Check if the mouse clicked any skull
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
            //Check if the mouse clicked the sandglass
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
                    //Check if the mouse clicked any character
                    if ((mouseX > 116 + i * 144 && mouseX < 250 + i * 144) && (mouseY > 88 + 144 * j && mouseY < 222 + 144 * j)) {
                        if (turn + 1 == player1) {
                            player_selector_1 = characters[j][i];
                            player_selector_1_anim.setFrame(0);
                            player_selector_1_anim.setPosX(116 + i * 144);
                            player_selector_1_anim.setPosY(88 + 144 * j);
                            sndSelectPlayer1.play();
                            player_selector_1_anim.setDuration(sndSelectPlayer1.duration * 1000 - 200);
                            player_selector_1_anim.startAnimation();
                            player1selectedCharacterSound = charactersSound[j][i];
                            turn++;
                        } else if (turn + 1 == player2 && characters[j][i] != player_selector_1) {
                            player_selector_2 = characters[j][i];
                            player_selector_2_anim.setFrame(0);
                            player_selector_2_anim.setPosX(116 + i * 144);
                            player_selector_2_anim.setPosY(88 + 144 * j);
                            sndSelectPlayer2.play();
                            player_selector_2_anim.setDuration(sndSelectPlayer2.duration * 1000 - 200);
                            player_selector_2_anim.startAnimation();
                            //Once a character is selected, the closing sounds begin to play, 
                            //verifying in each one whether the room is equal to 2 in order to give 
                            //the possibility of returning to the previous menu at any time. 
                            //If the room is not changed in all that time, the game is generated 
                            //and goes to the next room.
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
                                                        if (room == 2  && player_selector_1 != null  && player_selector_2 != null) {
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
                            turn++;
                        }
                    }
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

let room2slot = -1;

function onMouseMove(e) {
    mouseX = e.layerX - offsetLeft;
    mouseY = e.layerY - offsetTop;
    switch (room) {
        case 0: //Start to play
            break;

        case 1: //Mode selection
            drawAll();
            break;

        case 2: //character selection
            drawAll();
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

/**
 * Correct the X-position of the last clicked figure after it falls.
 * Corrige la posición en el eje X de la última figura clickeada después de su caída.
 */
function correccionCaidaX() {
    lastClickedFigure.setPosition(
        anchoTheTower +
        //Siempre es la mitad mas el ancho de una casilla(la primera vez es cero), más el ancho de la torre
        tablero.getColumnaExacta(lastClickedFigure.getPositionX()) * tablero.getWidthCasilla() +
        tablero.getWidthCasilla() / 2,
        lastClickedFigure.getPositionY()
    );
}

/**
 * Apply gravity to the last clicked figure.
 * Aplica la gravedad a la última figura clickeada.
 * @param {number} posX - The X-position of the figure. This no change here.
 */
function gravedad(posX) {
    if (lastClickedFigure != null && !mouseDown) {
        //the token accelerates until it reaches the speed limit
        velocity = lastClickedFigure.getVelocity() + gravity;
        // Limit the velocity to avoid excessive speed.
        if (velocity > velocityLimit) {
            velocity = velocityLimit;
        }
        lastClickedFigure.setVelocity(velocity);
        lastClickedFigure.setPosition(
            posX,
            lastClickedFigure.getPositionY() + velocity
        );

        //When the piece exceeds the limit of the ground minus its speed, 
        //it reverses its speed, going in the opposite direction and losing 40% of its total speed on each bounce.
        if (lastClickedFigure.getPositionY() > tablero.getSuelo() - velocity) {
            if (
                lastClickedFigure.getBounces() > 0 &&
                lastClickedFigure.getVelocity() > 0.6 //No recuerdo para que era. Si se saca no noto la diferencia
            ) {
                lastClickedFigure.setBounces(lastClickedFigure.getBounces() - 1);
                lastClickedFigure.setVelocity(-lastClickedFigure.getVelocity() * 0.6); //Perdida de energia (?
                lastClickedFigure.setPosition(
                    posX,
                    tablero.getSuelo()
                );
                //At the first bounce the token empuja la ficha de abajo ensartandola mas en los pinchos
                if (lastClickedFigure.getBounces() == lastClickedFigure.getMaxBounces() - 1) {
                    sndBounceOnTop.play();
                }
            } else {
                //when the token finishes bouncing
                clearInterval(intervalGravity);
                lastClickedFigure.setBounces(lastClickedFigure.getMaxBounces()); // ???? why
                lastClickedFigure.setVelocity(0);
                lastClickedFigure.setPosition(
                    posX,
                    tablero.getSuelo()
                );

                //The token is added to the matrix and the winner is verified
                ganador = tablero.cargarEnMatriz(lastClickedFigure);

                //the first token is skewered, screams and bleeds
                if (tablero.getSuelo() == (canvas.clientHeight - tablero.getHeightCasilla() / 2)) {
                    sangrado.setFrame(0);
                    sangrado.setPosX(posX - sangrado.getFrameWidth() / 2);
                    sangrado.setPosY(lastClickedFigure.getPositionY() - sangrado.getFrameHight() / 2);
                    sangrado.draw();
                    lastClickedFigure.playSkewered();
                    sndSkewered.play();
                    sangrado.startAnimation();
                }

                //When there is a winner, the tokens become inaccessible, the winner is named, 
                //the loser is marked with skulls, time is paused
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
                } else if (turn + 1 == tablero.getCantFil() * tablero.getCantCol()) {
                    draw = true;
                    gameIsDraw();
                    drawAll();
                }
                lastClickedFigure = null;
                velocity = 0;
                tablero.resetSuelo();
                turn++;
                resaltarFichasEnJuego();
            }
        }
        drawAll();
    }
}

/**
 * This function handles mouse release events and controls different actions based on the current game state, 
 * including mode selection, character selection, and gameplay. It allows players to place tokens on the game board, 
 * manage pause, and make choices when a game is won or drawn.
 */
function onMouseUp() {
    switch (room) {
        case 0: //start to play

            break;

        case 1: //mode selector
            break;

        case 2: //character selector
            //when the backBtn is selected, back to mode selector
            let positionBtnX = 35;
            let positionBtnY = 35;
            let radiusBtnBack = 18;
            let _x = positionBtnX - mouseX;
            let _y = positionBtnY - mouseY;
            if (Math.sqrt(_x * _x + _y * _y) < radiusBtnBack) {
                returnToMenu();
                loopSoundOff(sndBackgroundMusicRoom2);
                loopSoundOn(sndBackgroundMusicRoom1);
                document.body.style.cursor = "default";
                drawAll();
            }
            break;
        case 3: //juego
            if ((lastClickedFigure != null) && (mouseDown)) {
                mouseDown = false;
                if (
                    lastClickedFigure.getPositionY() < spriteHeightTop - lastClickedFigure.getRadius() && //impide que se pueda tirar por debajo del limite superior del tablero
                    lastClickedFigure.getPositionX() > anchoTheTower &&
                    lastClickedFigure.getPositionX() < canvas.clientWidth - anchoTheTower
                ) {
                    //Delimits the section where the token can be thrown

                    let columna = tablero.getColumnaExacta(lastClickedFigure.getPositionX());

                    if (tablero.getFilaDisponible(columna) != -1) {
                        correccionCaidaX();

                        lastClickedFigure.colocada(true);

                        if ((turn % 2) + 1 == player1) {
                            acomodarFichasNoColocadas(arrFichaJugador1, arrFichaJugador1.indexOf(lastClickedFigure));
                        } else {
                            acomodarFichasNoColocadas(arrFichaJugador2, arrFichaJugador2.indexOf(lastClickedFigure));
                        }

                        tablero.calcularNuevoSuelo(columna);

                        let auxPosx = lastClickedFigure.getPositionX();

                        intervalGravity = setInterval(function () {
                            gravedad(auxPosx);
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
                        let _x = canvas.clientWidth - radiusPause - mouseX;
                        let _y = radiusPause - mouseY;
                        if (Math.sqrt(_x * _x + _y * _y) < radiusPause) {
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
                                        loopSoundOff(sndBackgroundMusicRoom3);
                                        loopSoundOn(sndBackgroundMusicRoom1);
                                        sndBackgroundMusicRoom3.currentTime = 0;
                                        break;
                                    default:
                                        break;
                                }
                            }

                        }
                        //drawAll();
                    }
                } else {// In the event that there is a winner or there is a draw
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

/**
 * Adjusts the positions of non-placed game tokens within the provided array.
 *
 * @param {Array} arr - The array of game tokens to adjust positions within.
 * @param {number} posFicha - The position of the token to be placed.
 */
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

//Turn
/**
 * Highlights the game tokens that can be played based on the current player's turn.
 * Enables or disables the ability to select specific tokens for the active player.
 */
function resaltarFichasEnJuego() {
    //le saque el turn++ porque daba errores al poner pausa
    if ((turn % 2) + 1 == player1) {
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