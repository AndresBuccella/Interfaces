let scrollPosition;
getScrollPosition();
function getScrollPosition() {
    return window.scrollY || window.pageYOffset;
}

window.addEventListener('scroll', function () {
    scrollPosition = getScrollPosition();
    console.log('Posición de scroll:', scrollPosition);
    nav(scrollPosition);
});


//Navegador
let navTitle = document.querySelector("#titulo");
nav(scrollPosition);
function nav(scroll) {
    if (scroll==0) {
        navTitle.style.position="";
        navTitle.style.transform = ``
    }
    else if (scroll > 0 && scroll < 200) {
        navTitle.style.position="fixed";
        navTitle.style.transform = `translateY(${-210 * scroll / 200}px) scale(+${1 - 0.7 * scroll / 200})`
    }else if (scroll>200){
        navTitle.style.position="fixed";
        navTitle.style.transform = `translateY(${-210}px) scale(+${0.3})`
    }
}

//Pesonajes 1
