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
        scrollVarTitle = 300 * (navTitle.height / 301); //por que esta cuenta?
        scroll(getScrollPosition());
    });

    function scroll(scroll) {
        nav(scroll);
        edificios(scroll);
        moverDuendeVerde(scroll);
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
    let divHeroes = document.querySelector("#primera-parte");
    let peter = divHeroes.querySelector("#spider-rojo");
    let peterSpiderWeb = divHeroes.querySelector("#tela-arania-izquierda");
    let gwen = divHeroes.querySelector("#spider-blanco");
    let miles = divHeroes.querySelector("#spider-negro");
    let milesSpiderWeb = divHeroes.querySelector("#tela-arania-derecha");

    divHeroes.addEventListener("mousemove", function mover(e) {
                                                                                            //Aiura
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
        peter.style.transform = `translate(calc(-50% + ${offset1.x}px), ${offset1.y}px)`;
        peterSpiderWeb.style.transform = `translate(${offset1.x}px, ${offset1.y}px)`;

        miles.style.transform = `translate( ${offset2.x}px, ${offset2.y}px)`;
        milesSpiderWeb.style.transform = `translate(${offset2.x}px, ${offset2.y}px)`;

        gwen.style.transform = `translate( ${offset3.x}px, ${offset3.y}px)`;
    })

    //Segunda parte

    function moverDuendeVerde(scroll) {
        let duendeVerde = document.querySelector("#duende-verde");
        if (scroll > 800 && scroll < 1600) {
            duendeVerde.style.transform = `translateY(${(scroll - 800) / 30}px) scaleX(-1)`;
            console.log("duende");
        } else {
            duendeVerde.style.transform = `translateY(${(1600 - 800) / 30}) scaleX(-1)`;
        }
        /* if (scroll > 150 && scroll < 1600) {
            duendeVerde.style.transform = `translateY(${(scroll - 150) / 30}px) scaleX(-1)`;
            console.log("duende");
        } else {
            duendeVerde.style.transform = `translateY(${(1600 - 150) / 30}) scaleX(-1)`;
        } */
    }

})