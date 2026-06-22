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


//Agarrar usuarios de la base de datos
app.get('/usuarios', async function (req, res) {
    try {
 
        let respuesta = await realizarQuery(`SELECT * FROM Usuarios`);
        res.send(respuesta);
    }

    catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//Registro para agregar un usuario a la base de datos, o sea que el usuario ponga un nombre en el campo, un mail, una contraseña y cuando toca el boton registro se guarde ese usuario y se sume a la base de datos
app.post('/usuarios', async function (req, res) {
    try {

        let usuarioExistente = await realizarQuery(`SELECT * FROM Usuarios WHERE mail="${req.body.mail}"`);
        console.log(usuarioExistente)

        if (usuarioExistente.length > 0) {
            res.send("El usuario ya existe");

        } else {
            await realizarQuery(`INSERT INTO Usuarios (nombre_usuario,mail,contrasena, es_admin) VALUES ("${req.body.nombre_usuario}","${req.body.mail}","${req.body.contrasena}", false);`)
            res.send({message:"usuario agregado"})
        }

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

//Iniciar sesion (login)
app.post('/login', async function (req, res) {
    try {

        let usuario = await realizarQuery(`
            SELECT * FROM Usuarios WHERE mail="${req.body.mail}" AND contrasena="${req.body.contrasena}"`);

        if (usuario.length > 0) {
            res.send({
                message: "Login exitoso"
            });

        } else {
            res.send({
                message: "Mail o contraseña incorrectos"
            });

        }

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/id_pais", async function(req, res) {
  try {
    const filas = await realizarQuery(
      `select distinct id_pais from Jugadores WHERE pais=${req.query.pais}`
    );
    res.send(filas);
  } catch(error) {
    res.send(error.message);
  }
});

app.get("/id_liga", async function(req, res) {
  try {
    const filas = await realizarQuery(
      `select distinct id_liga from Jugadores WHERE liga =${req.query.liga}`
    );
    res.send(filas);
  } catch(error) {
    res.send(error.message);
  }
});

app.post("/jugadores", async function(req, res) {
  try {
    await realizarQuery(`INSERT INTO Jugadores
       (url_foto, nombre, id_liga, liga, pais, id_pais, posicion)
       VALUES (
        "${req.body.url_foto}",
        "${req.body.nombre}",
        ${req.body.id_liga},
        "${req.body.liga}",
        "${req.body.pais}",
        ${req.body.id_region},
        ${req.body.posicion}
        )`);
    res.send("añadido correctamente");
  } catch(error) {
    res.send(error.message);
  }
});

app.delete("/jugadores", async function(req, res) {
  try {
    await realizarQuery(
      `DELETE FROM Jugadores
       WHERE id_jugador=${req.body.id}`
    );
  } catch(error) {
    res.send(error.message);
  }
});


app.put("/jugadores", async function(req, res) {
  try {
    await realizarQuery(
      `UPDATE Jugadores SET
        url_foto="${req.body.url_foto}",
        nombre="${req.body.nombre}",
        id_liga=${req.body.id_liga},
        liga="${req.body.liga}",
        pais="${req.body.pais}",
        id_region=${req.body.id_region},
        posicion=${req.body.posicion}
       WHERE id_jugador=${req.body.id}`
    );
  } catch(error) {
    res.send(error.message);
  }
});

