document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector("#icon-carrito");
    menu.addEventListener("click", desplegar_menu_carrito);



    function desplegar_menu_carrito() {
        let toggleMenu = document.getElementById("menu-carrito");
        toggleMenu.classList.toggle("mostrar-menu-carrito");
    }
})