document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#a-iniciar-sesion").addEventListener("click", cambiarLoginReg);
    document.querySelector("#a-registrarse").addEventListener("click", cambiarLoginReg);

    function cambiarLoginReg() {
        document.querySelector("#formulario-registro").classList.toggle("none");
        document.querySelector("#formulario-iniciar-sesion").classList.toggle("none");
    }


    document.querySelector("#registrarse").addEventListener("click", confirmar_registro);

    let form_regist = document.querySelector("#formulario-registro");
    form_regist.querySelector("#user-name").addEventListener("input", function() {form_validate("user-name");});      
    form_regist.querySelector("#nombre").addEventListener("input", function() {form_validate("nombre");});     
    form_regist.querySelector("#apellido").addEventListener("input", function() {form_validate("apellido");});     
    form_regist.querySelector("#edad").addEventListener("input", function() {form_validate("edad");});     
    form_regist.querySelector("#correo").addEventListener("input", function() {form_validate("correo");});     
    form_regist.querySelector("#contraseña").addEventListener("input", validate_password);

    function confirmar_registro() {

        let status = true;
        if (!form_validate("user-name")) status = false;
        if (!form_validate("nombre")) status = false;
        if (!form_validate("apellido")) status = false;
        if (!form_validate("edad")) status = false;
        if (!form_validate("correo")) status = false;
        if (!validate_password()) status = false;

        if (status) window.location.href = "../index.html"
    }

    function form_validate(id) {
        let input = document.querySelector("#" + id);
        let status = true;
        if (input.value == "") {
            status = false;
            input.classList.add("form-error-input");
            let lasterror = input.parentNode.querySelector(".form-error");
            if (lasterror) lasterror.remove();
            let divTemporal = document.createElement('div');
            divTemporal.innerHTML = form_error_message(["Falta completar el campo"], [0]);
            input.parentNode.appendChild(divTemporal.querySelector(".form-error"));
        } else reset_form_status(input);
        return status
    }

    function form_error_message(errors, errors_status) {
        elem = '<div class="form-error"><img src="../images/form-error.png" alt="">'

        for (let i = 0; i < errors.length; i++) {
            elem += '<p class="' + "form-error-valid".repeat(errors_status[i]) + '">' + errors[i] + '</p>';
        }
        elem += '</div>';
        return elem
    }

    function reset_form_status(elem) {
        elem.classList.remove("form-error-input");
        let lasterror = elem.parentNode.querySelector(".form-error");
        if (lasterror) lasterror.remove();
    }

    function validate_password() {
        let contraceña = document.querySelector("#contraseña");
        let errors = ["Falta completar el campo", "La contraseña debe tener mas de 6 caracteres", "Debe contener por lo menos 1 numero", "Debe contener por lo menos 1 simbolo especial"];
        let errors_status = [];
        if (contraceña.value == "") errors_status.push(0); else errors_status.push(1);
        if (contraceña.value.length < 7) errors_status.push(0); else errors_status.push(1);
        if (/\d/.test(contraceña.value)) errors_status.push(1); else errors_status.push(0);
        if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/.test(contraceña.value)) errors_status.push(1); else errors_status.push(0);
        let status = !errors_status.includes(0);
        if (!status) {
            contraceña.classList.add("form-error-input");
            let lasterror = contraceña.parentNode.querySelector(".form-error");
            if (lasterror) lasterror.remove();
            let divTemporal = document.createElement('div');
            divTemporal.innerHTML = form_error_message(errors, errors_status);
            contraceña.parentNode.appendChild(divTemporal.querySelector(".form-error"));
        } else reset_form_status(contraceña);
        return status
    }
})