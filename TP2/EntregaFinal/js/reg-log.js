document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#a-iniciar-sesion").addEventListener("click", cambiarLoginReg);
    document.querySelector("#a-registrarse").addEventListener("click", cambiarLoginReg);

    function cambiarLoginReg() {
        document.querySelector("#formulario-registro").classList.toggle("none");
        document.querySelector("#formulario-iniciar-sesion").classList.toggle("none");
    }

})