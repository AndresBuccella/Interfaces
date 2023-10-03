document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector("#menu-button");
    menu.addEventListener("click", desplegar_menu_categorias);


    const body = document.querySelector(".desplegable");

    function desplegar_menu_categorias() {
        let toggleMenu = document.getElementById("menu-categorias");
        toggleMenu.classList.toggle("mostrar-menu-categorias");
        if (body) {
            body.classList.toggle("menu-abierto");
            body.classList.toggle("menu-cerrado");
        }
    }
})