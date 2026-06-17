var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

//Pongo el servidor a escuchar
app.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
});

//Colocar su codigo a partir de aca

app.get("/jugadores", async function (req, res) {
    try {

        let result;
        if (req.query.filtro == undefined) {

            result = await realizarQuery(`SELECT url_foto,nombre,id_liga,liga,id_pais,pais,posicion,Cartas.* FROM Jugadores INNER JOIN Cartas ON Cartas.id_jugador = Jugadores.id_jugador ORDER BY RAND() LIMIT 100`)
        } else {

            result = await realizarQuery(`SELECT url_foto,nombre,id_liga,liga,id_pais,pais,posicion,Cartas.* FROM Jugadores INNER JOIN Cartas ON Cartas.id_jugador = Jugadores.id_jugador WHERE ${req.query.categoria}=${req.query.filtro} ORDER BY RAND() LIMIT 100`)
        }

        res.send(result)

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

