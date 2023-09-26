document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector(".menu-hamburguesa");
    menu.addEventListener("click", si);

    function si() {
        let toggleMenu = document.getElementById("menu-categorias");
        toggleMenu.classList.toggle("ocultar-menu-categorias");
    }





})