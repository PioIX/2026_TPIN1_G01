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