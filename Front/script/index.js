let user;
user = JSON.parse(localStorage.getItem("usuarios"));

async function llamadoUsuarios() {
    const response = await fetch('http://localhost:4000/usuarios',{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })

    let result = await response.json();
    return result
}

async function llamadoJugadores(filtro){
    let response;
    if (filtro==null){


        response = await fetch('http://localhost:4000/jugadores',{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })
    }else{

        response = await fetch(`http://localhost:4000/jugadores?categoria=${filtro[0]}&filtro=${[filtro[1]]}`,{
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
    for (let usuario of usuarios){
        if (usuario.contrasena==contraseña && usuario.mail==mail){
            localStorage.setItem("usuarios", JSON.stringify(usuario));
            return usuario
        }
    }
    return false
}

async function handleLogin(){
    const mail=getMail()
    const contrasena=getContraseña()
    usuario= await login(mail,contrasena)
    if(usuario){
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

function agregarFutbolista() {
  let datos = {
    url_foto:add_imagen(),
    nombre:add_nombre(),
    club:add_club(),
    id_club:add_id_club(),
    id_pais:add_id_pais(),
    pais:add_pais(),
    posicion:add_posicion(),

  };
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

async function selectFilter(filtro) {
    let opciones;
    document.getElementById("select-container").innerHTML = `<select class="filter-select" id="filterSelect">`;
    if (filtro == "posicion") {
        valores=[2,3,4]
        opciones = ["Defensa", "Mediocampista", "Delantero"];
        for (let i = 0; i < opciones.length; i++) {
            document.getElementById("filterSelect").innerHTML += `<option value="${valores[i]}">${opciones[i]}</option>`;
        }
    }else{
        const response = await fetch(`http://localhost:4000/filtro?categoria=${filtro}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
        });
        opciones = await response.json();
        opciones = opciones.map(opcion => opcion[filtro]);
        document.getElementById("filterSelect").innerHTML = opciones.map(opcion => `<option value="${opcion}">${opcion}</option>`).join('');
        
    } 
    document.getElementById("select-container").innerHTML +=`
	<button id="aceptarFiltro" onclick="AceptarFiltro('${filtro}')">Aceptar</button>`
}

    function AceptarFiltro(caracteristica){
        const valor=document.getElementById("filterSelect").value;
        localStorage.setItem("filtro", JSON.stringify([caracteristica,valor]));
    }
    function LimpiarFiltro(){
        localStorage.removeItem("filtro");
    }

function aceptarModo(){
    const valor=document.getElementById("select-modo").value;
        localStorage.setItem("modo", JSON.stringify(valor));
}

function LimpiarModo(){
    localStorage.removeItem("modo");
}

