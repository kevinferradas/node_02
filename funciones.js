

const fs = require ("node:fs");
let lectura = fs.readFileSync("escuela.json", "utf-8")

function capitalize(palabra) {
    let longitud_palabra = palabra.length
    let primera_letra= palabra[0].toLocaleUpperCase()
    let resto_nombre;
    let nombre_capitalizado;
    
    if (palabra.includes("-")){
        let indice = palabra.indexOf("-")
        let primera_letra_after_guion = palabra[indice + 1].toLocaleUpperCase()
        resto_nombre =  palabra.toLocaleLowerCase().slice(1,indice)
        let resto_nombre_after_guion = palabra.toLocaleLowerCase().slice(indice+2,longitud_palabra)
        nombre_capitalizado = primera_letra + resto_nombre + "-" + primera_letra_after_guion + resto_nombre_after_guion 
        return nombre_capitalizado

    }else {
        let resto_nombre = palabra.toLocaleLowerCase().slice(1,longitud_palabra)
        nombre_capitalizado = primera_letra + resto_nombre
        return nombre_capitalizado
    }
}


function ordenar_desc(array) {

    array.sort((a, b) => {
    // b.apellido.localeCompare(a.apellido) devuelve -1 (b<a) , 0 (b=a), 1 (b>a)
    const ap = b.apellido.localeCompare(a.apellido);
    const nom = b.nombre.localeCompare(a.nombre);
    const asig = b.asignatura.localeCompare(a.asignatura)
    if (ap !== 0) return ap;
    else if (nom !== 0) return nom;
    else return asig;
    });

}

array_Alumnos_Matriculados = JSON.parse(lectura)
ordenar_desc(array_Alumnos_Matriculados)
// array_Alumnos_Matriculados = JSON.parse(lectura)
console.log(array_Alumnos_Matriculados);

module.exports ={capitalize, ordenar_desc}

