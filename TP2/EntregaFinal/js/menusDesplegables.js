document.addEventListener("DOMContentLoaded", function () {

    //Menu categorias
    const menu_categorias = document.querySelector("#menu-button");
    menu_categorias.addEventListener("click", desplegar_menu_categorias);


    const body = document.querySelector(".desplegable");

    function desplegar_menu_categorias() {
        let toggleMenu = document.getElementById("menu-categorias");
        toggleMenu.classList.toggle("mostrar-menu-categorias");
        if (body) {
            body.classList.toggle("menu-abierto");
            body.classList.toggle("menu-cerrado");
        }
    }

    //Menu carrito de compra
    const menu_carrito = document.querySelector("#icon-carrito");
    const toggleMenu_carrito = document.getElementById("menu-carrito");
    menu_carrito.addEventListener("click", desplegar_menu_carrito);



    function desplegar_menu_carrito() {
        toggleMenu_carrito.classList.toggle("mostrar-menu-carrito");
        toggleMenu_perfil.classList.remove("mostrar-menu-carrito");

    }

    //Menu Perfil de usuario
    const menu_perfil = document.querySelector("#icon-user");
    const toggleMenu_perfil = document.getElementById("menu-perfil");
    menu_perfil.addEventListener("click", desplegar_menu_perfil);



    function desplegar_menu_perfil() {
        toggleMenu_perfil.classList.toggle("mostrar-menu-carrito");
        toggleMenu_carrito.classList.remove("mostrar-menu-carrito");
    }
})