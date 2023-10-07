document.addEventListener("DOMContentLoaded", function () {

    //Cambio entre registro y login
    document.querySelector("#a-iniciar-sesion").addEventListener("click", cambiarLoginReg);
    document.querySelector("#a-registrarse").addEventListener("click", cambiarLoginReg);

    function cambiarLoginReg() {
        document.querySelector("#formulario-registro").classList.toggle("none");
        document.querySelector("#formulario-iniciar-sesion").classList.toggle("none");
    }


    //---------------------CAOS

    //Validacion de registro
    let btn_registro = document.querySelector("#registrarse"); //Boton de registro
    let status; //Variable resultado de validacion
    btn_registro.addEventListener("click", validar_registro); //El boton chequea que se cumplan los campos

    //Validacion individual de los campos del registro
    let form_regist = document.querySelector("#formulario-registro");
    form_regist.querySelector("#user-name").addEventListener("input", function () { form_validate("user-name"); });
    form_regist.querySelector("#nombre").addEventListener("input", function () { form_validate("nombre"); });
    form_regist.querySelector("#apellido").addEventListener("input", function () { form_validate("apellido"); });
    form_regist.querySelector("#edad").addEventListener("input", function () { form_validate("edad"); });
    form_regist.querySelector("#correo").addEventListener("input", function () { form_validate("correo"); });
    form_regist.querySelector("#contraseña").addEventListener("input", validate_password);
    form_regist.querySelector("#rep-contraseña").addEventListener("input", confirm_password);
    form_regist.querySelector("#captcha").addEventListener("input", function () { form_validate_checkbox("captcha"); });
    form_regist.querySelector("#terminos").addEventListener("input", function () { form_validate_checkbox("terminos"); });

    const loader = document.querySelectorAll('.btn-registrarse .loader')[1]; //Loader del registro solo

    //Resultado cuando la animacion del loader termina
    loader.addEventListener('animationend', (event) => {
        btn_registro.classList.remove("cheking");
        if (status) {
            btn_registro.classList.add("registro-ok");
            btn_registro.addEventListener('animationend', (event) => {
                window.location.href = "../index.html"; //Si el resultado de la validacion de ok te envia al index al terminar la animacion del boton registro
            });
        }
        else btn_registro.classList.add("registro-not-ok");
    });

    //Funcion de validacion del boton de registro
    function validar_registro() {
        btn_registro.classList.remove("cheking");
        btn_registro.classList.remove("registro-ok");
        btn_registro.classList.remove("registro-not-ok");
        loader.style.display = 'block';
        btn_registro.classList.add("cheking");

        status = true;
        if (!form_validate("user-name")) status = false;
        if (!form_validate("nombre")) status = false;
        if (!form_validate("apellido")) status = false;
        if (!form_validate("edad")) status = false;
        if (!form_validate("correo")) status = false;
        if (!form_validate_checkbox("captcha")) status = false;
        if (!form_validate_checkbox("terminos")) status = false;
        if (!validate_password()) status = false;
        if (!confirm_password()) status = false;
    }

    //Funcion de campo con datos
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
    function form_validate_checkbox(id) {
        let input = document.querySelector("#" + id);
        let status = input.checked;
        if (status) {
            input.style.boxShadow = " inset 0 0 4px var(--n-notificacion-color-ok)";
        } else input.style.boxShadow = "inset 0 0 4px var(--n-notificacion-color-not-ok)";
        return status
    }

    //Mensaje de error
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

        if (contraceña.value == "") errors_status.push(0); else errors_status.push(1);                                          //Falta completar el campo
        if (contraceña.value.length > 6) errors_status.push(1); else errors_status.push(0);                                      //La contraseña debe tener mas de 6 caracteres
        if (/\d/.test(contraceña.value)) errors_status.push(1); else errors_status.push(0);                                     //Debe contener por lo menos 1 numero
        if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/.test(contraceña.value)) errors_status.push(1); else errors_status.push(0);        //Debe contener por lo menos 1 simbolo especial

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

    function confirm_password() {
        let contraceña = document.querySelector("#contraseña");
        let contraceña_rep = document.querySelector("#rep-contraseña");

        let status = true;
        if (contraceña_rep.value != contraceña.value || contraceña_rep.value == "") {
            status = false;
            contraceña_rep.classList.add("form-error-input");
            let lasterror = contraceña_rep.parentNode.querySelector(".form-error");
            if (lasterror) lasterror.remove();
            let divTemporal = document.createElement('div');
            divTemporal.innerHTML = form_error_message(["Las contraseñas no coinciden o el campo esta vacio"], [0]);
            contraceña_rep.parentNode.appendChild(divTemporal.querySelector(".form-error"));
        } else reset_form_status(contraceña_rep);
        return status
    }
})