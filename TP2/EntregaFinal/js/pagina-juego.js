document.addEventListener("DOMContentLoaded", function () {

    // Estrellas
    const estrellas = document.querySelectorAll('.estrellas .estrella');

    for (let i = 0; i < estrellas.length; i++) {
        estrellas[i].addEventListener('click', () => {
            let estrellas_activas = document.querySelectorAll('.estrella-activa').length;
            for (let j = 0; j < estrellas.length; j++) {
                estrellas[j].classList.remove('estrella-activa');
            }
            if (estrellas_activas != i+1) {
                for (let j = 0; j <= i; j++) {
                    estrellas[j].classList.add('estrella-activa');
                }
            }

        });
    }

})