'use strict'

const { findById } = require('../modelos/persona.js');
const persona = require('../modelos/persona.js');
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Persona = require('../modelos/persona.js');

// Creamos un método en el controlador, en este caso una accion de pruebas
function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let persona = new Persona()
    persona.nombre = req.body.nombre
    persona.rut = req.body.rut
    persona.telefonos = req.body.telefonos
    persona.save((err, personastore) => {

        if (err) return res.status(401).send(`Error base de datos> ${err}`)

        res.status(200).send({ persona: personastore })

    })
}

/*-------------------------------------FUNCION DE PUT--------------------------------------------------------------

Se utilizó la función  findByIdAndUpdate() la cual busca una coincidencia de ID comparando el recibido
con los existentes en la BD y actualiza los datos indicados en el segundo argumento de la funcion (En este caso la funcion 
actualiza el nombre).
Se recibe los datos del body en json.
Además, la opcion new se configura como true para que el documento que se envia como respuesta sea después de la modificación.


*/
function editar(req,res){
    let idpersona = req.body.id
    let name = req.body.nombre
    let rut = req.body.rut
    let phone = req.body.phone
    Persona.findByIdAndUpdate(idpersona,{nombre: name, rut:rut, phone:phone},{new: true},(err,persona)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!persona) return res.status(404).send({message:'Error la persona no existe'}) 
        res.status(200).send({persona})
     })

}
/*-------------------------------------FUNCION DE DELETE--------------------------------------------------------------

Se utilizó la función  findByIdAndDelete() la cual busca una coincidencia de ID comparando el recibido
con los existentes en la BD y elimina el documento encontrado.
Se recibe la ID a buscar mediante query params


*/

function eliminar(req,res){
    let idpersona = req.params.id
    Persona.findByIdAndDelete(idpersona,(err,persona)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!persona) return res.status(404).send({message:'Error la persona no existe'}) 
        res.status(200).send({message:'Persona eliminada'})

     })

}

function buscar(req, res) {

    //    let nombrereq = req.params.nombre

    //params ->viene en la ruta sin nombre de paramertro ej persona/1 
    //query viene con un nombre de parametro en forma de get
    let nombrereq = req.query.nombre
    let rutreq = req.query.rut
    console.log(rutreq);
    Persona.find({ nombre: nombrereq, rut: rutreq }, (err, persona) => {
        if (!persona) return res.status(404).send({ message: 'Error persona no existe' })
        res.status(200).send({ persona })
    })


}
function buscarPorID(req, res) {

    let idpersona = req.params.id
    Persona.findById(idpersona,(err,persona)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!persona) return res.status(404).send({message:'Error la persona no existe'})

         res.status(200).send({persona})
     })
}

function todos(req, res) {

    Persona.find({},(err,persona)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!persona) return res.status(404).send({message:'Error la persona no existe'})

         res.status(200).send({persona})
     })
}


// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    guardar,
    buscar,
    buscarPorID,
    todos,
    eliminar,
    editar
    
};
