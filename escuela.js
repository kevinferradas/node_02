
/* APLICACIÓN: ESCUELA

El objetivo es matricular alumnos en una escuela y poder mostrar esa información.
Utilizaremos un fichero llamado escuela.js para la programación y otro llamado escuela.json
para guardar los datos.*/

const fs = require ("node:fs");

// fs.readFileSync(...): Lee un archivo de forma sincrónica (bloqueante) usando el módulo fs (file system).

// "escueka.json": Es el nombre del archivo que estamos leyendo.

// "utf-8": Especifica que el contenido se lee como texto (no como binario).

// El resultado (contenido del archivo) se guarda como string en la variable lectura.

let lectura = fs.readFileSync("escuela.json", "utf-8")





// console.log(jsonLeido);
// console.log(typeof jsonLeido);
// #####################################################################################

/*1. MATRICULACION*/ 

/*La matriculación se realizará así:
node escuela.js nombre_alumno apellido_alumno edad asignatura

Nota 1: No sabremos por adelantado cuáles son las asignaturas.
Nota 2: Admitiremos nombres compuestos si se escriben 
con un guión en medio, así: Anna-Maria

En cada matriculación los datos del alumno se incorporarán al fichero .json,
donde quedarán registrados en ese formato, obviamente.*/



if (process.argv.length == 6) {

    let nombre = process.argv[2]
    let apellido = process.argv[3]
    let edad = process.argv[4]
    let asignatura = process.argv[5]
 
    
        if (lectura.trim() === ""){
            var array_Alumnos_Matriculados = [{"nombre":`${nombre}`,"apellido":`${apellido}`,"edad":`${edad}`,"asignatura":`${asignatura}`}]
            // console.log(array_Alumnos_Matriculados);
            // Escritura

            fs.writeFileSync("escuela.json", JSON.stringify(array_Alumnos_Matriculados), "utf-8")   // Guarda (escribe) un objeto JavaScript en un archivo JSON.

        } else {
            let objeto_Alumno_Matriculado = {"nombre":`${nombre}`,"apellido":`${apellido}`,"edad":`${edad}`,"asignatura":`${asignatura}`}
            array_Alumnos_Matriculados.push(objeto_Alumno_Matriculado)
            fs.writeFileSync("escuela.json", JSON.stringify(array_Alumnos_Matriculados), "utf-8")
        }


    
} else if(process.argv.length == 5) {
    // process.argv[2] -> asignatura
    //Mostraremos los alumnos matriculados en la asignatura
} else if(process.argv.length == 4) {
    // process.argv[2] -> nombre
    // process.argv[3] -> apellido
    // Mostraremos las asignaturas de las que está matriculado
} else if(process.argv.length == 3) {
    // process.argv[2] -> nombre
    // process.argv[3] -> apellido
    // Borraremos al alumno con ese nombre y apellido
} else if(process.argv.length == 2) {
    // process.argv[2] -> nombre
    // process.argv[3] -> apellido
    // process.argv[4] -> edad
    // process.argv[5] -> asignatura
    // Matricular al alumno con esos datos 
    }else {
        console.log("Hola");
    }





