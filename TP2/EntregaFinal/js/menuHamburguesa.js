document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector("#menu-button");
    menu.addEventListener("click", si);


    const body = document.querySelector("#index-body");

    function si() {
        let toggleMenu = document.getElementById("menu-categorias");
        toggleMenu.classList.toggle("mostrar-menu-categorias");
        body.classList.toggle("menu-abierto");
        body.classList.toggle("menu-cerrado");
    }

})