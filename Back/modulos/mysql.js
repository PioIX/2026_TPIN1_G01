const sqlite3 = require('sqlite3').verbose();

/**
 * Realiza una query a la base de datos SQLite indicada en el archivo "mysql.js".
 * @param {String} queryString Query que se desea realizar. Textual como se utilizaría en el SQLite.
 * @returns Respuesta de la base de datos. Suele ser un vector de objetos.
 */

exports.realizarQuery = async function (queryString)
{
    try
    {
        // Abrir conexión
        const db = new sqlite3.Database('./videojuegos.db');

        // Convertimos db.all en Promise
        const rows = await new Promise((resolve, reject) => {

            db.all(queryString, [], (err, rows) => {

                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve(rows);
                }
            });
        });

        // Cerrar conexión
        db.close();

        return rows;
    }
    catch(err)
    {
        console.log(err);
        return err;
    }
}