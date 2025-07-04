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

const server = http.createServer((req, res) => {

    // http://localhost:4000/ <- Mostramos todos los alumnos
    if (req.url == "/") {

        res.writeHead(200, {"content-type": "text/html"})
        console.log(res.statusCode);
        title = "Alumnos matriculados"
        h1 = "<h1>Estamos en / desde Node con amor</h1>"
        enlace = ""
         
    }
    
    // http://localhost:4000/nombre_alumno/apellido_alumno <- datos de un alumno

    else if (req.url == "/nombre_alumno/apellido_alumno") {

        res.writeHead(200, {"content-type": "text/html"})
        console.log(res.statusCode);
        title = "Home"
        h1 = "<h1>Estamos en / desde Node con amor</h1>"
        
        
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

  const html = `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
    h1 { color: green; font-family: Arial;}
    </style> 
</head>
<body>
    ${h1}
    ${enlace}
</body>
</html>
  `

  res.end(html)





});




server.listen(PUERTO, () => {
  console.log(`Servidor levantado en http://localhost:${PUERTO}`);
});


array_Alumnos_Matriculados = JSON.parse(lectura)

    array_Alumnos_Matriculados.sort((a, b) => {
    // b.apellido.localeCompare(a.apellido) devuelve -1 (b<a) , 0 (b=a), 1 (b>a)
    const ap = b.apellido.localeCompare(a.apellido);
    const nom = b.nombre.localeCompare(a.nombre);
    const asig = b.asignatura.localeCompare(a.asignatura)
    if (ap !== 0) return ap;
    else if (nom !== 0) return nom;
    else return asig;
});    



        // Lista auxiliar para contabilizar la cantidad de alumnos
        let array_numero_alumnos=[];

        for (let i=0 ; i<array_Alumnos_Matriculados.length ; i++){
    
          
            let nombre_alumno = array_Alumnos_Matriculados[i].nombre
            let apellido_alumno = array_Alumnos_Matriculados[i].apellido
            let edad_alumno = array_Alumnos_Matriculados[i].edad
            let asignatura_alumno = array_Alumnos_Matriculados[i].asignatura

            let nombre_apellido = nombre_alumno + apellido_alumno
            if(!array_numero_alumnos.includes(nombre_apellido)){
                array_numero_alumnos.push(nombre_apellido)}
                
           

            console.log(`\t-- ${apellido_alumno}  ${nombre_alumno}  ${edad_alumno}  ${asignatura_alumno}\n`);
        }
        
    console.log(`Total: ${array_numero_alumnos.length} alumnos matriculados.`);

    
