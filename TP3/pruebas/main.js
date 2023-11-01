const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d")

let img = new Image();
img.src = 'blood.png';
let totalFrame;
let frameWidth = 135;
let frame = 0;
img.addEventListener('load', () => {
    totalFrame = img.width / frameWidth-1;
    draw();
});

function draw() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.drawImage(img, frameWidth * frame, 0, frameWidth, img.height, 0, 0, frameWidth, img.height);

    if (frame == totalFrame) {
        cancelAnimationFrame(draw);
    } else {
        frame++;
    }
    let timeOut = setTimeout(() => {
        requestAnimationFrame(draw);
        clearTimeout(timeOut);
    }, 80)
}

//mykreazion
/*
let ancho1 = 28;
let ancho2 = 53;
let ancho3 = 70;
let ancho4 = 104.7; //no son pixeles
let ancho5 = 138;
let ancho6 = 164;
let ancho7 = 216;
let ancho8 = 197;
let ancho9 = 208;
let ancho10 = 160;
let ancho11 = 186;
let ancho12 = 190;
let ancho13 = 188;
let ancho14 = 15;
let ancho15 = 18;
let ancho16 = 18;
let ancho17 = 56;
let ancho18 = 82;
let ancho19 = 93;
let ancho20 = 104;
let ancho21 = 111;
let ancho22 = 120;

let alto1 = 17;
let alto2 = 29;
let alto3 = 48;
let alto4 = 66;
let alto5 = 73;
let alto6 = 83;
let alto7 = 101;
let alto8 = 109;
let alto9 = 85;
let alto10 = 79;
let alto11 = 83;
let alto12 = 81;
let alto13 = 76;
let alto14 = 54;
let alto15 = 14;
let alto16 = 14;
let alto17 = 14;
let alto18 = 13;
let alto19 = 14;
let alto20 = 11;
let alto21 = 7;
let alto22 = 5;
 */

//let timeOut;
/* 
    switch (frame) {
        case 1:
            context.drawImage(img, 0, 65, ancho1, alto1, ancho7 - ancho1 / 2, alto8 - alto1, ancho1, alto1);
            frame++;
            break;
        case 2:
            context.drawImage(img, 30, 53, ancho2, alto2, ancho7 - ancho2 / 2, alto8 - alto2, ancho2, alto2);
            frame++;
            break;
        case 3:
            context.drawImage(img, 85, 34, ancho3, alto3, ancho7 - ancho3 / 2, alto8 - alto3, ancho3, alto3);
            frame++;
            break;
        case 4:
            context.drawImage(img, 156, 18, ancho4, alto4, ancho7 - ancho4 / 2, alto8 - alto4, ancho4, alto4);
            frame++;
            break;
        case 5:
            context.drawImage(img, 261, 9, ancho5, alto5, ancho7 - ancho5 / 2, alto8 - alto5, ancho5, alto5);
            frame++;
            break;


        case 6:
            context.drawImage(img, 401, 7, ancho6, alto6, ancho7 - ancho6 / 2, alto8 - alto6+7, ancho6, alto6);
            frame++;
            break;
        case 7:
            //a partir de acá se corrige un error minimo porque el piso sube ya que hay gotas de sangre que en 2d estan mas abajo pero intentan dar una sensacion de profundidad y hay un error con respecto al centro
            context.drawImage(img, 569, 4, ancho7, alto7, ancho7 / 2+8, alto8-alto7+24, ancho7, alto7);
            frame++;
            break;
        case 8:
            //error minimo            
            context.drawImage(img, 805, 3, ancho8, alto8, ancho7- ancho8 / 2+12, 31, ancho8, alto8);
            frame++;
            break;
            case 9:
            context.drawImage(img, 1001, 1, ancho9, alto9, ancho7 - ancho9/2, alto8 - alto9+5, ancho9, alto9);  
            frame++;  
        break;
        case 10:
            context.drawImage(img, 1222, 2, ancho10, alto10, ancho7 - ancho10/2-1, alto8 - alto10, ancho10, alto10);  
            frame++;  
        break;
        case 11:
            context.drawImage(img, 1398, 6, ancho11, alto11, ancho7 - ancho11 / 2-6, alto8 - alto11+8, ancho11, alto11);
            frame++;  
        break;
        case 12:
            context.drawImage(img, 1593, 10, ancho12, alto12, ancho7 - ancho12 / 2+1, alto8 - alto12+10, ancho12, alto12);
            frame++;  
        break;
        case 13:
            context.drawImage(img, 1779, 15, ancho13, alto13, ancho7 - ancho13 / 2+1, alto8 - alto13+10, ancho13, alto13);
            frame++;  
        break;
        case 14:
            context.drawImage(img, 1975, 27, ancho14, alto14, ancho7 - ancho14 / 2, alto8 - alto14, ancho14, alto14);
            frame++;  
        break;
        case 15:
            context.drawImage(img, 2002, 50, ancho15, alto15, ancho7 - ancho15 / 2, alto8 - alto15-15, ancho15, alto15);
            frame++;  
        break;
        case 16:
            context.drawImage(img, 2034, 65, ancho16, alto16, ancho7 - ancho16 / 2, alto8 - alto16, ancho16, alto16);
            frame++;  
        break;
        case 17:
            context.drawImage(img, 2061, 67, ancho17, alto17, ancho7 - ancho17 / 2, alto8 - alto17, ancho17, alto17);
            frame++;  
        break;
        case 18:
            context.drawImage(img, 2123, 68, ancho18, alto18, ancho7 - ancho18 / 2, alto8 - alto18, ancho18, alto18);
            frame++;  
        break;
        case 19:
            context.drawImage(img, 2210, 67, ancho19, alto19, ancho7 - ancho19 / 2, alto8 - alto19, ancho19, alto19);
            frame++;  
        break;
        case 20:
            context.drawImage(img, 2306, 70, ancho20, alto20, ancho7 - ancho20 / 2, alto8 - alto20, ancho20, alto20);
            frame++;  
        break;
        case 21:
            context.drawImage(img, 2412, 74, ancho21, alto21, ancho7 - ancho21 / 2, alto8 - alto21, ancho21, alto21);
            frame++;  
        break;
        case 22:
            context.drawImage(img, 2524, 76, ancho22, alto22, ancho7 - ancho22 / 2, alto8 - alto22, ancho22, alto22);
            frame++;  
        break;
        

        default:
            break;
    } */