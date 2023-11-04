document.addEventListener("DOMContentLoaded", function () {
    const numeroElemento = document.getElementById('loading-contador');
    const loading = document.getElementById('loading');
    let numero = 0;

    function contar() {
        if (numero < 100) {
            numero++;
            numeroElemento.textContent = numero + "%";
        } else if (numero == 100) {
            clearInterval(interval);
            loading.classList.add("loading-close");
        }
    }
    loading.addEventListener("animationend", function () {
        loading.remove();
    })
    interval = setInterval(contar, 5000 / 100);
});