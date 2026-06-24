let user= localStorage.getItem("usuario")
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

        response = await fetch(`http://localhost:4000/jugadores?categoria=${filtro[0]}&filtro=${[filtro[1]]}`,{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })}
    let result = await response.json();
    return result
}

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

async function login(mail,contraseña){

    const usuarios= await llamadoUsuarios();
    console.log(usuarios)
    for (let usuario of usuarios){
        if (usuario.contrasena==contraseña && usuario.mail==mail){
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
        localStorage.setItem("usuario", json.stringify(usuairo))
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


