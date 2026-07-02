function getNombre() {
    return document.getElementById("nombre").value;
}

function getMail() {
    return document.getElementById("mail").value;
}

function getContraseña() {
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

function add_nombre() {
    return document.getElementById("add-nombre").value;
}

function add_pais() {
    return document.getElementById("add-pais").value;
}

async function add_id_pais() {
    const pais = document.getElementById("add-pais").value;
    return await id_pais(pais);
}

async function id_pais(pais) {
    const response = await fetch(
        `http://localhost:4000/id_pais?pais=${pais}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await response.json();

    if (result.length > 0) {
        return result[0].id_pais;
    }

    return null;
}

function add_liga() {
    return document.getElementById("add-liga").value;
}

async function add_id_liga() {
    const liga = document.getElementById("add-liga").value;
    return await id_liga(liga);
}

async function id_liga(liga) {
    const response = await fetch(
        `http://localhost:4000/id_liga?liga=${liga}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await response.json();

    if (result.length > 0) {
        return result[0].id_liga;
    }

    return null;
}

function add_imagen() {
    return document.getElementById("add-imagen").value;
}

function add_posicion() {
    return document.getElementById("add-posicion").value;
}

function add_estatura() {
    return document.getElementById("add-estatura").value;
}

function add_peso() {
    return Number(document.getElementById("add-peso").value);
}

function add_overall() {
    return document.getElementById("add-overall").value;
}

function add_ritmo() {
    return document.getElementById("add-ritmo").value;
}

function add_tiro() {
    return document.getElementById("add-tiro").value;
}

function add_pase() {
    return document.getElementById("add-pase").value;
}

function add_defensa() {
    return document.getElementById("add-defensa").value;
}

function add_regate() {
    return document.getElementById("add-regate").value;
}

function add_fisico() {
    return document.getElementById("add-fisico").value;
}
function add_posicion(){
    return document.getElementById("add-posicion").value
}

function getTabla(){
    return document.getElementById("tabla")
}