document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector("#menu-button");
    menu.addEventListener("click", si);

    function si() {
        let toggleMenu = document.getElementById("menu-categorias");
        toggleMenu.classList.toggle("mostrar-menu-categorias");
    }

})