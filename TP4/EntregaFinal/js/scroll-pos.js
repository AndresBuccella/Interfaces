let scrollPosition = getScrollPosition();
function getScrollPosition() {
    return window.scrollY || window.pageYOffset;
}

window.addEventListener('scroll', function () {
    scrollPosition = getScrollPosition();
    console.log('Posición de scroll:', scrollPosition);
    nav(scrollPosition);
});


//Navegador
let navegador = document.querySelector("#nav");
let navTitle = document.querySelector("#titulo");
let navWidth = navTitle.width;
let scrollVarTitle = 300 * (navTitle.height / 301);

window.addEventListener('resize', function () {
    navWidth = navTitle.width;
    scrollVarTitle = 300 * (navTitle.height / 301);
    scrollPosition = getScrollPosition();
    nav(scrollPosition);
});

nav(scrollPosition);
function nav(scroll) {
    if (scroll == 0) {
        navegador.style.height = "";
        navegador.style.zIndex = "";
        navegador.style.background="";
        navTitle.style.position = "";
        navTitle.style.transform = "";
        navTitle.style.width = "";
    }
    else if (scroll > 0 && scroll <= scrollVarTitle) {
        navegador.style.height = `${227 - 124 * scroll / scrollVarTitle}px`;
        navegador.style.zIndex = "9998";
        navegador.style.background="linear-gradient(180deg, rgba(84, 153, 248,"+scroll / scrollVarTitle+") 0%, rgba(84, 153, 248,"+scroll / scrollVarTitle+") 87.91%, rgba(84, 153, 248, 0) 100%)";
        navTitle.style.position = "fixed";
        navTitle.style.transform = `translateY(${-100 * scroll / scrollVarTitle}px)`
        navTitle.style.width = `${navWidth - ((navWidth - 175) * (scroll / scrollVarTitle))}px`
    } else if (scroll > 300) {
        navegador.style.background="";
        navegador.style.height="103px"
        navTitle.style.position = "fixed";
        navTitle.style.transform = `translateY(-100px)`
        navTitle.style.width = "175px"
    }
}

let towerLeft = document.querySelector("#edificios-izquierda")
let towerCenter = document.querySelector("#edificios-centro")
let towerRight = document.querySelector("#edificios-derecha")

function edificios(scroll) {
    if (scroll == 0) {
        navTitle.style.position = "";
        navTitle.style.transform = "";
        navTitle.style.width = "";
    }
    else if (scroll > 0 && scroll <= scrollVarTitle) {
        navTitle.style.position = "fixed";
        navTitle.style.transform = `translateY(${-100 * scroll / scrollVarTitle}px)`
        navTitle.style.width = `${navWidth - ((navWidth - 175) * (scroll / scrollVarTitle))}px`
    } else if (scroll > 300) {
        navTitle.style.position = "fixed";
        navTitle.style.transform = `translateY(-100px)`
        navTitle.style.width = "175px"
    }
}