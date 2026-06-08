async function llamadoUsuarios() {
    const response = await fetch('http://localhost:4000/usuarios',{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })
    document.getElementById("lista").innerHTML=""
    let result = await response.json();
    return result
}

function login(){
    const mail=getMail();
    const contraseña=getContraseña();
    const usuarios=llamadoUsuarios()
    for (let usuario in usuarios){
        if (usuario.contraseña==contraseña && usuario.mail==mail){
            return true
        }
    }
    return false
}

function register(){
    const datos={
        mail=getMail(),
        contraseña=getContraseña(),
        nombre=getNombre()
    };

    const response = await fetch('http://localhost:4000/usuarios',{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
        })
        console.log("hecho")
}
