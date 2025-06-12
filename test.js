const fs = require("node:fs")


//Lectura

let lectura = fs.readFileSync("test.json", "utf-8")
let jsonLeido = JSON.parse(lectura)

if (process.argv.length == 2) {

    // Mostrar jsonLeido
} else if(process.argv.length == 3) {
    // process.argv[2] -> asignatura
    //Mostraremos los alumnos matriculados en la asignatura
} else if(process.argv.length == 4) {
    // process.argv[2] -> nombre
    // process.argv[3] -> apellido
    // Mostraremos las asignaturas de las que está matriculado
} else if(process.argv.length == 5) {
    // process.argv[2] -> nombre
    // process.argv[3] -> apellido
    // Borraremos al alumno con ese nombre y apellido
} else if(process.argv.length == 6) {
    // process.argv[2] -> nombre
    // process.argv[3] -> apellido
    // process.argv[4] -> edad
    // process.argv[5] -> asignatura
    // Matricular al alumno con esos datos 
    }

const jsonPrueba = [

    {"nombre": "Peter" , "apellido": "Parker" , "edad" : 25 , "asignatura" : "Node"}
]

// Escritura
// fs.writeFileSync("test.json", JSON.stringify(jsonPrueba), "utf-8")

// console.log(lectura[0]);
// console.log(jsonLeido);

let objeto =  {"nombre": "Bruce" , "apellido": "Lee" , "edad" : 30 , "asignatura" : "HTML"}

jsonPrueba.push(objeto)

objeto =  {"nombre": "Bruce" , "apellido": "Lee" , "edad" : 30 , "asignatura" : "CSS"}

jsonPrueba.push(objeto)

objeto = {"nombre": "Pedro" , "apellido": "Picapiedra" , "edad" : 45 , "asignatura" : "CSS"}

jsonPrueba.push(objeto)

// console.log(jsonPrueba);


// fs.writeFileSync("test.json", JSON.stringify(jsonPrueba), "utf-8")

let alumnoBorrable =  {"nombre": "Bruce" , "apellido": "Lee" , "edad" : -1}

for (let i = jsonPrueba.length - 1 ; i>=0; i --){
    if (jsonPrueba[i].nombre == alumnoBorrable.nombre && jsonPrueba[i].apellido == alumnoBorrable.apellido) {
        jsonPrueba.splice(i,1)
    }

}

    console.log(jsonPrueba);
