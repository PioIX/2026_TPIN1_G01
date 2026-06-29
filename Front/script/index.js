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
            method:"POST",
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

async function eliminarFutbolista() {
  const id = document.getElementById("del-id").value;
  if (!id) { alert("Ingresá un ID"); return; }

  await fetch('http://localhost:4000/jugadores', {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id })
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