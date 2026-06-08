var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

//Colocar su codigo a partir de aca

app.get('/usuarios', async function (req, res) {
    try {
 
        let respuesta = await realizarQuery(`SELECT * FROM Usuarios`);
        res.send(respuesta);
    }

    catch (error) {
        res.status(500).send({ error: error.message });
    }
})


app.post('/usuarios', async function (req, res) {
    try {

        let usuarioExistente = await realizarQuery(`SELECT * FROM Usuarios WHERE mail="${req.body.mail}" `);
        console.log(usuarioExistente)

        if (animalExistente.length > 0) {
            res.send("El usuario ya existe");

        } else {
            await realizarQuery(`
            INSERT INTO Usuarios (nombre_usuario,mail,contraseña) VALUES ("${req.body.nombre_usuario}","${req.body.mail}",${req.body.contraseña});`)
            res.send({message:"usuario agregado"})
        }


    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

