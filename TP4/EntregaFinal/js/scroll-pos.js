document.addEventListener("DOMContentLoaded", function () {

    /**
     * Retrieves the current scroll position of the window.
     *
     * @return {number} The current scroll position.
     */
    function getScrollPosition() {
        return window.scrollY;
    }

    
    window.addEventListener('scroll', function () {
        //console.log('Posición de scroll:', getScrollPosition());
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
     * It is responsible for controlling the size of the title, color of the background of 
     * the nav and its size with respect to the scroll made.
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
        }
        else if (scroll > 0 && scroll <= scrollVarTitle) {
            navegador.style.height = `${227 - 124 * scroll / scrollVarTitle}px`;
            navegador.style.zIndex = "9998";

            //browser transparency. As the color increases it becomes more solid
            navegador.style.background = `linear-gradient(180deg, rgba(84, 153, 248,${scroll / scrollVarTitle}) 0%, rgba(84, 153, 248,${scroll / scrollVarTitle}) 87.91%, rgba(84, 153, 248, 0) 100%)`;

            navTitle.style.position = "fixed";
            //Transporta el titulo hacia arriba poco a poco al principio a cada vez más
            // ya que scroll / scrollVarTitle va de 0 a casi 1
            navTitle.style.transform = `translateY(${-91 * scroll / scrollVarTitle}px)`;

            //Change the width of the title from its maximum width navWidth to 175.
            //At first there is no reduction since scroll and scrollVarTitle tend to 0, but as it grows (the scroll goes down)
            //approaches the difference between the width of the browser and the width you want to reach
            navTitle.style.width = `${navWidth - ((navWidth - 175) * (scroll / scrollVarTitle))}px`;
        } else if (scroll > 300) {
            //once the scroll exceeds a certain value, fixed values are set so that it remains in the title
            navegador.style.height = "103px"
            navegador.style.zIndex = "9998";
            navegador.style.background = "";
            navTitle.style.position = "fixed";
            navTitle.style.transform = `translateY(-91px)`;
            navTitle.style.width = "175px";
        }
    }

    //Edificios
/**
 * Move the buildings of the first section closer together as you scroll down
 */
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
    /**
     * Moves the Duende Verde element based on the scroll position.
     */
    function moverDuendeVerde(scroll) {
        let duendeVerde = document.querySelector("#duende-verde");
        if (scroll > 600 && scroll < 1000) {
            duendeVerde.style.transform = `translateY(${(scroll - 600) / 8}px)`;
        } else if (scroll >= 1000) {
            duendeVerde.style.transform = `translateY(${(1000 - 600) / 8}px)`;
        }
    }

    /**
     * The cards appear as you scroll down
     */
    function aparecerCartas(scroll) {

        let cajaPersonajes = document.querySelector("#personajes-segunda-seccion");
        let heightPersonajes = cajaPersonajes.getBoundingClientRect().height;
        let escala = window.innerWidth / 1000;
        let posPersonajes = cajaPersonajes.getBoundingClientRect().top + scroll - window.innerHeight + navegador.getBoundingClientRect().height - 100 * escala;

        let peter = document.querySelector("#peter-segunda-seccion");
        let miles = document.querySelector("#miles-segunda-seccion");
        let gwen = document.querySelector("#gwen-segunda-seccion");

        if (scroll > posPersonajes && scroll <= posPersonajes + heightPersonajes) {
            peter.style.opacity = Math.sin(((scroll - posPersonajes) / 2 / heightPersonajes) * Math.PI);
            //they are squared and cubed to delay the appearance
            //PI is divided so that it reaches 1 faster once it starts appearing
            miles.style.opacity = Math.sin(Math.pow((scroll - posPersonajes) / heightPersonajes, 2) * Math.PI / 2);
            gwen.style.opacity = Math.sin(Math.pow((scroll - posPersonajes) / heightPersonajes, 3) * Math.PI / 3);
        } else if (scroll > posPersonajes + (heightPersonajes / 2)) {
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


        blackPanther.style.transform = `rotate(16deg) translate(${-offset1.x}px, ${-offset1.y}px)`;
        msMarvel.style.transform = `translate( ${-offset2.x}px, ${-offset2.y}px)`;
        hulk.style.transform = `translate( ${-offset3.x}px, ${-offset3.y}px)`;

        arboles.style.transform = `translate(calc(${-offset4.x}px - 50%), calc(${-offset4.y}px - 50%))`;
        pasto.style.transform = `translate(calc(${-offset5.x}px - 50%), calc(${-offset5.y}px - 50%))`;
    })


    /**
     * controls the appearance and disappearance of images and text as they pass through the section, 
     * moving the image container down and changing the image depending on the text in focus
     * @param {number} scroll 
     */
    function showMasAmigos(scroll) {

        let seccionMasAmigosPosy = document.querySelector("#seccion-mas-amigos").getBoundingClientRect().top + scroll + 50;

        let imagenesMasAmigos = document.querySelector("#seccion-mas-amigos-imagenes");
        //let tituloMasAmigos = document.querySelector("#div-seccion-mas-amigos").querySelector("h1");
        let imagen1 = document.querySelector("#mas-amigos-1");
        let imagen2 = document.querySelector("#mas-amigos-2");
        let imagen3 = document.querySelector("#mas-amigos-3");
        let imagen4 = document.querySelector("#mas-amigos-4");
        let textoMasAmigos = document.querySelector(".texto-mas-amigos").querySelectorAll("div");
        //let visibilidad = 80;

        imagen1.style.opacity = 0;
        imagen2.style.opacity = 0;
        imagen3.style.opacity = 0;
        imagen4.style.opacity = 0;

        textoMasAmigos[0].style.opacity = 0;
        textoMasAmigos[1].style.opacity = 0;
        textoMasAmigos[2].style.opacity = 0;
        textoMasAmigos[3].style.opacity = 0;

        if (scroll < seccionMasAmigosPosy) {
            imagenesMasAmigos.style.transform = ``;
            //tituloMasAmigos.style.transform = ``;
            imagen1.style.opacity = 1;

            textoMasAmigos[0].style.opacity = 1;
        } else if (scroll >= seccionMasAmigosPosy && scroll < seccionMasAmigosPosy + 416) {
            imagenesMasAmigos.style.transform = `translateY(${scroll - seccionMasAmigosPosy}px)`;
            //tituloMasAmigos.style.transform = `translateY(${scroll - seccionMasAmigosPosy}px)`;
            imagen1.style.opacity = 1;
            imagen2.style.opacity = Math.sin(((scroll - seccionMasAmigosPosy) / 416) * (Math.PI / 2));

            textoMasAmigos[0].style.opacity = 1 - Math.sin(((scroll - seccionMasAmigosPosy) / 416) * (Math.PI / 2));
            textoMasAmigos[1].style.opacity = Math.sin(((scroll - seccionMasAmigosPosy) / 416) * (Math.PI / 2));
        } else if (scroll >= seccionMasAmigosPosy + 416 && scroll < seccionMasAmigosPosy + 850) {
            imagenesMasAmigos.style.transform = `translateY(${scroll - seccionMasAmigosPosy}px)`;
            //tituloMasAmigos.style.transform = `translateY(${scroll - seccionMasAmigosPosy}px)`;
            imagen2.style.opacity = 1;
            imagen3.style.opacity = Math.sin(((scroll - (seccionMasAmigosPosy + 416)) / 434) * (Math.PI / 2));

            textoMasAmigos[1].style.opacity = 1 - Math.sin(((scroll - (seccionMasAmigosPosy + 416)) / 434) * (Math.PI / 2));
            textoMasAmigos[2].style.opacity = Math.sin(((scroll - (seccionMasAmigosPosy + 416)) / 434) * (Math.PI / 2));
        } else if (scroll >= seccionMasAmigosPosy + 850 && scroll < seccionMasAmigosPosy + 1375) {
            imagenesMasAmigos.style.transform = `translateY(${scroll - seccionMasAmigosPosy}px)`;
            //tituloMasAmigos.style.transform = `translateY(${scroll - seccionMasAmigosPosy}px)`;
            imagen3.style.opacity = 1;
            imagen4.style.opacity = Math.sin(((scroll - (seccionMasAmigosPosy + 850)) / 525) * (Math.PI / 2));

            textoMasAmigos[2].style.opacity = 1 - Math.sin(((scroll - (seccionMasAmigosPosy + 850)) / 525) * (Math.PI / 2));
            textoMasAmigos[3].style.opacity = Math.sin(((scroll - (seccionMasAmigosPosy + 850)) / 525) * (Math.PI / 2));
        } else {
            imagenesMasAmigos.style.transform = `translateY(${1375}px)`;
            //tituloMasAmigos.style.transform = `translateY(${1375}px)`;
            imagen4.style.opacity = 1;
            
            textoMasAmigos[3].style.opacity = 1;
        }
    }
})