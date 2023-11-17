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
        let escala = window.innerHeight / 6;
        //Creo que le indicas la parte de la pantalla en la que querés que se muestre al 100%. Si no me expliqué mañana sale discord
        //No desaparece por completo, por ahí es mejor dejarlo a math.pi solo
        let posPersonajes = cajaPersonajes.getBoundingClientRect().top + scroll - window.innerHeight + navegador.getBoundingClientRect().height + escala;
        /* console.log("height: " + navegador.style.height);
        console.log("alto: " + heightPersonajes);
        console.log("pos: " + posPersonajes); */
        let peter = document.querySelector("#peter-segunda-seccion");
        let miles = document.querySelector("#miles-segunda-seccion");
        let gwen = document.querySelector("#gwen-segunda-seccion");

        if (scroll > posPersonajes && scroll <= posPersonajes + heightPersonajes) {
            let calculoAuxiliar = Math.sin(((scroll - posPersonajes) / 2 / heightPersonajes) * Math.PI);
            peter.style.opacity = calculoAuxiliar;
            miles.style.opacity = calculoAuxiliar;
            gwen.style.opacity = calculoAuxiliar;
        } else if (scroll > posPersonajes + (heightPersonajes / 2)) {
            //let calculoAuxiliar = Math.sin(((scroll - (posPersonajes + (heightPersonajes / 2))) / (heightPersonajes / 2)) * (Math.PI / 2) + Math.PI / 2);
            peter.style.opacity = 1;
            miles.style.opacity = 1;
            gwen.style.opacity = 1;
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


    function masAmigos(scroll) {
        //imagen 1 = 4036
        //imagen 2 = 4466
        //imagen 3 = 4900
        //imagen 4 = 5400
        
        
        let cajaImagenesMasAmigos = document.querySelector("#seccion-mas-amigos-imagenes");
        let heightImagenes = cajaImagenesMasAmigos.getBoundingClientRect().height;
        let escala = window.innerHeight / 6;

        let posPersonajes = cajaPersonajes.getBoundingClientRect().top + scroll - window.innerHeight + navegador.getBoundingClientRect().height;
        /* console.log("height: " + navegador.style.height);
        console.log("alto: " + heightPersonajes);
        console.log("pos: " + posPersonajes); */
        let peter = document.querySelector("#peter-segunda-seccion");
        let miles = document.querySelector("#miles-segunda-seccion");
        let gwen = document.querySelector("#gwen-segunda-seccion");

        if (scroll > posPersonajes && scroll <= posPersonajes + heightPersonajes) {
            let calculoAuxiliar = Math.sin(((scroll - posPersonajes) / 2 / heightPersonajes) * Math.PI);
            peter.style.opacity = calculoAuxiliar;
            miles.style.opacity = calculoAuxiliar;
            gwen.style.opacity = calculoAuxiliar;
        } else if (scroll > posPersonajes + (heightPersonajes / 2)) {
            //let calculoAuxiliar = Math.sin(((scroll - (posPersonajes + (heightPersonajes / 2))) / (heightPersonajes / 2)) * (Math.PI / 2) + Math.PI / 2);
            peter.style.opacity = 1;
            miles.style.opacity = 1;
            gwen.style.opacity = 1;
        }
    }
})