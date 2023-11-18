document.addEventListener("DOMContentLoaded", function () {

    function getScrollPosition() {
        return window.scrollY;
    }

    window.addEventListener('scroll', function () {
        console.log('Posición de scroll:', getScrollPosition());
        scroll(getScrollPosition())
    });


    //Navegador
    let navegador = document.querySelector("#nav");
    let navTitle = document.querySelector("#titulo");
    let navWidth = navTitle.width;
    let scrollVarTitle = 300 * (navTitle.height / 301);

    window.addEventListener('resize', function () {
        navWidth = navTitle.width;
        scrollVarTitle = 300 * (navTitle.height / 301); //301 porque es la altura maxima en res 1280
        scroll(getScrollPosition());
    });

    function scroll(scroll) {
        nav(scroll);
        edificios(scroll);
        moverDuendeVerde(scroll);
        aparecerCartas(scroll);
        showMasAmigos(scroll);
        moverTarjetasGhostSpider(scroll);
    }

    scroll(getScrollPosition());


    /**
     * Se encarga de controlar el tamanio del titulo, color del fondo del nav y tamanio del mismo con respecto al scroll realizado
     * @param {number} scroll 
     */
    function nav(scroll) {
        if (scroll == 0) {
            navegador.style.height = "";
            navegador.style.zIndex = "";
            navegador.style.background = "";
            navTitle.style.position = "";
            navTitle.style.transform = "";
            navTitle.style.width = "";
            //no veo diferencia con y sin este bloque, que cambia?
        }
        else if (scroll > 0 && scroll <= scrollVarTitle) {
            navegador.style.height = `${227 - 124 * scroll / scrollVarTitle}px`;
            navegador.style.zIndex = "9998";

            //transparencia del navegador. A medida que aumenta el color se hace más sólido
            navegador.style.background = `linear-gradient(180deg, rgba(84, 153, 248,${scroll / scrollVarTitle}) 0%, rgba(84, 153, 248,${scroll / scrollVarTitle}) 87.91%, rgba(84, 153, 248, 0) 100%)`;

            navTitle.style.position = "fixed";
            //Transporta el titulo hacia arriba poco a poco al principio a cada vez más
            // ya que scroll / scrollVarTitle va de 0 a casi 1
            navTitle.style.transform = `translateY(${-91 * scroll / scrollVarTitle}px)`;

            //Cambia el ancho del titulo desde su ancho máximo navWidth hasta 175.
            //Al principio no tiene reduccion ya que scroll y scrollVarTitle tienden a 0, pero a medida que crece (baja el scroll) 
            //se va acercando a la diferencia entre el ancho del navegador y el ancho al que se desea llegar
            navTitle.style.width = `${navWidth - ((navWidth - 175) * (scroll / scrollVarTitle))}px`;
        } else if (scroll > 300) {
            //una vez que el scroll supera un determinado valor se setean valores fijos para que quede en el título
            navegador.style.height = "103px"
            navegador.style.zIndex = "9998";
            navegador.style.background = "";
            navTitle.style.position = "fixed";
            navTitle.style.transform = `translateY(-91px)`;
            navTitle.style.width = "175px";
        }
    }

    //Edificios

    function edificios(scroll) {
        let towerLeft = document.querySelector("#edificios-izquierda");
        let towerCenter = document.querySelector("#edificios-centro");
        let towerRight = document.querySelector("#edificios-derecha");
        if (scroll == 0) {
            towerLeft.style.transform = ``;
            towerCenter.style.transform = ``;
            towerRight.style.transform = ``;
        }
        else if (scroll > 0 && scroll <= scrollVarTitle) {
            towerLeft.style.transform = `translateX(${-100 + 100 * scroll / scrollVarTitle}px)`;
            towerCenter.style.transform = `translateX(-50%) translateY(${50 - 50 * scroll / scrollVarTitle}px)`;
            towerRight.style.transform = `translateX(${100 - 100 * scroll / scrollVarTitle}px)`;
        } else if (scroll > 300) {
            towerLeft.style.transform = `translateX(0)`;
            towerCenter.style.transform = `translateX(-50%) translateY(0)`;
            towerRight.style.transform = `translateX(0)`;
        }
    }

    //Spidermans mouse move
    /* let divHeroes = document.querySelector("#primera-seccion");
    let peter = divHeroes.querySelector("#primera-seccion-peter");
    let peterSpiderWeb = divHeroes.querySelector("#tela-arania-izquierda");
    let gwen = divHeroes.querySelector("#primera-seccion-gwen");
    let miles = divHeroes.querySelector("#primera-seccion-miles");
    let milesSpiderWeb = divHeroes.querySelector("#tela-arania-derecha");

    divHeroes.addEventListener("mousemove", function mover(e) {
        const offset1 = {
            x: (e.pageX - divHeroes.clientWidth / 2) / (divHeroes.clientWidth / 16),
            y: (e.pageY - divHeroes.clientHeight / 2) / (divHeroes.clientHeight / 16)
        };
        const offset2 = {
            x: (e.pageX - divHeroes.clientWidth / 2) / (divHeroes.clientWidth / 8),
            y: (e.pageY - divHeroes.clientHeight / 2) / (divHeroes.clientHeight / 8)
        };
        const offset3 = {
            x: (e.pageX - divHeroes.clientWidth / 2) / (divHeroes.clientWidth / 6),
            y: (e.pageY - divHeroes.clientHeight / 2) / (divHeroes.clientHeight / 6)
        };
        peter.style.transform = `translate(calc(-50% + ${-offset1.x}px), ${-offset1.y}px)`;
        peterSpiderWeb.style.transform = `translate(${-offset1.x}px, ${-offset1.y}px)`;

        miles.style.transform = `translate( ${-offset2.x}px, ${-offset2.y}px)`;
        milesSpiderWeb.style.transform = `translate(${-offset2.x}px, ${-offset2.y}px)`;

        gwen.style.transform = `translate( ${-offset3.x}px, ${-offset3.y}px)`;
    }) */


    //Segunda parte

    function moverDuendeVerde(scroll) {
        let duendeVerde = document.querySelector("#duende-verde");
        if (scroll > 600 && scroll < 1000) {
            duendeVerde.style.transform = `translateY(${(scroll - 600) / 8}px)`;
        } else if (scroll >= 1000) {
            duendeVerde.style.transform = `translateY(${(1000 - 600) / 8}px)`;
        }
    }

    function aparecerCartas(scroll) {

        let cajaPersonajes = document.querySelector("#personajes-segunda-seccion");
        let heightPersonajes = cajaPersonajes.getBoundingClientRect().height;
        let escala = window.innerWidth / 1000;
        let posPersonajes = cajaPersonajes.getBoundingClientRect().top + scroll - window.innerHeight + navegador.getBoundingClientRect().height - 100 * escala;

        let peter = document.querySelector("#peter-segunda-seccion");
        let miles = document.querySelector("#miles-segunda-seccion");
        let gwen = document.querySelector("#gwen-segunda-seccion");

        if (scroll > posPersonajes && scroll <= posPersonajes + heightPersonajes) {
            //let calculoAuxiliar = Math.sin(((scroll - posPersonajes) / 2 / heightPersonajes) * Math.PI);
            peter.style.opacity = Math.sin(((scroll - posPersonajes) / 2 / heightPersonajes) * Math.PI);
            //se elevan al cuadrado y al cubo para retrasar la aparicion
            //se divide PI para que llegue mas rapido a 1 una vez que empieza a aparecer
            miles.style.opacity = Math.sin(Math.pow((scroll - posPersonajes) / heightPersonajes, 2) * Math.PI/2);
            gwen.style.opacity = Math.sin(Math.pow((scroll - posPersonajes) / heightPersonajes,3) * Math.PI/3);
        } else if (scroll > posPersonajes + (heightPersonajes / 2)) {
            //let calculoAuxiliar = Math.sin(((scroll - (posPersonajes + (heightPersonajes / 2))) / (heightPersonajes / 2)) * (Math.PI / 2) + Math.PI / 2);
            peter.style.opacity = 1;
            miles.style.opacity = 1;
            gwen.style.opacity = 1;
        }
    }

    function moverTarjetasGhostSpider(scroll) {
        let contenedorTarjetas = document.querySelector("#tercera-seccion-contenedor");
        if (scroll > 1620 && scroll < 2226) {
            contenedorTarjetas.style.transform = `translateY(${(scroll - 1620) / 16}px)`;
        } else if (scroll >= 2226) {
            contenedorTarjetas.style.transform = `translateY(${(2226 - 1620) / 16}px)`;
        }
    }

    //Vengadores mouse move
    let divVengadores = document.querySelector("#seccion-vengadores");
    let blackPanther = divVengadores.querySelector("#seccion-vengadores-black-panther");
    let msMarvel = divVengadores.querySelector("#seccion-vengadores-ms-marvel");
    let hulk = divVengadores.querySelector("#seccion-vengadores-hulk");
    let arboles = divVengadores.querySelector("#seccion-vengadores-arboles");
    let pasto = divVengadores.querySelector("#seccion-vengadores-pasto");

    divVengadores.addEventListener("mousemove", function (e) {
        const offset1 = { // black panther
            x: (e.pageX - divVengadores.clientWidth / 2) / (divVengadores.clientWidth / 16),
            y: ((e.pageY - (divVengadores.getBoundingClientRect().y + getScrollPosition())) - divVengadores.clientHeight / 2) / (divVengadores.clientHeight / 16)
        };
        const offset2 = { // ms. marvel
            x: (e.pageX - divVengadores.clientWidth / 2) / (divVengadores.clientWidth / 8),
            y: ((e.pageY - (divVengadores.getBoundingClientRect().y + getScrollPosition())) - divVengadores.clientHeight / 2) / (divVengadores.clientHeight / 8)
        };
        const offset3 = { //hulk
            x: (e.pageX - divVengadores.clientWidth / 2) / (divVengadores.clientWidth / 6),
            y: ((e.pageY - (divVengadores.getBoundingClientRect().y + getScrollPosition())) - divVengadores.clientHeight / 2) / (divVengadores.clientHeight / 6)
        };
        const offset4 = { // arboles-edificios
            x: (e.pageX - divVengadores.clientWidth / 2) / (divVengadores.clientWidth / 4),
            y: ((e.pageY - (divVengadores.getBoundingClientRect().y + getScrollPosition())) - divVengadores.clientHeight / 2) / (divVengadores.clientHeight / 4)
        };
        const offset5 = { // pasto
            x: (e.pageX - divVengadores.clientWidth / 2) / (divVengadores.clientWidth / 20),
            y: ((e.pageY - (divVengadores.getBoundingClientRect().y + getScrollPosition())) - divVengadores.clientHeight / 2) / (divVengadores.clientHeight / 20)
        };


        blackPanther.style.transform = `translate(${-offset1.x}px, ${-offset1.y}px)`;
        msMarvel.style.transform = `translate( ${-offset2.x}px, ${-offset2.y}px)`;
        hulk.style.transform = `translate( ${-offset3.x}px, ${-offset3.y}px)`;

        arboles.style.transform = `translate(calc(${-offset4.x}px - 50%), calc(${-offset4.y}px - 50%))`;
        pasto.style.transform = `translate(calc(${-offset5.x}px - 50%), calc(${-offset5.y}px - 50%))`;
    })


    function showMasAmigos(scroll) {

        let imagenesMasAmigos = document.querySelector("#seccion-mas-amigos-imagenes");

        let imagen1 = document.querySelector("#mas-amigos-1");
        let imagen2 = document.querySelector("#mas-amigos-2");
        let imagen3 = document.querySelector("#mas-amigos-3");
        let imagen4 = document.querySelector("#mas-amigos-4");

        let delay = window.innerWidth * 4 / 100;

        if (scroll < 4000) {
            imagen1.style.opacity = 1;
            console.log();
        } else if (scroll >= 4000 && scroll < 4412) {
            imagenesMasAmigos.style.transform = `translateY(${scroll - 4000}px)`;
            imagen1.style.opacity = Math.cos(((scroll - (4000 + delay)) / (4000 + delay)) * Math.PI * 5);
            imagen2.style.opacity = Math.sin(((scroll - (4000 + delay)) / 2 / (4000 + delay)) * Math.PI * 10);
            // el 5 y el 10 son numeros que fui probando para la velocidad de transicion
            // coseno para que desaparezca y seno para que aparezca
            // el delay son los pixeles que tarda en base al ancho de la pantalla, no sé que te parece
        } else if (scroll >= 4412 && scroll < 4846) {
            imagenesMasAmigos.style.transform = `translateY(${scroll - 4000}px)`;
            imagen1.style.opacity = 0;
            imagen3.style.opacity = Math.sin((scroll - (4412 + delay)) / 2 / (4412 + delay) * Math.PI * 10);
            imagen2.style.opacity = Math.cos((scroll - (4412 + delay)) / (4412 + delay) * Math.PI * 5);
        } else if (scroll >= 4846 && scroll < 5375) {
            imagenesMasAmigos.style.transform = `translateY(${scroll - 4000}px)`;
            imagen2.style.opacity = 0;
            imagen4.style.opacity = Math.sin((scroll - (4846 + delay)) / 2 / (4846 + delay) * Math.PI * 10);
            imagen3.style.opacity = Math.cos((scroll - (4846 + delay)) / (4846 + delay) * Math.PI * 5);
        } else if (scroll >= 5375) {
            imagen3.style.opacity = 0;
            imagen4.style.opacity = 1;

        }
    }
})