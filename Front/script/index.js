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

async function id_pais() {
    const response = await fetch('http://localhost:4000/id_pais',{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })

    let result = await response.json();
    return result
}



async function login(mail,contraseña){

    const usuarios= await llamadoUsuarios();
    console.log(usuarios)
    for (let usuario of usuarios){
        if (usuario.contrasena==contraseña && usuario.mail==mail){
            return true
        }
    }
    return false
}

async function handleLogin(){
    const mail=getMail()
    const contrasena=getContraseña()

    if(await login(mail,contrasena)){
        window.location.href = "menu.html";
        return
    }
}

async function register(datos){


    const response = await fetch('http://localhost:4000/usuarios',{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
        })
        if(await login(datos.mail,datos.contrasena)){
        window.location.href = "menu.html";
        return
    }
}

async function handleRegister() {
    const u_mail=getMail();
    const u_contraseña=getContraseña();
    const u_nombre=getNombre();

    console.log(u_mail,u_contraseña,u_nombre)
    if (u_mail=="" || u_contraseña=="" || u_nombre==""){
        alert("Rellene todos los campos")
        return
    }
    const datos={
            mail:u_mail,
            contrasena:u_contraseña,
            nombre_usuario:u_nombre
        };
    register(datos)
}

async function agregarFutbolista() {
  let datos = {
    url_foto:add_imagen(),
    nombre:add_nombre(),
    liga:  add_liga(),
    id_liga: await add_id_liga(),
    id_pais:await add_id_pais(),
    pais: add_pais(),
    posicion:add_posicion(),
    estatura:  add_estatura(),
    peso:      add_peso(),
    overall:   add_overall(),
    ritmo:     add_ritmo(),
    tiro:      add_tiro(),
    pase:      add_pase(),
    defensa:   add_defensa(),
    regate:    add_regate(),
    fisico:    add_fisico()
  };
  console.log(datos)
  envioPost(datos);
}

async function envioPost(datos) {
  await fetch(
    'http://localhost:4000/jugadores', {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(datos)
  });
}




