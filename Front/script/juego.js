let puntaje=0;
let jugadores;
let modo;
async function cargarJugadores() {
    jugadores = await llamadoJugadores();
}

function select_estadistica(){
    const estadisticas = ["ritmo", "tiro", "pase", "regate", "defensa", "físico"];
    
    if (modo === undefined) {
        return estadisticas[Math.floor(Math.random() * estadisticas.length)];
    }
    
    return modo;
}


/*function esperarBoton() {
    return new Promise(resolve => {
        
        }, { once: true });
    });
}*/

async function juego(){

    

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
    await cargarJugadores();
    console.log(jugadores)
    while (!perder){

        for (let i=1;i<jugadores.length;i++){
            if (i==1){
                jugador1=[jugadores[0],select_estadistica()];
            }else{
                jugador1=jugador2
            }
            jugador2=[jugadores[i],select_estadistica()];
            agregarImagenes(jugador1[0].url_foto,jugador2[0].url_foto,jugador1[0].nombre,jugador2[0].nombre)

            console.log("jug1:")
            console.log(jugador1[0].nombre)
            console.log(jugador1[1])
            console.log("jug2:")
            console.log(jugador2[0].nombre)
            console.log(jugador2[1])   
        }
        perder=true
    }
}

juego()
