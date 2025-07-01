
/* APLICACIÓN: ESCUELA

El objetivo es matricular alumnos en una escuela y poder mostrar esa información.
Utilizaremos un fichero llamado escuela.js para la programación y otro llamado escuela.json
para guardar los datos.*/

const fs = require ("node:fs");

// fs.readFileSync(...): Lee un archivo de forma sincrónica (bloqueante) usando el módulo fs (file system).

// "escuela.json": Es el nombre del archivo que estamos leyendo.

// "utf-8": Especifica que el contenido se lee como texto (no como binario).

// El resultado (contenido del archivo) se guarda como string en la variable lectura.

 let lectura = fs.readFileSync("escuela.json", "utf-8")

// Importarmos la función capitalize, del fichero funciones.js para capitalizar nombre, apellidos y asignaturas.
const {capitalize} = require('./funciones')

// #####################################################################################

/*1. MATRICULACION

La matriculación se realizará así:
node escuela.js nombre_alumno apellido_alumno edad asignatura

Nota 1: No sabremos por adelantado cuáles son las asignaturas.
Nota 2: Admitiremos nombres compuestos si se escriben 
con un guión en medio, así: Anna-Maria

En cada matriculación los datos del alumno se incorporarán al fichero .json,
donde quedarán registrados en ese formato, obviamente.*/



if (process.argv.length == 6) {

    let nombre = capitalize(process.argv[2])
    let apellido = capitalize(process.argv[3])
    let edad = process.argv[4]
    let asignatura = capitalize(process.argv[5])

    let objeto_Alumno_Matriculado = 
    {
        "nombre":`${nombre}`,
        "apellido":`${apellido}`,
        "edad":`${edad}`,
        "asignatura":`${asignatura}`
    }

    let array_Alumnos_Matriculados;
    
        if (lectura.trim() === ""){
            array_Alumnos_Matriculados = [objeto_Alumno_Matriculado]
    
        } else {

            // Convertimos el texto JSON leído desde el archivo (lectura) 
            // en un objeto o arreglo de JavaScript, usando JSON.parse().
            array_Alumnos_Matriculados = JSON.parse(lectura)
            array_Alumnos_Matriculados.push(objeto_Alumno_Matriculado)
        }

        // Escritura
        // Guarda (escribe) un objeto JavaScript en un archivo JSON.
        fs.writeFileSync("escuela.json", JSON.stringify(array_Alumnos_Matriculados,null,2), "utf-8")   

} 

/*2. BORRAR ALUMNO

Podremos borrar un alumno de la lista así:
node escuela.js nombre_alumno apellido_alumno -1
Si el alumno no está en la lista debe aparecer este mensaje:
"No tenemos matriculado a ese alumno"

*/ 

else if(process.argv.length == 5 && parseInt(process.argv[4])== -1) {

    let nombre = capitalize(process.argv[2])
    let apellido = capitalize(process.argv[3])
    array_Alumnos_Matriculados = JSON.parse(lectura)
    let longitudOriginal = array_Alumnos_Matriculados.length


    array_Alumnos_Matriculados = array_Alumnos_Matriculados.filter(
    alumnos => alumnos.nombre != nombre &&  alumnos.apellido != apellido) 

    fs.writeFileSync("escuela.json", JSON.stringify(array_Alumnos_Matriculados,null,2), "utf-8")  
    
    if (array_Alumnos_Matriculados.length == longitudOriginal){
        console.log(`No tenemos matriculado al alumno ${nombre} ${apellido}.`);
    }

} 

/* 3. LISTAMOS ASIGNATURAS POR ALUMNO

Si escribimos:
node escuela.js nombre_alumno apellido_alumno
Deben aparecer las asignaturas en las que está matriculado así:

El alumno nombre_alumno apellido_alumno está matriculado de:
    -- X 
    -- Y
    
*/

else if (process.argv.length == 4){

    let nombre = capitalize(process.argv[2])
    let apellido = capitalize(process.argv[3])
    array_Alumnos_Matriculados = JSON.parse(lectura)

    array_alumno = array_Alumnos_Matriculados.filter(
    alumnos => alumnos.nombre == nombre && 
     alumnos.apellido == apellido) 

    if (array_alumno.length == 0) {
        console.log(`\nNo tenemos matriculado al alumno ${nombre} ${apellido}.`); }
    else{

        console.log(`\nEl(La) alumno(a) ${nombre} ${apellido} está matriculado en :\n`);

        for (let i=0 ; i<array_alumno.length ; i++){
            let asignatura = array_alumno[i].asignatura
            console.log(`\t-- ${asignatura}`);
        }
        
    }
    console.log('\n');
}

/*  4. LISTAMOS ALUMNOS POR ASIGNATURA

Si escribimos:
node escuela.js asignatura (cualquiera que sea)
Aparecerán los datos de los alumnos matriculados en ella, así:

Alumnos matriculados en X (X es la asignatura)
=========================
nombre_1 apellido_1 edad_1
nombre_2 apellido_2 edad_2
...
nombre_n apellido_n edad_n
--------------------------------
Total: n alumnos matriculados
*/

 else if(process.argv.length == 3) {

    let asignatura = capitalize(process.argv[2])
    array_Alumnos_Matriculados = JSON.parse(lectura)

    array_asignatura = array_Alumnos_Matriculados.filter(
    alumnos => alumnos.asignatura == asignatura)
    let cabecera1;

    if (array_asignatura.length == 0) {
        console.log(`\nNo tenemos ningún alumno matriculado en ${asignatura}`); }
    else{

        cabecera1 = `Alumnos matriculados en ${asignatura}\n`
        let cabecera2 = "=".repeat(cabecera1.length - 1)
        console.log(`\n${cabecera1}${cabecera2}\n`);
       

        for (let i=0 ; i<array_asignatura.length ; i++){

            let nombre_alumno = array_asignatura[i].nombre
            let apellido_alumno = array_asignatura[i].apellido
            let edad_alumno = array_asignatura[i].edad

            console.log(`\t-- ${nombre_alumno}  ${apellido_alumno}  ${edad_alumno}\n`);
        }
        
    }

    let pie = "-".repeat(cabecera1.length - 1)
    console.log(`${pie}\n`);

    console.log(`Total: ${array_asignatura.length} alumnos matriculados.`);

    console.log('\n');
} 

/*  5. MOSTRAMOS ALUMNOS

Si escribimos:
node escuela.js
Apareceran los datos de todos los alumnos, así:

Alumnos matriculados
====================
nombre_1 apellido_1 edad_1 asignatura_x
nombre_2 apellido_2 edad_2 asignatura_y
...
nombre_n apellido_n edad_n asignatura_z
---------------------------------------
Total: n alumnos matriculados

Ordenados por apellido, nombre, asignatura de forma descendente
(de la A a Z)
*/

else if(process.argv.length == 2) {

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

        let cabecera1 = `Alumnos matriculados\n`
        let cabecera2 = "=".repeat(cabecera1.length - 1)
        console.log(`\n${cabecera1}${cabecera2}\n`);

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
        
        
        



    let pie = "-".repeat(cabecera1.length - 1)
    console.log(`${pie}\n`);



    console.log(`Total: ${array_numero_alumnos.length} alumnos matriculados.`);

    console.log('\n');

 }
/* 
Cualquier otra forma de acceder a los datos debe de considerarse un error
 y debe aparecer el correspondiente mensaje
*/
else {
        console.log("No es una forma válida de acceder a los datos de escuela.");
   }





