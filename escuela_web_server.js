/*
Preparamos una versión por servidor web, así:

http://localhost:4000/ <- todos los alumnos
http://localhost:4000/nombre_alumno/apellido_alumno <- datos de un alumno
http://localhost:4000/asignatura <- alumnos de una asignatura
*/

const http = require("node:http");

const fs = require ("node:fs");

 let lectura = fs.readFileSync("escuela.json", "utf-8")

// Obtener los datos del .env
process.loadEnvFile();

const PUERTO = process.env.PORT || process.argv[2] || 8888;

// Importarmos la función capitalize, del fichero funciones.js para capitalizar nombre, apellidos y asignaturas.
const {capitalize} = require('./funciones')

// #####################################################################################

let title = ""
let h1 = ""
let enlace = ""

const server = http.createServer((req, res) => {

    // http://localhost:4000/ <- Mostramos todos los alumnos
    if (req.url == "/") {

        res.writeHead(200, {"content-type": "text/html"})
        console.log(res.statusCode);
        title = "Home"
        h1 = "<h1>Estamos en / desde Node con amor</h1>"
        enlace = ""
         
    }
    
    // http://localhost:4000/nombre_alumno/apellido_alumno <- datos de un alumno

    else if (req.url == "/nombre_alumno/apellido_alumno") {

        res.writeHead(200, {"content-type": "text/html"})
        console.log(res.statusCode);
        title = "Home"
        h1 = "<h1>Estamos en / desde Node con amor</h1>"
        enlace = ""

    }

    // http://localhost:4000/asignatura <- alumnos de una asignatura

    else if (req.url == "/asignatura") {

        res.writeHead(200, {"content-type": "text/html"})
        console.log(res.statusCode);
        title = "Home"
        h1 = "<h1>Estamos en / desde Node con amor</h1>"
        enlace = ""
    }

    // http://localhost:4000/ruta_desconocida

    else {
        // console.log("Ruta desconocida");
        res.writeHead(404, {"content-type": "text/html"})
        console.log(res.statusCode);
        title = "Error 404"
        h1 = "<h1>Error 404</h1>"
        enlace = "<a href='/'>Volver a 🏠</a>"

    }
});




server.listen(PUERTO, () => {
  console.log(`Servidor levantado en http://localhost:${PUERTO}`);
});

