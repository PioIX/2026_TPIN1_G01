function getNombre(){
    return document.getElementById("nombre").value;
};

function getMail(){
    return document.getElementById("mail").value;
};

function getContraseña(){
    return document.getElementById("contraseña").value;
};

function agregarImagenes(jug1,jug2){
    document.getElementById("img_player1").src = jug1[0].url_foto;
    document.getElementById("name1").innerHTML = jug1[0].nombre;
    document.getElementById("stat1").innerHTML = jug1[1];
    document.getElementById("img_player2").src = jug2[0].url_foto;
    document.getElementById("name2").innerHTML = jug2[0].nombre;
    document.getElementById("stat2").innerHTML = jug2[1];
}


function add_nombre(){
    return document.getElementById("add-nombre").value
}
function add_pais(){
    return document.getElementById("add-nombre").value
}
function add_id_pais(){
    a = document.getElementById("add-pais").value
    async function id_pais(pais) {
        const response = await fetch(`http://localhost:4000/id_pais?pais = ${pais}`,{
            method:"GET", 
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    }
    return id_pais(a)
}
function add_liga(){
    return document.getElementById("add-liga").value
}
function add_id_liga(){
    a = document.getElementById("add-liga").value
    async function id_liga(liga) {
        const response = await fetch(`http://localhost:4000/id_liga?liga = ${liga}`,{
            method:"GET", 
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    }
    return id_liga(a)
}

function add_imagen(){
    return document.getElementById("add-imagen").value
}

function add_posicion(){
    return document.getElementById("add-posicion").value
}

function getTabla(){
    return document.getElementById("tabla")
}