async function llamadoJugadores(filtro){
    let response;
    if (filtro==undefined){


        response = await fetch('http://localhost:4000/jugadores',{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })
    }else{

        response = await fetch(`http://localhost:4000/jugadores? ${filtro}`,{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })}
    let result = await response.json();
    return result
}