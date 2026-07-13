let puntos=0;
let jugadores;
modo=JSON.parse(localStorage.getItem("modo"))
let filtro=JSON.parse(localStorage.getItem("filtro"))


function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cargarJugadores() {
    jugadores = await llamadoJugadores(filtro);
}

function select_estadistica(modo){
    const estadisticas = ["ritmo", "tiro", "pase", "regate", "defensa", "fisico"];
    
    if (modo === null) {
        return estadisticas[Math.floor(Math.random() * estadisticas.length)];
    }
    
    return modo;
}

async function guardarPuntaje(){
    await fetch('http://localhost:4000/puntaje',{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({puntaje:puntos,fecha:new Date().toISOString().split('T')[0],id_usuario:user.id_usuario}) //JSON.stringify convierte de objeto a JSON
        })
    window.location.href = "menu.html";
}

function final(){
    let elementos = document.getElementsByClassName("player-card");
    for (let carta of elementos){
        carta.style.display="none"
    }
    document.getElementById("txt-msj").style.display="none"
    document.getElementById("resultado-panel").hidden = false;
    document.getElementById("puntaje-txt").innerHTML=puntos
}

async function juego(){
    let primero=true
    let perder=false
    let jugador1;
    let jugador2;
    function comparar(jug){
    let ganador;
    if (jugador1[0][jugador1[1]]>jugador2[0][jugador2[1]]){
        ganador=1
    }else if (jugador1[0][jugador1[1]]<jugador2[0][jugador2[1]]){
        ganador=2
    }else{
        return true
    }

    return ganador===jug
}

    function esperarEleccion() {
        return new Promise((resolve) => {
            const btnJug1 = document.getElementById("btn-jugador1");
            const btnJug2 = document.getElementById("btn-jugador2");


            function elegirJug1() {
                limpiarListeners();
                resolve(1); 
            }
            function elegirJug2() {
                limpiarListeners();
                resolve(2);
            }
            function limpiarListeners() {
                btnJug1.removeEventListener("click", elegirJug1);
                btnJug2.removeEventListener("click", elegirJug2);
            }

            btnJug1.addEventListener("click", elegirJug1);
            btnJug2.addEventListener("click", elegirJug2);
        });
    }


    while (!perder){
        await cargarJugadores();
        for (let i=1;i<jugadores.length;i++){
            if (primero){
                jugador1=[jugadores[0],select_estadistica(modo)];
            }else{
                jugador1=jugador2
            }
            jugador2=[jugadores[i],select_estadistica(modo)];
            agregarImagenes(jugador1,jugador2)
            if (!primero){
                document.getElementById("stat1").innerHTML += `: ${jugador1[0][jugador1[1]]}`;
            }
            /* para mostrar en consola los valores asi ganar facil
            console.clear()
            console.log("jug1:")
            console.log(jugador1[0].nombre)
            console.log(`${jugador1[1]}: ${jugador1[0][jugador1[1]]}`)
            console.log("jug2:")
            console.log(jugador2[0].nombre)
            console.log(`${jugador2[1]}: ${jugador2[0][jugador2[1]]}`)*/

            const eleccion = await esperarEleccion();

            const correcto = comparar(eleccion);
            if (primero){
                document.getElementById("stat1").innerHTML += `: ${jugador1[0][jugador1[1]]}`;
            }
            document.getElementById("stat2").innerHTML += `: ${jugador2[0][jugador2[1]]}`;
            if (!correcto) {
                perder = true;
                document.getElementById("txt-msj").innerHTML = "¡Perdiste en esta comparación!";
                await esperar(3000);
                break
            }
            document.getElementById("txt-msj").innerHTML="bien hecho";
            puntos+=1
            await esperar(2000)
            document.getElementById("txt-msj").innerHTML="";
            primero=false
        }
    }
    await esperar(3000)
    final()
}

juego()
