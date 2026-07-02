let user;
user = JSON.parse(localStorage.getItem("usuarios"));
let caracteristicaTabla = [-1,-1];
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
        } else if (usuario.contrasena==contraseña && usuario.mail!=mail){
            alert("Mail incorrecto")
            return false
        } else if (usuario.contrasena!=contraseña && usuario.mail==mail){
            alert("Contraseña incorrecta")
            return false
        } else if (usuario.contrasena!=contraseña && usuario.mail!=mail){
            alert("Mail y contraseña incorrectos, usuario no registrado")
            return false
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
    await fetch('http://localhost:4000/usuarios',{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
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

async function eliminarFutbolista() {
  const id = document.getElementById("del-id").value;
  if (!id) { alert("Ingresá un ID"); return; }

  await fetch('http://localhost:4000/jugadores', {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id })
    }); }
async function logOut(){
    localStorage.removeItem("usuarios");
    localStorage.removeItem("modo");
    localStorage.removeItem("filtro")
    window.location.href = "index.html";
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
  alert("Futbolista eliminado");
}


let modo = "crear";
let idEditar = null;

function seleccionarModo(boton){



    console.log(boton);
    console.log(boton.value);

    modo = boton.value;

    console.log(modo);


    const btnCrear = document.getElementById("btn-modo-crear");
    const btnEditar = document.getElementById("btn-modo-editar");

    // Quita el active de ambos
    btnCrear.classList.remove("active");
    btnEditar.classList.remove("active");

    // Activa el botón seleccionado
    boton.classList.add("active");

    if(modo == "editar"){

        idEditar = prompt("Ingrese el ID del futbolista a editar:");

        // Si cancela o deja vacío vuelve a Crear
        if(idEditar == null || idEditar.trim() == ""){

            modo = "crear";
            idEditar = null;

            btnEditar.classList.remove("active");
            btnCrear.classList.add("active");

            return;
        }

        idEditar = Number(idEditar);

    }else{

        idEditar = null;

    }

}

async function guardarJugador(){

    if(modo == "crear"){

        await fetch("http://localhost:4000/jugadores",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                url_foto: add_imagen(),
                nombre: add_nombre(),
                id_liga: await add_id_liga(),
                liga: add_liga(),
                pais: add_pais(),
                id_pais: await add_id_pais(),
                posicion: add_posicion(),

                estatura: add_estatura(),
                peso: add_peso(),
                overall: add_overall(),
                ritmo: add_ritmo(),
                tiro: add_tiro(),
                pase: add_pase(),
                defensa: add_defensa(),
                regate: add_regate(),
                fisico: add_fisico()
            })
        });
        alert("Jugador creado correctamente.");

    }else{

        await fetch("http://localhost:4000/jugadores",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id: idEditar,

                url_foto: add_imagen(),
                nombre: add_nombre(),
                id_liga: await add_id_liga(),
                liga: add_liga(),
                pais: add_pais(),
                id_pais: await add_id_pais(),
                posicion: add_posicion(),

                estatura: add_estatura(),
                peso: add_peso(),
                overall: add_overall(),
                ritmo: add_ritmo(),
                tiro: add_tiro(),
                pase: add_pase(),
                defensa: add_defensa(),
                regate: add_regate(),
                fisico: add_fisico()
            })
        });

        alert("Jugador editado correctamente.");

    }
}
async function selectFilter(filtro) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

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
        document.getElementById("select-container").innerHTML=""
    }

function aceptarModo(){
    const valor=document.getElementById("select-modo").value;
    if (valor==""){
        limpiarModo()
        return
    }
    localStorage.setItem("modo", JSON.stringify(valor));
}

function limpiarModo(){
    localStorage.removeItem("modo");
}



async function mostrarTabla(){

    async function llamarPuntajes(){
    let query=`http://localhost:4000/puntaje?`
    let condiciones=[];
    if (caracteristicaTabla[0] !== -1){
        condiciones.push(`user=${caracteristicaTabla[0]}`)
    }
    if (caracteristicaTabla[1] !== -1){
        condiciones.push("tiempo=1")
    }
    if (condiciones.length > 0) {
         query +=condiciones.join("&");
    }
    const response = await fetch(query,{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })

    let result = await response.json();
    return result
}
    const puntajes= await llamarPuntajes()
    let tabla=getTabla()
    tabla.innerHTML=`<thead>
				<tr>
					<th>N</th>
					<th>Usuario</th>
					<th>Puntaje</th>
					<th>Fecha</th>
				</tr>
			</thead>`
    for (let i=0;i<puntajes.length;i++){

        if (puntajes[i].id_usuario==user.id_usuario){
            tabla.innerHTML+="<tr class=propio>"
        }else{
            tabla.innerHTML+="<tr>"
        }
        tabla.innerHTML+=`
				<td>${i+1}</td>
				<td>${puntajes[i].nombre_usuario}</td>
				<td>${puntajes[i].puntajes}</td>
				<td>${puntajes[i].fecha.slice(0, 10)}</td>
			</tr>`
    }
}

function tablaPersonal(){
    caracteristicaTabla[0]=user.id_usuario
    mostrarTabla(caracteristicaTabla)
}
function tablaMes(){
    caracteristicaTabla[1]=1
    mostrarTabla(caracteristicaTabla)
}
function tablaTodos(){
    caracteristicaTabla[0]=-1
    mostrarTabla(caracteristicaTabla)
}
function tablahistorica(){
    caracteristicaTabla[1]=-1
    mostrarTabla(caracteristicaTabla)
}