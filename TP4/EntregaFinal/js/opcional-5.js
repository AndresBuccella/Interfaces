document.addEventListener("DOMContentLoaded", function () {

    let fondo = document.querySelector('#seccion-about-spiders-fondo');
    let fondoColor = document.querySelector('#seccion-about-spiders-fondo-color');
    let popup = document.querySelector('#pop-up');
    let btnCruz = document.querySelector('#btn-cruz');

    let gwen = document.querySelector('#gwen-seccion-about');
    let peter = document.querySelector('#peter-seccion-about');
    let miles = document.querySelector('#miles-seccion-about');

    let onPopUp = false;
    let imgHeroe = document.querySelector('#img-heroe');
    let txtDiv = document.querySelector('#texto-about-spiders');


    function reset() {
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
        fondo.src = 'images/seccion-about-spiders.png';
        fondo.style.zIndex = '-1';
        //popup.style.opacity = 0;
        popup.style.height= "0px";
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

        fondoColor.src = 'images/fondo-gwen-about.png';
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

        fondoColor.src = 'images/fondo-peter-about.png';
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

        fondoColor.src = 'images/fondo-miles-about.png';
        fondoColor.style.opacity = 1;
        fondoColor.style.zIndex = 2;
        fondo.style.zIndex = 1;
    })

    function leaveHero() {
        if (!onPopUp) {
            reset();
        }
    }

    gwen.addEventListener('mouseleave', () => {
        leaveHero();
    })
    peter.addEventListener('mouseleave', () => {
        leaveHero();
    })
    miles.addEventListener('mouseleave', () => {
        leaveHero();
    })

    btnCruz.addEventListener('click', () => {
        onPopUp = false;
        reset();
    })

    function loadPeter() {
        imgHeroe.src = 'images/peter-parker.png';
        txtDiv.innerHTML = `
        <h1>Peter Parker</h1>
        <p>también conocido como Spider-Man, es un personaje de
            ficción de Marvel Comics.
            Los poderes de Spider-Man son el resultado de una picadura
            de araña radiactiva
            que le otorgó habilidades especiales. Sus poderes incluyen:
        </p>
        <ol>
            <li>Agilidad sobrehumana: Spider-Man tiene una agilidad
                extraordinaria que le permite
                moverse de manera rápida y ágil, saltar grandes
                distancias y realizar acrobacias asombrosas.</li>
            <li>Fuerza sobrehumana: Aunque no es tan fuerte como algunos
                de los superhéroes más
                poderosos de Marvel, Spider-Man tiene una fuerza
                considerable que le permite levantar
                objetos pesados y enfrentarse a enemigos formidables.</li>
            <li>Sentido arácnido: Spider-Man tiene un sentido arácnido
                que le permite detectar el peligro antes de que ocurra.
                Puede reaccionar instintivamente a las amenazas, lo que
                lo hace extremadamente difícil de sorprender.</li>
            <li>Trepar paredes: Spider-Man puede adherirse a las paredes
                y techos, lo que le permite moverse de manera vertical y
                colgarse boca abajo.</li>
            <li>Disparadores de telaraña: Peter Parker ha creado
                lanzadores de telarañas especiales que le permiten
                disparar y controlar telarañas. Utiliza estas telarañas
                para balancearse entre edificios, atrapar a los villanos
                y crear redes para inmovilizar a los oponentes.</li>
        </ol>
        <p>Estos son los poderes principales de Spider-Man en los
            cómics y en varias adaptaciones cinematográficas y
            televisivas. Cabe destacar que a lo largo de la historia de
            los cómics, Spider-Man ha adquirido o perdido temporalmente
            otros poderes y habilidades debido a diferentes tramas y
            eventos.t</p>`
    }
    function loadGwen() {
        imgHeroe.src = 'images/gwen-stacy.png';
        txtDiv.innerHTML = `
        <h1>Gwen Stacy</h1>
        <p>también conocida como Spider-Woman o Spider-Gwen, es un personaje de cómic de Marvel Comics que proviene de una realidad alternativa en el multiverso de Spider-Man. Sus poderes son en gran medida similares a los de otros Spider-Personajes, pero Gwen tiene algunas variaciones específicas. Los poderes de Spider-Gwen incluyen:
        </p>
        <ol>
            <li>Agilidad sobrehumana: Gwen Stacy posee una agilidad extraordinaria que le permite moverse de manera rápida y realizar acrobacias impresionantes.</li>
            <li>Fuerza sobrehumana: Al igual que otros Spider-Personajes, Gwen tiene una fuerza considerable que le permite levantar objetos pesados y luchar contra enemigos formidables.</li>
            <li>Sentido arácnido: Spider-Gwen también posee el sentido arácnido, que le permite detectar el peligro antes de que ocurra, similar a Peter Parker y otros Spider-Men.</li>
            <li>Trepar paredes: Al igual que otros Spider-Personajes, Gwen Stacy puede adherirse a las paredes y techos, lo que le permite moverse de manera vertical y colgarse boca abajo.</li>
            <li>Disparadores de telaraña: Spider-Gwen utiliza lanzadores de telarañas para balancearse entre edificios, atrapar a los villanos y crear redes para inmovilizar a los oponentes.</li>
        </ol>
        <p>En resumen, Spider-Gwen posee habilidades arácnidas similares a las de otros personajes de Spider-Man, pero su traje y su identidad están diseñados de manera diferente, y proviene de una realidad alternativa donde Gwen Stacy adquiere los poderes de Spider-Man en lugar de Peter Parker. El personaje ha ganado popularidad en los cómics y se ha convertido en un ícono por derecho propio.</p>`
    }
    function loadMiles() {
        imgHeroe.src = 'images/miles-morales.png';
        txtDiv.innerHTML = `
        <h1>Miles Morales</h1>
        <p>Sus poderes son en gran medida similares a los de Peter Parker, el Spider-Man original, pero Miles tiene algunas diferencias notables. Los poderes de Miles Morales incluyen:
        </p>
        <ol>
            <li>Agilidad sobrehumana: Miles posee una agilidad extraordinaria que le permite moverse de manera rápida y realizar acrobacias impresionantes, al igual que Peter Parker.</li>
            <li>Sentido arácnido: Al igual que Peter Parker, Miles Morales tiene un sentido arácnido que le permite detectar el peligro antes de que ocurra. Esto le proporciona una ventaja en la lucha contra los criminales.</li>
            <li>Trepar paredes: Miles puede adherirse a las paredes y techos, lo que le permite moverse de manera vertical y colgarse boca abajo, al igual que otros Spider-Men.</li>
            <li>Camuflaje arácnido: Una de las características distintivas de Miles Morales es su habilidad de camuflaje arácnido. Puede volverse completamente invisible para el ojo humano durante un corto período de tiempo. Esta habilidad le proporciona una ventaja estratégica en situaciones de combate y sigilo.</li>
            <li>Descarga venenosa: En algunas versiones de los cómics y adaptaciones, Miles Morales también puede liberar una "descarga venenosa" que es una forma de energía bioeléctrica. Esta habilidad puede usarse en combate o para desactivar dispositivos electrónicos.</li>
        </ol>
        <p>Estos son los poderes principales de Miles Morales en los cómics y en las adaptaciones cinematográficas y de videojuegos. El personaje de Miles Morales ha ganado popularidad y es conocido por su origen diverso y sus habilidades únicas en el universo de Spider-Man.</p>`
    }
    function showPopUp() {
        onPopUp = true;
        popup.style.height= "832px";
    }
    
    gwen.addEventListener('click', () => {
        reset();
        loadGwen();
        showPopUp();
    })
    peter.addEventListener('click', () => {
        reset();
        loadPeter();
        showPopUp();
    })
    miles.addEventListener('click', () => {
        reset();
        loadMiles();
        showPopUp();
    })
})