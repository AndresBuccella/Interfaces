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

window.addEventListener('resize', function () {
    navWidth = navTitle.width;
    scrollVarTitle = 300 * ( navTitle.height/301);
    nav(scrollPosition);
    getScrollPosition();
});


//Navegador
let navTitle = document.querySelector("#titulo");
let navWidth = navTitle.width;
let scrollVarTitle = 300 * (navTitle.height/301);

nav(scrollPosition);
function nav(scroll) {
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

//Pesonajes 1
//583->175