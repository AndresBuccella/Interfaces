let mh = document.querySelector("#menu");
let selectMenu = false;
let menuHamburguesa = document.querySelector("#nav-hamburguesa");

mh.addEventListener("click", anim);
function anim() {
    mhDivList = mh.querySelectorAll("div");
    selectMenu = !selectMenu;

    if (selectMenu) {
        mhDivList[0].style.transform = "rotate(45deg) translate(7px, 9px)";
        mhDivList[3].style.transform = "rotate(45deg) translate(7px, 9px)";
        mhDivList[1].style.width = "0px";
        mhDivList[1].style.opacity = "0";
        mhDivList[2].style.transform = "rotate(-45deg) translate(8px, -10px)";
        menuHamburguesa.querySelectorAll("div").forEach((div, i) => {
            let aux = setTimeout(() => {
                div.classList.toggle('menu-hamburguesa-aparecer')
                clearTimeout(aux);
            }, i * 50)
        })
    } else {
        mhDivList[0].style.transform = "";
        mhDivList[3].style.transform = "";
        mhDivList[1].style.width = "34px";
        mhDivList[1].style.opacity = "1";
        mhDivList[2].style.transform = "";
        menuHamburguesa.querySelectorAll("div").forEach((div, i) => {
            let aux = setTimeout(() => {
                div.classList.toggle('menu-hamburguesa-aparecer')
                clearTimeout(aux);
            }, (6 - i) * 50)
        })
    }
}
