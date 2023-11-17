document.addEventListener("DOMContentLoaded", function () {

    let fondo = document.querySelector('#seccion-about-spiders-fondo');
    let fondoColor = document.querySelector('#seccion-about-spiders-fondo-color');
    let gwen = document.querySelector('#gwen-seccion-about');
    let peter = document.querySelector('#peter-seccion-about');
    let miles = document.querySelector('#miles-seccion-about');

    function reset(){
        gwen.style.top = '171px';
        gwen.style.left = '90px';
        gwen.style.width = '268px';
        gwen.style.height = '417px';
        gwen.style.filter = '';

        peter.style.top = '180px';
        peter.style.left = '293px';
        peter.style.width = '417px';
        peter.style.height = '458px';
        peter.style.filter = '';

        miles.style.top = '180px';
        miles.style.right = '88px';
        miles.style.width = '314px';
        miles.style.height = '399px';
        miles.style.filter = '';

        fondoColor.src = '';
        fondoColor.style.opacity = '0';
        fondo.src = '../images/seccion-about-spiders.png';
        fondo.style.zIndex = '-1';
    }
    gwen.addEventListener('mouseenter', function () {
        gwen.style.top = '114px';
        gwen.style.left = '80px';
        gwen.style.width = '395px';
        gwen.style.height = '614px';

        peter.style.top = '244px';
        peter.style.left = '472px';
        peter.style.width = '323px';
        peter.style.height = '354px';
        peter.style.filter = 'blur(5px)';

        miles.style.top = '244px';
        miles.style.right = '68px';
        miles.style.width = '243px';
        miles.style.height = '309px';
        miles.style.filter = 'blur(5px)';

        fondoColor.src = '../images/fondo-gwen-about.png';
        fondoColor.style.opacity = 1;
        fondoColor.style.zIndex = 2;
        fondo.style.zIndex = 1;
    })

    peter.addEventListener('mouseenter', function () {
        peter.style.top = '116px';
        peter.style.left = '184px';
        peter.style.width = '616px';
        peter.style.height = '677px';

        gwen.style.top = '296px';
        gwen.style.left = '74px';
        gwen.style.width = '220px';
        gwen.style.height = '342px';
        gwen.style.filter = 'blur(5px)';

        miles.style.top = '244px';
        miles.style.right = '62px';
        miles.style.width = '257px';
        miles.style.height = '327px';
        miles.style.filter = 'blur(5px)';

        fondoColor.src = '../images/fondo-peter-about.png';
        fondoColor.style.opacity = 1;
        fondoColor.style.zIndex = 2;
        fondo.style.zIndex = 1;
    })

    miles.addEventListener('mouseenter', function () {
        miles.style.top = '63px';
        miles.style.right = '-11px';
        miles.style.width = '497px';
        miles.style.height = '632px';

        gwen.style.top = '244px';
        gwen.style.left = '152px';
        gwen.style.width = '227px';
        gwen.style.height = '352px';
        gwen.style.filter = 'blur(5px)';

        peter.style.top = '252px';
        peter.style.left = '324px';
        peter.style.width = '352px';
        peter.style.height = '387px';
        peter.style.filter = 'blur(5px)';

        fondoColor.src = '../images/fondo-miles-about.png';
        fondoColor.style.opacity = 1;
        fondoColor.style.zIndex = 2;
        fondo.style.zIndex = 1;
    })

    gwen.addEventListener('mouseleave', () => {
        reset();
    })
    peter.addEventListener('mouseleave', () => {
        reset();
    })
    miles.addEventListener('mouseleave', () => {
        reset();
    })

    gwen.addEventListener('click', () => {
        
    })
})